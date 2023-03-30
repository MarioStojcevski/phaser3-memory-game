import Phaser from "phaser";
import SceneKeys from "../constants/scene-keys";

class Credits extends Phaser.Scene {
  constructor() {
    super(SceneKeys.CREDITS);
  }

  preload() {
    this.load.image("mario", "assets/mario.png");
    this.load.image("lina", "assets/linv.png");
  }

  create() {
    this.changeDir = false;
    this.createCharacters();
    
    this.createBackButton();

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start(SceneKeys.GAME);
    });
  }

  createCharacters() {
    const { width, height } = this.scale;

    this.mario = this.add.image(width/2, height/2, "mario");
    this.lina = this.add.image(width/2, height/2, "lina");

    this.mario.setOrigin(1, -0.2);
    this.lina.setOrigin(0, -0.2);
    
    this.mario.setScale(0.5);
    this.lina.setScale(0.5);

    this.add.text(width/2, height/2, 'Mario', {
      fontSize: 24,
      fontFamily: '"Press Start 2P"',
      color: '#fff',
    }).setOrigin(1.5, -1);

    this.add.text(width/2, height/2, 'Lina', {
      fontSize: 24,
      fontFamily: '"Press Start 2P"',
      color: '#fff',
    }).setOrigin(-0.8, -1);
  }

  createBackButton () {
    const { width, height } = this.scale;

    this.add.text(width/2, height/2, 'Credits', {
      fontSize: 24,
      fontFamily: '"Press Start 2P"',
      color: '#fff',
    }).setOrigin(0.5, 7);

    const backButton = this.add.text(width/2, height/2, 'Back', {
      fontSize: 14,
      fontFamily: '"Press Start 2P"',
      color: '#000',
      backgroundColor: '#fff',
      padding: 10,
    });

    backButton.setOrigin(0.5, 4).setInteractive();

    backButton.on('pointerover', () => {
      backButton.setStyle({ backgroundColor: '#A865C9' });
    });

    backButton.on('pointerout', () => {
      backButton.setStyle({ backgroundColor: '#fff' });
    });

    backButton.on('pointerdown', () => {
      this.scene.start(SceneKeys.TITLE_SCREEN);
    });
  }

  update() {
    let movingOneDirection = 5;
    while (movingOneDirection) {
      this.mario.y += 0.1;
      this.lina.y += 0.1;
      movingOneDirection -= 1;

      if (this.mario.y >= 320) {
        this.mario.y = 300;
        this.lina.y = 300;
      }
    }
  }

}

export default Credits;