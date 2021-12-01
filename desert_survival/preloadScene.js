class preloadScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'preloadScene' });
  }


  create () {

      console.log("preloadScene")
      this.add.text(50,200, 'Desert Survival',
            { font: '50px Courier', fill: '#ffffff' });
      this.add.text(50,450, 'Press spacebar to continue', 
          { font: '24px Courier', fill: '#ffffff' });

      var spaceDown = this.input.keyboard.addKey('SPACE');

      spaceDown.on('down', function(){
          this.scene.start("gameScene");
          }, this );

  }

}