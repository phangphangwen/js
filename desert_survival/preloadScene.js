class preloadScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'preloadScene' });
  }

  preload() {

    this.load.atlas('left', 'assets/leftWalk.png', 'assets/leftWalk.json');
    this.load.atlas('right', 'assets/rightWalk.png', 'assets/rightWalk.json');
    this.load.atlas('up', 'assets/backWalk.png', 'assets/backWalk.json');
    this.load.atlas('down', 'assets/frontWalk.png', 'assets/frontWalk.json');

    this.load.image("cover", "assets/cover.jpg");

    //enemies
    this.load.atlas('cactusLeft', 'assets/cactusLeft.png', 'assets/cactusLeft.json'); 
  }
  create () {
      console.log("preloadScene")

      this.add.image(0, 0, 'cover').setOrigin(0, 0).setScale(2.3);

      this.anims.create({ 
        key:'left', 
       frames:[ 
           {key:'left',frame:'left01'},
           {key:'left',frame:'left02'}, 
           {key:'left',frame:'left03'},         
           {key:'left',frame:'left04'},
           {key:'left',frame:'left05'},
           {key:'left',frame:'left06'},
           {key:'left',frame:'left07'},
           {key:'left',frame:'left08'},
       ],
               frameRate:10,
               repeat:-1
           });
  
       this.anims.create({ 
        key: 'right', 
       frames: [ 
           { key: 'right', frame: 'right01' },
           { key: 'right', frame: 'right02' }, 
           { key: 'right', frame: 'right03' },         
           { key: 'right', frame: 'right04' },
           { key: 'right', frame: 'right05' },
           { key: 'right', frame: 'right06' },
           { key: 'right', frame: 'right07' },        
           { key: 'right', frame: 'right08' },
       ],
               frameRate: 10,
               repeat: -1
           });
       
  
       this.anims.create({ 
        key: 'up', 
       frames: [ 
           { key: 'up', frame: 'back01' },
           { key: 'up', frame: 'back02' }, 
           { key: 'up', frame: 'back03' },         
           { key: 'up', frame: 'back04' },
           { key: 'up', frame: 'back05' },
           { key: 'up', frame: 'back06' },
           { key: 'up', frame: 'back07' },
           { key: 'up', frame: 'back08' },
       ],
               frameRate: 10,
               repeat: -1
           });
  
       
       this.anims.create({ 
        key:'down', 
       frames: [ 
           { key: 'down', frame: 'front01' },
           { key: 'down', frame: 'front02' }, 
           { key: 'down', frame: 'front03' },         
           { key: 'down', frame: 'front04' },
           { key: 'down', frame: 'front05' },
           { key: 'down', frame: 'front06' },
           { key: 'down', frame: 'front07' },
           { key: 'down', frame: 'front08' },
       ],
               frameRate: 10,
               repeat: -1
          });



        this.anims.create({ 
          key:'cactusLeftanims', 
         frames:[ 
             {key:'cactusLeft',frame:'cactusLeft01'},
             {key:'cactusLeft',frame:'cactusLeft02'}, 
             {key:'cactusLeft',frame:'cactusLeft03'},         
             {key:'cactusLeft',frame:'cactusLeft04'},
             {key:'cactusLeft',frame:'cactusLeft05'},
         ],
                 frameRate:10,
                 repeat:-1
            });


       //this.physics.add.sprite(479, 513, 'right').setScale(0.5)

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to introduction");

        let playerPos = {};
        playerPos.x = 479;
        playerPos.y = 550;
        playerPos.dir = "down" ;

        this.scene.start("introduction",{playerPos: playerPos})
      },
      this
    );


  }

}