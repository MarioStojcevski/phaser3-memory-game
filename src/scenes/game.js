import Phaser from "phaser";

import SceneKeys from "../constants/scene-keys";
import CountDownController from "../utils/countdown-controller";

const levelData = [
    [1, 0, 3],
    [2, 4, 1],
    [3, 4, 2]
]

class Game extends Phaser.Scene {

    selectedBoxes = [];
    matchesCount = 0;
    totalItemsForMatching = levelData.length * levelData[0].length - 1;

    constructor() {
        super(SceneKeys.GAME);
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const { width, height } = this.scale;

        this.player = this.physics.add.sprite(width * 0.1, height * 0.2, "sokoban").play("down-idle");
        this.player.setCollideWorldBounds(true);

        this.boxGroup = this.physics.add.staticGroup();

        this.createBoxes();

        this.itemsGroup = this.add.group();

        const timerLabel = this.add.text(10, 20, "00.00", {
            fontSize: "32px",
            fontFamily: '"Press Start 2P"',
            fill: "#fff"
        });

        this.countdown = new CountDownController(this, timerLabel);
        this.countdown.start(this.handleCountDownFinished.bind(this));

        this.physics.add.collider(this.player, this.boxGroup, this.handlePlayerBoxCollision, undefined, this);
    }

    update() {
        this.playerMovement();
        this.updateActiveBox();
        this.countdown.update();
    }

    createBoxes() {
        const { width, height } = this.scale;
        let xPer = 0.25;
        let y = 150;
        for (let i = 0; i < levelData.length; i++) {
            for (let j = 0; j < levelData[i].length; j++) {
                this.boxGroup
                    .create(width * xPer, y, "sokoban", 10)
                    .setData("itemType", levelData[i][j]);
                xPer += 0.25;
            }
            xPer = 0.25;
            y += 150;
        }
    }

    playerMovement() {
        const speed = this.cursors.shift.isDown ? 250 : 100;

        if(!this.player.active) {
            return;
        }

        if(this.cursors.left.isDown) {
            this.player.setVelocity(-speed, 0).play("left-walk", true);
        } else if(this.cursors.right.isDown) {
            this.player.setVelocity(speed, 0).play("right-walk", true);
        } else if(this.cursors.up.isDown) {
            this.player.setVelocity(0, -speed).play("up-walk", true);
        } else if(this.cursors.down.isDown) {
            this.player.setVelocity(0, speed).play("down-walk", true);
        } else if (this.input.activePointer.isDown) {
            const pointer = this.input.activePointer;
            const pointerX = pointer.x;
            const pointerY = pointer.y;
            const playerX = this.player.x;
            const playerY = this.player.y;
            const distance = Phaser.Math.Distance.Between(playerX, playerY, pointerX, pointerY);
            if (distance > 10) {
                const angle = Phaser.Math.Angle.Between(playerX, playerY, pointerX, pointerY);
                const angleDeg = Phaser.Math.RadToDeg(angle);
                if (angleDeg >= -45 && angleDeg <= 45) {
                    this.player.setVelocity(speed, 0).play("right-walk", true);
                } else if (angleDeg >= 45 && angleDeg <= 135) {
                    this.player.setVelocity(0, speed).play("down-walk", true);
                } else if (angleDeg >= -135 && angleDeg <= -45) {
                    this.player.setVelocity(0, -speed).play("up-walk", true);
                } else {
                    this.player.setVelocity(-speed, 0).play("left-walk", true);
                }
            }
        }
        else {
            const key = this.player.anims.currentAnim.key;
            this.player.setVelocity(0, 0);
            this.player.play(key.replace("walk", "idle"), true);
        }

        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
        if(spaceJustPressed) {
            this.openBox(this.activeBox);
        }
    }

    handlePlayerBoxCollision(player, box) {
        if(this.activeBox || box.getData("opened")) {
            return;
        }

        this.activeBox = box;
        this.activeBox.setFrame(9);
    }

