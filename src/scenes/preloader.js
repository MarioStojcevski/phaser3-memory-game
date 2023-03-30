import Phaser from "phaser";
import WebFont from "webfontloader";

import SceneKeys from "../constants/scene-keys";

class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.PRELOADER);
    }

    preload() {
        WebFont.load({
            google: {
                families: ["Press Start 2P"]
            }
        });

        this.load.spritesheet("sokoban", "assets/sokoban_spritesheet_new.png", {
            frameWidth: 64,
        });

        this.load.image("skopsko", "assets/beers/SKOPSKO.png");
        this.load.image("zlaten_dab", "assets/beers/ZLATENDAB.png");
        this.load.image("krombacher", "assets/beers/KROMBACHER.png");
        this.load.image("majstorsko", "assets/beers/MAJSTORSKO.png");
        this.load.image("voda", "assets/beers/VODA.png");
    }

    create() {
        this.anims.create({
            key: "down-idle",
            frames: [{ key: "sokoban", frame: 52 }],
        });

        this.anims.create({
            key: "left-idle",
            frames: [{ key: "sokoban", frame: 81 }],
        });

        this.anims.create({
            key: "right-idle",
            frames: [{ key: "sokoban", frame: 78 }],
        });

        this.anims.create({
            key: "up-idle",
            frames: [{ key: "sokoban", frame: 55 }],
        });

        this.anims.create({
            key: "down-walk",
            frames: this.anims.generateFrameNumbers("sokoban", { start: 52, end: 54 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "left-walk",
            frames: this.anims.generateFrameNumbers("sokoban", { start: 81, end: 83 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "right-walk",
            frames: this.anims.generateFrameNumbers("sokoban", { start: 78, end: 80 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "up-walk",
            frames: this.anims.generateFrameNumbers("sokoban", { start: 55, end: 57 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.start(SceneKeys.TITLE_SCREEN);
    }
};

export default Preloader;