class gameScene extends Phaser.Scene {
  constructor ()
  {
      super({ key: 'gameScene' });
  }

  preload() {

      var map = this.load.tilemapTiledJSON('world','assets/world.json')

      //this.load.image("cloud", "assets/Street32x32.png");

       this.load.image('desert', 'assets/desert.png')
       this.load.image('plant2', 'assets/plant2.png')
       this.load.image('plant5', 'assets/plant5.png')


      // character
      this.load.atlas('left', 'assets/leftWalk.png', 'assets/leftWalk.json');
      this.load.atlas('right', 'assets/rightWalk.png', 'assets/rightWalk.json');
      this.load.atlas('up', 'assets/backWalk.png', 'assets/backWalk.json');
      this.load.atlas('down', 'assets/frontWalk.png', 'assets/frontWalk.json');

      //enemies
      this.load.spritesheet('ghost', 'assets/ghost.png', {
        frameWidth: 16,
        frameHeight: 16,
      });
      //this.load.spritesheet('ghost', 'assets/ghost.png',{ frameWidth:32, frameHeight:32 });

  } // end of preload //

  create (){

  console.log("world map")

 var map = this.make.tilemap({key:'world'});


  var tileset1= map.addTilesetImage('desert','desert');
  var tileset2= map.addTilesetImage('plant2','plant2');
  var tileset3= map.addTilesetImage('plant5','plant5');


  let tilesArray = [tileset1,tileset2,tileset3]

  this.bg = map.createLayer('bg',tilesArray,0,0)//.setScale(2)
  this.land = map.createLayer('land',tilesArray,0,0)//.setScale(2)
  this.object = map.createLayer('object',tilesArray,0,0)//.setScale(2)
  this.treeLayer0 = map.createLayer('treeLayer0',tilesArray,0,0)//.setScale(2)
  this.treeLayer = map.createLayer('treeLayer',tilesArray,0,0)//.setScale(2)
  this.treeLayer2 = map.createLayer('treeLayer2',tilesArray,0,0)//.setScale(2)
  this.room = map.createLayer('room',tilesArray,0,0)//.setScale(2)
  this.walk = map.createLayer('walk',tilesArray,0,0)//.setScale(2)
 

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

  this.player = this.physics.add.sprite(479, 513, 'right').setScale(0.5)
  window.player = this.player;

  this.player.setCollideWorldBounds(true); // don't go out of the this.map

  this.add.sprite(109,349, 'ghost');

  //this.bg.setCollisionByExclusion(-1, true);
  //this.land.setCollisionByExclusion(-1, true);

  //this.physics.add.collider(this.player,this.bg);
  //this.physics.add.collider(this.player,this.land);


  //  Input Events
  this.cursors = this.input.keyboard.createCursorKeys();

  // make the camera follow the player
  this.cameras.main.startFollow(this.player);


  } // end of create //

