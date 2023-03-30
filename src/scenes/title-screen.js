import Phaser from "phaser";
import SceneKeys from "../constants/scene-keys";

class TitleScreen extends Phaser.Scene {
  constructor() {
    super(SceneKeys.TITLE_SCREEN);
  }

  preload() {
    this.load.image('titlescreen', 'assets/titlescreen.png');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width/2, height/2, 'titlescreen');
    
    this.createStartButton();
    this.createCreditsButton();

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start(SceneKeys.GAME);
    });
  }

  createStartButton() {
    const { width, height } = this.scale;

    const playButton = this.add.text(width/2, height/2, 'OR CLICK HERE', {
      fontSize: 24,
      fontFamily: '"Press Start 2P"',
      color: '#000',
      backgroundColor: '#fff',
      padding: 10,
    });

    playButton.setOrigin(0.5, -1).setInteractive();

    playButton.on('pointerover', () => {
      playButton.setStyle({ backgroundColor: '#A865C9' });
    });

    playButton.on('pointerout', () => {
      playButton.setStyle({ backgroundColor: '#fff' });
    });

    playButton.on('pointerdown', () => {
      this.scene.start(SceneKeys.GAME);
    });
  }

  createCreditsButton() {
    const { width, height } = this.scale;

    const creditsButton = this.add.text(width/2, height/2, 'Credits', {
      fontSize: 14,
      fontFamily: '"Press Start 2P"',
      color: '#000',
      backgroundColor: '#fff',
      padding: 10,
    });

    creditsButton.setOrigin(0.5, -3).setInteractive();

    creditsButton.on('pointerover', () => {
      creditsButton.setStyle({ backgroundColor: '#A865C9' });
    });

    creditsButton.on('pointerout', () => {
      creditsButton.setStyle({ backgroundColor: '#fff' });
    });

    creditsButton.on('pointerdown', () => {
      this.scene.start(SceneKeys.CREDITS);
    });

  }

}

export default TitleScreen;