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
    this.createCharacters();
    
    this.createBackButton();

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start(SceneKeys.GAME);
    });
  }

  createCharacters() {
    const { width, height } = this.scale;

    const mario = this.add.image(width/2, height/2, "mario");
    const lina = this.add.image(width/2, height/2, "lina");

    mario.setOrigin(1, 1);
    lina.setOrigin(0, 1);
    
    mario.setScale(0.5);
    lina.setScale(0.5);

    this.add.text(width/2, height/2, 'Credits', {
      fontSize: 24,
      fontFamily: '"Press Start 2P"',
      color: '#fff',
    }).setOrigin(0.5, -1);
  }

  createBackButton () {
    const { width, height } = this.scale;

    const backButton = this.add.text(width/2, height/2, 'Back', {
      fontSize: 14,
      fontFamily: '"Press Start 2P"',
      color: '#000',
      backgroundColor: '#fff',
      padding: 10,
    });

    backButton.setOrigin(0.5, -2).setInteractive();

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

}

export default Credits;