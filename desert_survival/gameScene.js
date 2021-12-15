class gameScene extends Phaser.Scene {
  constructor ()
  {
      super({ key: 'gameScene' });
  }

    // incoming data from scene below
    init(data) {
        this.playerPos = data.playerPos;
      }

    preload() {

      var map = this.load.tilemapTiledJSON('world','assets/world.json')

      //this.load.image("cloud", "assets/Street32x32.png");
       this.load.image('desert', 'assets/desert.png')
       this.load.image('desert2', 'assets/desert2.png')
       this.load.image('plant2', 'assets/plant2.png')
       this.load.image('plant5', 'assets/plant5.png')

       //items to collect
       this.load.image("pumpkin", "assets/pumpkin.png");
       this.load.image("water", "assets/water.png");
       this.load.image("weapon", "assets/weapon.png");
       this.load.image("heart", "assets/heart.png");

       //bgm
       this.load.audio("mapbgm","assets/mapbgm.mp3");

  } // end of preload //

    create (){

    console.log("world map")

    var map = this.make.tilemap({key:'world'});

    this.music = this.sound
      .add("mapbgm",{
          loop : true,
      })
      .setVolume(0.3);
      this.mapbgm= this.music;
      this.music.play();
      

    var tileset1= map.addTilesetImage('desert','desert');
    var tileset2= map.addTilesetImage('desert2','desert2');
    var tileset3= map.addTilesetImage('plant2','plant2');
    var tileset4= map.addTilesetImage('plant5','plant5');


    let tilesArray = [tileset1,tileset2,tileset3,tileset4]

    this.bg = map.createLayer('bg',tilesArray,0,0)//.setScale(2)
    this.walkCan = map.createLayer('walkCan',tilesArray,0,0)//.setScale(2)
    this.object = map.createLayer('object',tilesArray,0,0)//.setScale(2)
    this.treeLayer0 = map.createLayer('treeLayer0',tilesArray,0,0)//.setScale(2)
    this.fence = map.createLayer('fence',tilesArray,0,0)//.setScale(2)
    this.treeLayer = map.createLayer('treeLayer',tilesArray,0,0)//.setScale(2)
    this.treeLayer2 = map.createLayer('treeLayer2',tilesArray,0,0)//.setScale(2)
    this.treeLayer3 = map.createLayer('treeLayer3',tilesArray,0,0)//.setScale(2)
    this.walk = map.createLayer('walk',tilesArray,0,0)//.setScale(2)
    this.walk2 = map.createLayer('walk2',tilesArray,0,0)//.setScale(2)
    this.treeLayer4 = map.createLayer('treeLayer4',tilesArray,0,0)//.setScale(2)
    this.treeLayer5 = map.createLayer('treeLayer5',tilesArray,0,0)//.setScale(2)
    this.treeLayer6 = map.createLayer('treeLayer6',tilesArray,0,0)//.setScale(2)
    this.room = map.createLayer('room',tilesArray,0,0)//.setScale(2)
    this.avoid = map.createLayer('avoid',tilesArray,0,0)//.setScale(2)
    this.object2 = map.createLayer('object2',tilesArray,0,0)//.setScale(2)
    

     
  this.physics.world.bounds.width = this.bg.width;
  this.physics.world.bounds.height = this.bg.height;

  // load player into phytsics
  //this.player = this.physics.add.sprite(479, 513, 'right').setScale(0.5)

  // Receive position fropm init()
  this.player = this.physics.add.sprite(
    this.playerPos.x,
    this.playerPos.y,
    this.playerPos.dir
  ).setScale(0.465)


  // enable debug
  window.player = this.player;

  this.player.setCollideWorldBounds(true); // don't go out of the this.map

  //call bck enemies
  this.time.addEvent({
    delay: 1000,
    callback: this. cactusRightLeft,
    callbackScope: this,
    loop: false,
});


   //enemies
   this.cactus = this.physics.add.sprite(336,293,'cactusLeft').play('cactusLeftanims');

     //cactus
  var cactusLeft = map.findObject(
    "cactusLeft",
    (obj) => obj.name === "cactusLeft"

)
  this.physics.add.overlap(this.player, this.cactus, this.minusHeart, null, this);

  //this.add.sprite(109,349, 'ghost');

  this.bg.setCollisionByExclusion(-1, true);
  this.object.setCollisionByExclusion(-1, true);
  this.fence.setCollisionByExclusion(-1, true);
  this.treeLayer0.setCollisionByExclusion(-1, true);
  this.treeLayer2.setCollisionByExclusion(-1, true);
  this.treeLayer3.setCollisionByExclusion(-1, true);
  this.treeLayer4.setCollisionByExclusion(-1, true);
  this.treeLayer5.setCollisionByExclusion(-1, true);
  this.treeLayer6.setCollisionByExclusion(-1, true);
  this.room.setCollisionByExclusion(-1, true);

  this.physics.add.collider(this.player,this.bg);
  this.physics.add.collider(this.player,this.object);
  this.physics.add.collider(this.player,this.fence);
  this.physics.add.collider(this.player,this.treeLayer0);
  this.physics.add.collider(this.player,this.treeLayer2);
  this.physics.add.collider(this.player,this.treeLayer3);
  this.physics.add.collider(this.player,this.treeLayer4);
  this.physics.add.collider(this.player,this.treeLayer5);
  this.physics.add.collider(this.player,this.treeLayer6);
  this.physics.add.collider(this.player,this.room);


  //  Input Events
  this.cursors = this.input.keyboard.createCursorKeys();

  // make the camera follow the player
  this.cameras.main.startFollow(this.player);

  //heart
  this.heartIcon1 = this.add.sprite(50,40,"heart").setScale(0.8).setScrollFactor(0).setVisible(false);
  this.heartIcon2 = this.add.sprite(90,40,"heart").setScale(0.8).setScrollFactor(0).setVisible(false);
  this.heartIcon3 = this.add.sprite(130,40,"heart").setScale(0.8).setScrollFactor(0).setVisible(false);
  this.heartIcon4 = this.add.sprite(180,40,"heart").setScale(0.8).setScrollFactor(0).setVisible(false);
  this.heartIcon5 = this.add.sprite(220,40,"heart").setScale(0.8).setScrollFactor(0).setVisible(false);

  if ( window.heart == 5 ) {
    this.heartIcon1.setVisible(true);
    this.heartIcon2.setVisible(true);
    this.heartIcon3.setVisible(true);
    this.heartIcon4.setVisible(true);
    this.heartIcon5.setVisible(true);
  }else if (window.heart == 4) {
    this.heartIcon1.setVisible(true);
    this.heartIcon2.setVisible(true);
    this.heartIcon3.setVisible(true);
    this.heartIcon4.setVisible(true);
}else if (window.heart == 3) {
    this.heartIcon1.setVisible(true);
    this.heartIcon2.setVisible(true);
    this.heartIcon3.setVisible(true);
}else if (window.heart == 2) {
    this.heartIcon1.setVisible(true);
    this.heartIcon2.setVisible(true);
}else if (window.heart == 1) {
    this.heartIcon1.setVisible(true);
}

  //Disable pumpkin icon as pumpkins are collected
  this.pumpkinIcon = this.add.sprite(560,50,"pumpkin").setScale(1.2).setScrollFactor(0);
  this.waterIcon = this.add.sprite(560,90,"water").setScale(1.2).setScrollFactor(0);
  this.weaponIcon = this.add.sprite(560,130,"weapon").setScale(1.2).setScrollFactor(0);
  
  //scoreText
  this.pumpkinScore = this.add.text(580, 45, window.pumpkin + '/5 ', { 
  fontSize: '22px', 
  fill: '000000', 
  }).setScrollFactor(0);
  this.waterScore = this.add.text(580, 85, window.water + '/5 ', { 
  fontSize: '22px', 
  fill: '000000', 
  }).setScrollFactor(0);
  this.weaponScore = this.add.text(580, 120, window.weapon + '/5 ', { 
  fontSize: '22px', 
  fill: '000000', 
  }).setScrollFactor(0);


  } // end of create //

  update () {

  if(this.player.x > 133 && 
     this.player.x < 183 &&
     this.player.y > 223 && 
     this.player.y < 240
  ){
      this.room1();
  }

  else if(
      this.player.x > 773 &&
      this.player.x < 833 &&
      this.player.y > 223 &&
      this.player.y < 230
  ){
      this.room2();
  }

  else if(
      this.player.x > 416 &
      this.player.x < 466 &
      this.player.y > 799&
      this.player.y < 810
  ){
      this.room3();
  }

  else if(
      this.player.x > 443 &
      this.player.x < 519 &
      this.player.y > 540 &
      this.player.y < 548
  ){
      this.room4();
  }

  if (this.cursors.left.isDown) 
        {
            this.player.body.setVelocityX(-200);
            this.player.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-200);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(200);
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop()
            this.player.body.setVelocity(0);
        }


  } // end of update // 

  cactusRightLeft() {
    console.log("cactus moveDownUp");
    this.tweens.timeline({
      targets: this.cactus,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2000,
      tweens: [
        {
          x: 622,
        },
        {
          x: 336,
        },
      ],
    });
  }


  room1(player, tile){
      console.log("room1 function");
      let playerPos = {};
      playerPos.x = 386;
      playerPos.y = 705;
      playerPos.dir = "up";
      this.mapbgm.loop = false;
      this.mapbgm.stop();
      this.scene.start("room1",{playerPos: playerPos });
  }

  room2(player, title){
      console.log("room2 function");
      let playerPos = {};
      playerPos.x = 386;
      playerPos.y = 705;
      playerPos.dir = "up";
      this.mapbgm.loop = false;
      this.mapbgm.stop();
      this.scene.start("room2",{playerPos: playerPos });
  }

  room3(player, title){
      console.log("room3 function");
      let playerPos = {};
      playerPos.x = 386;
      playerPos.y = 705;
      playerPos.dir = "up";
      this.mapbgm.loop = false;
      this.mapbgm.stop();
      this.scene.start("room3",{playerPos: playerPos });
  }

  room4(player, title){
      console.log("room4 function");
      let playerPos = {};
      playerPos.x = 386;
      playerPos.y = 705;
      playerPos.dir = "up"
      this.mapbgm.loop = false;
      this.mapbgm.stop();
      this.scene.start("room4",{playerPos: playerPos });
  }

  minusHeart(player,cactusLeft){
    window.heart--;
    console.log("minus heart",window.heart);
    player.y = player.y +70
    if ( window.heart == 4 ){
      this.heartIcon5.setVisible(false);
    }else if (window.heart == 3) {
      this.heartIcon4.setVisible(false);
    }else if (window.heart == 2) {
      this.heartIcon3.setVisible(false);
    }else if (window.heart == 1) {
      this.heartIcon2.setVisible(false);
    }else if (window.heart == 0) {
      this.heartIcon1.setVisible(false);
      console.log('gameoverScene'); 

      this.scene.start('gameoverScene');
  } 
}
}

    //deduct live
//remove the boday
    //cactusLeft.disableBody(true,true);




//   function moveCactusLeft(){
//     console.log("moveDownUp");
//     this.tweens.timeline({
//       targets: this.cactus,
//       loop: -1, // loop forever
//       ease: "Linear",
//       duration: 2000,
//       tweens: [
//         {
//           x: 622,
//         },
//         {
//           x: 336,
//         },
//       ],
//     });
//   }


 


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
