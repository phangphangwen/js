class room2 extends Phaser.Scene {

    constructor() {
        super('room2');
        
        // Put global variable here
    }


    init(data) {
    
    }

    preload() {
        var map = this.load.tilemapTiledJSON('room2','assets/room2.json')

        this.load.image("futuristic4", "assets/futuristic4.png");
        this.load.image("land6", "assets/land6.png");

        // character
        this.load.atlas('left', 'assets/leftWalk.png', 'assets/leftWalk.json');
        this.load.atlas('right', 'assets/rightWalk.png', 'assets/rightWalk.json');
        this.load.atlas('up', 'assets/backWalk.png', 'assets/backWalk.json');
        this.load.atlas('down', 'assets/frontWalk.png', 'assets/frontWalk.json');
    }

    create() {
        console.log('* room2 scene');

        var map = this.make.tilemap({key:'room2'});

        var tileset1= map.addTilesetImage('futuristic4','futuristic4');
        var tileset2= map.addTilesetImage('land6','land6');


    let tilesArray = [tileset1,tileset2]

    this.bg = map.createLayer('bg',tilesArray,0,0)//.setScale(2)
    this.tree = map.createLayer('tree',tilesArray,0,0)//.setScale(2)
    this.moreTree = map.createLayer('moreTree',tilesArray,0,0)//.setScale(2)
    this.object = map.createLayer('object',tilesArray,0,0)//.setScale(2)
    this.wall = map.createLayer('wall',tilesArray,0,0)//.setScale(2)
    this.moreObject = map.createLayer('moreObject',tilesArray,0,0)//.setScale(2)
    this.moremoreObject = map.createLayer('moremoreObject',tilesArray,0,0)//.setScale(2)
        
    this.anims.create({ 
        key: 'left', 
       frames: [ 
           { key: 'left', frame: 'left01' },
           { key: 'left', frame: 'left02' }, 
           { key: 'left', frame: 'left03' },         
           { key: 'left', frame: 'left04' },
           { key: 'left', frame: 'left05' },
           { key: 'left', frame: 'left06' },
           { key: 'left', frame: 'left07' },        
           { key: 'left', frame: 'left08' },     
       ],
               frameRate: 10,
               repeat: -1
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
        key: 'down', 
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
  
       
    this.physics.world.bounds.width = this.bg.width;
    this.physics.world.bounds.height = this.bg.height;
  
  
  
    // load player into phytsics
    this.player = this.physics.add.sprite(320, 563, 'up').setScale(0.5)
    window.player = this.player;
  
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
  
    this.bg.setCollisionByExclusion(-1, true);
    this.wall.setCollisionByExclusion(-1, true);
    //this.Object.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player,this.bg);
    this.physics.add.collider(this.player,this.wall);
    //this.physics.add.collider(this.player,this.Object);
  
  
    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
  
  
    } // end of create //

    update() {

        if(this.player.x > 280 && this.player.x < 346 &&
            this.player.y > 598
        ){
            this.gameScene();
        }

        if (this.cursors.left.isDown) 
        {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);
        } else {
            this.player.setVelocity(0);
        }

    }

    gameScene(player, tile){
        console.log("gameScene function");
        this.scene.start("gameScene");
    }

    

}
