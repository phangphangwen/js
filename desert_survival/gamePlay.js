class gamePlay extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'gamePlay' });
  }

  preload() {

    this.load.image("gamePlay", "assets/gamePlay.jpg");

  }
  create () {
      console.log("gamePlay")

      this.add.image(0, 0, 'gamePlay').setOrigin(0, 0).setScale(1.7);


        // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to gameScene");

        let playerPos = {};
        playerPos.x = 479;
        playerPos.y = 550;
        playerPos.dir = "down" ;

        window.heart = 5;
        window.pumpkin = 0;
        window.water = 0;
        window.weapon = 0;

        this.scene.start("gameScene",{playerPos: playerPos})
      },
      this
    );

  }

}