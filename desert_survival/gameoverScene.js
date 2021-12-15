class gameoverScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'gameoverScene' });
  }

  preload() {

  }
  create () {
      console.log("gameoverScene")


      this.add.text(100,200, 'OH NO game over',
      { font: '50px Courier', fill: '#ffffff' });
this.add.text(50,450, 'Press spacebar to continue', 
    { font: '24px Courier', fill: '#ffffff' });

        // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to perload");

        let playerPos = {};
        playerPos.x = 479;
        playerPos.y = 550;
        playerPos.dir = "down" ;

        window.heart = 5;
        window.pumpkin = 0;
        window.water = 0;
        window.weapon = 0;

        this.scene.start("preloadScene",{playerPos: playerPos})
      },
      this
    );

    //   var spaceDown = this.input.keyboard.addKey('SPACE');

    //   spaceDown.on('down', function(){
    //       this.scene.start("gameScene");
    //       }, this );

  }

}