import Phaser from "phaser";

import Colors from "./constants/colors";
import Preloader from "./scenes/preloader";
import TitleScreen from "./scenes/title-screen";
import Credits from "./scenes/credits";
import Game from "./scenes/game";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: Colors.PURPLE,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: [Preloader, TitleScreen, Credits, Game],
};

const game = new Phaser.Game(config);