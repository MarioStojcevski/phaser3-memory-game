export default class CountDownController {

     /** @type {Phaser.Scene} scene */
    scene;

    /** @type {Phaser.GameObjects.Text}*/
    label;

    /** @type {Phaser.Time.TimerEvent} */
    timerEvent;

    /**
    * @param {Phaser.Scene} scene
    * @param {Phaser.GameObjects.Text} label
    */

    constructor(scene, label) {
        this.scene = scene;
        this.label = label;
    }

    start(callback, duration = 35000) {
        this.stop();

        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.label.text = "0.00";
                this.stop();

                if(callback) {
                    callback();
                }
            }
        });
    }

    stop() {
        if(this.timerEvent) {
            this.timerEvent.destroy();
            this.timerEvent = undefined;
        }
    }

    update() {
        if(!this.timerEvent || this.timerEvent.getRemaining() <= 0) {
            return;
        }

        const remaining = this.timerEvent.getRemaining()/1000;
        this.label.text = `${remaining.toFixed(2)}`;
    }

}