    updateActiveBox() {
        if(!this.activeBox) {
            return;
        }

        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y, 
            this.activeBox.x, this.activeBox.y);

        if(distance > 80) {
            this.activeBox.setFrame(10);
            this.activeBox = undefined;
        }
    }

    openBox(box) {
        if(!box || box.getData("opened")) {
            return;
        }

        const itemType = box.getData("itemType");

        let item;

        switch(itemType) {
            case 0:
				item = this.itemsGroup.get(box.x, box.y);
				item.setTexture('voda');
				break;

			case 1:
				item = this.itemsGroup.get(box.x, box.y);
				item.setTexture('skopsko');
				break;

			case 2:
				item = this.itemsGroup.get(box.x, box.y);
				item.setTexture('zlaten_dab');
				break;

			case 3:
				item = this.itemsGroup.get(box.x, box.y);
				item.setTexture('krombacher');
				break;

			case 4:
				item = this.itemsGroup.get(box.x, box.y);
				item.setTexture('majstorsko');
				break;
        }

        if(!item) {
            return;
        }

        box.setData("opened", true);

        item.scale = 0;
        item.alpha = 0;

        this.selectedBoxes.push({ box, item });

        this.tweens.add({
            targets: item,
            y: '-=50',
            alpha: 1,
            scale: 0.5,
            duration: 500,
            onComplete: () => {
                if(itemType === 0) {
                    this.handleBadSelection();
                }
                if(this.selectedBoxes.length === 2) {
                    this.checkMatch();
                }
            }
        });
    }

    handleBadSelection() {
        const { box, item } = this.selectedBoxes.pop();

        item.setTint(0xff0000);
        box.setFrame(7);

        this.player.active = false;
        this.player.setVelocity(0, 0);

        this.time.delayedCall(1000, () => {
            box.setFrame(10);
            item.setTint(0x000000);
            box.setData("opened", false);

            this.tweens.add({
                targets: item,
                y: '+=50',
                alpha: 0,
                scale: 0.5,
                duration: 400,
                onComplete: () => {
                    this.player.active = true;
                }
            });
        });
    }

    checkMatch() {
        const second = this.selectedBoxes.pop();
        const first = this.selectedBoxes.pop();

        if(first.item.texture.key === second.item.texture.key) {
            this.tweens.add({
                targets: [first.item, second.item],
                y: '+=50',
                alpha: 0,
                scale: 0.5,
                duration: 400,
                delay: 500,
                onComplete: () => {
                    first.box.setFrame(8);
                    second.box.setFrame(8);
                    this.selectedBoxes = [];
                }
            });

            this.matchesCount++;

            if(this.matchesCount >= this.totalItemsForMatching / 2) {
                //game won
                this.countdown.stop();

                this.player.active = false;
                this.player.setVelocity(0, 0);

                const { width, height } = this.scale;
                this.add.text(width * 0.5, height * 0.91, "Si gi znaes pivcata ;)", {
                    fontSize: 32,
                    color: "#fff",
                    fontFamily: '"Press Start 2P"',
                }).setOrigin(0.5, 0.5);
            }
        } else {
            this.tweens.add({
                targets: [first.item, second.item],
                y: '+=50',
                alpha: 0,
                scale: 0.5,
                duration: 400,
                delay: 500,
                onComplete: () => {
                    first.box.setFrame(10);
                    second.box.setFrame(10);
                    first.box.setData("opened", false);
                    second.box.setData("opened", false);
                    this.selectedBoxes = [];
                }
            });
        }
    }

    handleCountDownFinished() {
        //game over
        this.player.active = false;
        this.player.setVelocity(0, 0);
        this.player.setTint(0xff0000);

        const { width, height } = this.scale;

        this.add.text(width * 0.5, height * 0.91, "De be, pivo e..", {
            fontSize: 32,
            color: "#fff",
            fontFamily: '"Press Start 2P"',
        }).setOrigin(0.5, 0.5);
    }
}

export default Game;