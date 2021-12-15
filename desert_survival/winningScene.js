class winningScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'winningScene' });
  }

preload(){
//introImage
// this.load.image('image', 'assets/introImage.png'); 

}


  create () {

      console.log("winningScene")



    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world");

        let playerPos = {};
        playerPos.x = 20;
        playerPos.y = 353;
        playerPos.dir = "down" ;

        this.scene.start("world",{playerPos: playerPos})
      },
      this
    );


      this.add.text(50,200, 'Congratulations',
              { font: '50px VT323', fill: '#ffffff' });
        this.add.text(50,260, 'YOU WIN',
              { font: '50px VT323', fill: '#ffffff' });
        this.add.text(50,500, 'Press spacebar to replay', 
            { font: '24px VT323', fill: '#ffffff' });

  }//end of

}