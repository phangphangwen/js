class room4 extends Phaser.Scene {

    constructor() {
        super('room4');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    
    }

    preload() {
        var map = this.load.tilemapTiledJSON('room4','assets/room4.json')

        this.load.image("futuristic4", "assets/fence.png");
        this.load.image("horror", "assets/horror.png");
        this.load.image("horror3", "assets/horror3.png");
        this.load.image("land6", "assets/land6.png");
        this.load.image("plant3", "assets/plant3.png");
        this.load.image("plant6", "assets/plant6.png");

         //bgm
         this.load.audio("roombgm","assets/roombgm.mp3");

    }

    create() {
        console.log('* room4 scene');

        var map = this.make.tilemap({key:'room4'});

        this.music = this.sound
      .add("roombgm",{
          loop : true,
      })
      .setVolume(0.3);
      this.roombgm= this.music;

      this.music.play();

        var tileset1= map.addTilesetImage('futuristic4','futuristic4');
        var tileset2= map.addTilesetImage('horror','horror');
        var tileset3= map.addTilesetImage('horror3','horror3');
        var tileset4= map.addTilesetImage('land6','land6');
        var tileset5= map.addTilesetImage('plant3','plant3');
        var tileset6= map.addTilesetImage('plant6','plant6');


    let tilesArray = [tileset1,tileset2,tileset3,tileset4,tileset5,tileset6]

    this.bg = map.createLayer('bg',tilesArray,0,0)//.setScale(2)
    this.walk = map.createLayer('walk',tilesArray,0,0)//.setScale(2)
    this.tree = map.createLayer('tree',tilesArray,0,0)//.setScale(2)
    this.moreTree = map.createLayer('moreTree',tilesArray,0,0)//.setScale(2)
    this.wall = map.createLayer('wall',tilesArray,0,0)//.setScale(2)
    this.object = map.createLayer('object',tilesArray,0,0)//.setScale(2)
    this.lowerObject = map.createLayer('lowerObject',tilesArray,0,0)//.setScale(2)
    this.moreObject = map.createLayer('moreObject',tilesArray,0,0)//.setScale(2)
  
       
    this.physics.world.bounds.width = this.bg.width;
    this.physics.world.bounds.height = this.bg.height;
  
    this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
    ).setScale(0.465)
  
    // load player into phytsics
   //this.player = this.physics.add.sprite(320, 563, 'up').setScale(0.5)
    window.player = this.player;
  
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
  
    this.bg.setCollisionByExclusion(-1, true);
    this.tree.setCollisionByExclusion(-1, true);
    this.moreTree.setCollisionByExclusion(-1, true);
    this.wall.setCollisionByExclusion(-1, true);
    this.object.setCollisionByExclusion(-1, true);
    this.lowerObject.setCollisionByExclusion(-1, true);
    this.moreObject.setCollisionByExclusion(-1, true);
    //this.object.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player,this.bg);
    this.physics.add.collider(this.player,this.tree);
    this.physics.add.collider(this.player,this.moreTree);
    this.physics.add.collider(this.player,this.wall);
    this.physics.add.collider(this.player,this.object);
    this.physics.add.collider(this.player,this.lowerObject);
    this.physics.add.collider(this.player,this.moreObject);
    //this.physics.add.collider(this.player,this.object);
  
  
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
  this.pumpkinIcon = this.add.sprite(557,50,"pumpkin").setScale(1.2).setScrollFactor(0);
  this.waterIcon = this.add.sprite(557,90,"water").setScale(1.2).setScrollFactor(0);
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

    update() {

        if(this.player.x > 349 && this.player.x < 409 &&
            this.player.y > 718
    
        ){
            this.gameScene();
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

    }


      
    gameScene(player, tile){
        console.log("gameScene function");
        let playerPos = {};
        playerPos.x = 482;
        playerPos.y = 548;
        playerPos.dir = "down";
        this.roombgm.loop = false;
        this.roombgm.stop();

        this.scene.start("gameScene",{ playerPos: playerPos })
    }

    

}