  update () {

  if(this.player.x > 143 && 
     this.player.x < 173 &&
     this.player.y > 163 && 
     this.player.y < 186 
  ){
      this.room1();
  }

  else if(
      this.player.x > 773 &&
      this.player.x < 833 &&
      this.player.y > 169 &&
      this.player.y < 186
  ){
      this.room2();
  }

  else if(
      this.player.x > 416 &
      this.player.x < 466 &
      this.player.y > 760 &
      this.player.y < 793
  ){
      this.room3();
  }

  else if(
      this.player.x > 443 &
      this.player.x < 519 &
      this.player.y > 466 &
      this.player.y < 493
  ){
      this.room4();
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


  } // end of update // 

  room1(player, tile){
      console.log("room1 function");
      this.scene.start("room1");
  }

  room2(player, title){
      console.log("room2 function");
      this.scene.start("room2");
  }

  room3(player, title){
      console.log("room3 function");
      this.scene.start("room3");
  }

  room4(player, title){
      console.log("room4 function");
      this.scene.start("room4");
  }
}



// class gameScene extends Phaser.Scene {
//   constructor() {
//     super({
//       key: "gameScene",
//     });

//     // Put global variable here
//   }

//   // incoming data from scene below
//   init(data) {
//     this.player = data.player;
//     this.inventory = data.inventory;
//   }

//   preload() {
//     this.load.tilemapTiledJSON("world", "assets/room1.json");

//     // Preload any images here
//     this.load.image("land", "assets/land.png");
//     this.load.image("plant", "assets/plant.png");
//     this.load.image("plant2", "assets/plant2.png");

//     // // chars
//     this.load.atlas('left', 'assets/leftWalk.png', 'assets/leftWalk.json');
//     this.load.atlas('right', 'assets/rightWalk.png', 'assets/rightWalk.json');
//     this.load.atlas('up', 'assets/frontWalk.png', 'assets/frontWalk.json');
//     this.load.atlas('down', 'assets/backWalk.png', 'assets/backWalk.json');




// } // end of preload //

// create (){

//  console.log("world map");

// var map = this.make.tilemap({key:'world'});


// let landTiles = map.addTilesetImage("land", "land");
//     let plantTiles = map.addTilesetImage("plant", "plant");
//     let plant2Tiles = map.addTilesetImage("plant2", "plant2");

//     // Load in layers by layers
//     this.bg = map.createLayer("bg", [landTiles,plant2Tiles], 0, 0);
//     this.floor = map.createLayer("floor", [landTiles,plant2Tiles], 0, 0);
//     this.decor = map.createLayer("decor", [landTiles,plant2Tiles], 0, 0);
//     this.tree = map.createLayer("tree", [landTiles,plant2Tiles], 0, 0);


// this.anims.create({ 
//     key: 'left', 
//    frames: [ 
//        { key: 'left', frame: 'left01' },
//        { key: 'left', frame: 'left02' }, 
//        { key: 'left', frame: 'left03' },         
//        { key: 'left', frame: 'left04' },
//        { key: 'left', frame: 'left05' },
//        { key: 'left', frame: 'left06' },
//        { key: 'left', frame: 'left07' },        
//        { key: 'left', frame: 'left08' },
//    ],
//            frameRate: 10,
//            repeat: -1
//        });

//    this.anims.create({ 
//     key: 'right', 
//    frames: [ 
//        { key: 'right', frame: 'right01' },
//        { key: 'right', frame: 'right02' }, 
//        { key: 'right', frame: 'right03' },         
//        { key: 'right', frame: 'right04' },
//        { key: 'right', frame: 'right05' },
//        { key: 'right', frame: 'right06' },
//        { key: 'right', frame: 'right07' },        
//        { key: 'right', frame: 'right08' },      
//    ],
//            frameRate: 10,
//            repeat: -1
//        });

//    this.anims.create({ 
//     key: 'up', 
//    frames: [ 
//        { key: 'up', frame: 'front01' },
//        { key: 'up', frame: 'front02' }, 
//        { key: 'up', frame: 'front03' },         
//        { key: 'up', frame: 'front04' },
//        { key: 'up', frame: 'front05' },
//        { key: 'up', frame: 'front06' },
//        { key: 'up', frame: 'front07' }, 
//        { key: 'up', frame: 'front08' },       
       
//            
//    ],
//            frameRate: 10,
//            repeat: -1
//        });

//    this.anims.create({ 
//     key: 'down', 
//    frames: [ 
//        { key: 'down', frame: 'back01' },
//        { key: 'down', frame: 'back02' }, 
//        { key: 'down', frame: 'back03' },         
//        { key: 'down', frame: 'back04' },
//        { key: 'down', frame: 'back05' },
//        { key: 'down', frame: 'back06' },
//        { key: 'down', frame: 'back07' },   
//        { key: 'down', frame: 'back08' },      
       
//            
//    ],
//            frameRate: 10,
//            repeat: -1
//        });

   
// this.physics.world.bounds.width = this.bgLayer.width*2;
// this.physics.world.bounds.height = this.bgLayer.height*2;



// // load player into phytsics
// this.player = this.physics.add.sprite(30, 260, 'right').setScale(0.9)

// window.player = this.player;

// this.player.setCollideWorldBounds(true); // don't go out of the this.map

// this.wallLayer.setCollisionByExclusion(-1, true);

// this.physics.add.collider(this.player,this.wallLayer);


// //  Input Events
// this.cursors = this.input.keyboard.createCursorKeys();

// // make the camera follow the player
// this.cameras.main.startFollow(this.player);


// } // end of create //

// //     this.load.spritsheet('ahnan', 'assets/leftWalk.png', 'assets/leftWalk.json'); 

// //   }

// //   create() {
// //     console.log("*** world scene");

// //     // Create the map from main
// //     let map = this.make.tilemap({key: "world",});

// //     // Load the game tiles
// //     // 1st parameter is name in Tiled,
// //     // 2nd parameter is key in Preload
// //     let landTiles = map.addTilesetImage("land", "land");
// //     let plantTiles = map.addTilesetImage("plant", "plant");
// //     let plant2Tiles = map.addTilesetImage("plant2", "plant2");

// //     // Load in layers by layers
// //     this.bg = map.createLayer("bg", [landTiles,plant2Tiles], 0, 0);
// //     this.floor = map.createLayer("floor", [landTiles,plant2Tiles], 0, 0);
// //     this.decor = map.createLayer("decor", [landTiles,plant2Tiles], 0, 0);
// //     this.tree = map.createLayer("tree", [landTiles,plant2Tiles], 0, 0);

// //     this.anims.create({
// //       key: "left",
// //       frames: [
// //           {key: "left", frame: 'left01'},
// //           {key: 'left', frame: 'left02'},
// //           {key: 'left', frame: 'left03'},
// //           {key: 'left', frame: 'left04'},
// //           {key: 'left', frame: 'left05'},
// //           {key: 'left', frame: 'left06'},
// //           {key: 'left', frame: 'left07'},
// //           {key: 'left', frame: 'left08'},

// //       ],
// //       frameRate: 10,
// //       repeat: -1
// //   });
  
// //   this.anims.create({
// //     key: 'right',
// //     frames: [
// //         {key: 'right', frame: 'right01'},
// //         {key: 'right', frame: 'right02'},
// //         {key: 'right', frame: 'right03'},
// //         {key: 'right', frame: 'right04'},
// //         {key: 'right', frame: 'right05'},
// //         {key: 'right', frame: 'right06'},
// //         {key: 'right', frame: 'right07'},
// //         {key: 'right', frame: 'right08'},

// //     ],
// //     frameRate: 10,
// //     repeat: -1
// // });

// // this.anims.create({
// //   key: 'front',
// //   frames: [
// //       {key: 'front', frame: 'front01'},
// //       {key: 'front', frame: 'front02'},
// //       {key: 'front', frame: 'front03'},
// //       {key: 'front', frame: 'front04'},
// //       {key: 'front', frame: 'front05'},
// //       {key: 'front', frame: 'front06'},
// //       {key: 'front', frame: 'front07'},
// //       {key: 'front', frame: 'front08'},

// //   ],
// //   frameRate: 10,
// //   repeat: -1
// // });

// // this.anims.create({
// //   key: 'back',
// //   frames: [
// //       {key: 'back', frame: 'back01'},
// //       {key: 'back', frame: 'back02'},
// //       {key: 'back', frame: 'back03'},
// //       {key: 'back', frame: 'back04'},
// //       {key: 'back', frame: 'back05'},
// //       {key: 'back', frame: 'back06'},
// //       {key: 'back', frame: 'back07'},
// //       {key: 'back', frame: 'back08'},

// //   ],
// //   frameRate: 10,
// //   repeat: -1
// // });

// // this.player = this.add.sprite(200,200,'back'); //.setScale(0.8).play('ahnan_walk')



//     // Add any text to the game
//     // this.add.text(10, 10, "Add any text here", {
//     //   font: "30px Courier",
//     //   fill: "#00FFFF",
//     // });

//     // Add main player here with physics.add.sprite

//     // Add time event / movement here

//     // get the tileIndex number in json, +1
//     //mapLayer.setTileIndexCallback(11, this.room1, this);

//     // Add custom properties in Tiled called "mouintain" as bool

//     // What will collider witg what layers
//     //this.physics.add.collider(mapLayer, this.player);

//     // create the arrow keys
//     //this.cursors = this.input.keyboard.createCursorKeys();

//     // camera follow player
//     //this.cameras.main.startFollow(this.player);
//   // } /////////////////// end of create //////////////////////////////

//   update() {
//   if (this.cursors.left.isDown){
//           this.player.body.setVelocityX(-200);
//           this.player.anims.play('left', true);

// }else if (this.cursors.right.isDown){
//   this.player.body.setVelocityX(280);
//   this.player.anims.play('right', true);
// }
// else if(this.cursors.up.isDown){
//     this.player.setVelocityX(-280);
//     this.player.anims.play('up',true);
// }
// else if(this.cursors.down.isDown){
//   this.player.setVelocityX(-280);
//   this.player.anims.play('down',true);
// }
// } /////////////////// end of update //////////////////////////////

// // if (cursors.up.isDown && player.body.touching.down)
// // {
// //     player.setVelocityY(-330);
// // }

//  // 

//   // Function to jump to room1
//   // room1(player, tile) {
//   //   console.log("room1 function");
//   //   this.scene.start("room1", {
//   //     player: player,
//   //     inventory: this.inventory,
//   //   });
//   // }
// } //////////// end of class world ////////////////////////
