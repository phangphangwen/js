class room1 extends Phaser.Scene {

    constructor() {
        super('room1');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    
    }

    preload() {
        var map = this.load.tilemapTiledJSON('room1','assets/room1.json')

        this.load.image("fence", "assets/fence.png");
        this.load.image("land", "assets/land.png");
        this.load.image("land6", "assets/land6.png");
        this.load.image("plant2", "assets/plant2.png");
        this.load.image("plant5", "assets/plant5.png");
        this.load.image("plant6", "assets/plant6.png");

        //items to collect
        this.load.image("pumpkin", "assets/pumpkin.png");
        this.load.image("water", "assets/water.png");
        this.load.image("weapon", "assets/weapon.png");

        //bgm
        this.load.audio("roombgm","assets/roombgm.mp3");

        this.load.image("rottenPumpkin", "assets/rottenPumpkin.png");

        // character
        // this.load.atlas('left', 'assets/leftWalk.png', 'assets/leftWalk.json');
        // this.load.atlas('right', 'assets/rightWalk.png', 'assets/rightWalk.json');
        // this.load.atlas('up', 'assets/backWalk.png', 'assets/backWalk.json');
        // this.load.atlas('down', 'assets/frontWalk.png', 'assets/frontWalk.json');
    }


    create() {
        console.log('* room1 scene');

        var map = this.make.tilemap({key:'room1'});

        this.music = this.sound
      .add("roombgm",{
          loop : true,
      })
      .setVolume(0.15);
      this.roombgm= this.music;

      this.music.play();

        var tileset1= map.addTilesetImage('fence','fence');
        var tileset2= map.addTilesetImage('land','land');
        var tileset3= map.addTilesetImage('land6','land6');
        var tileset4= map.addTilesetImage('plant2','plant2');
        var tileset5= map.addTilesetImage('plant5','plant5');
        var tileset6= map.addTilesetImage('plant6','plant6');

    let tilesArray = [tileset1,tileset2,tileset3,tileset4,tileset5,tileset6]

    this.bg = map.createLayer('bg',tilesArray,0,0)//.setScale(2)
    this.walk = map.createLayer('walk',tilesArray,0,0)//.setScale(2)
    this.treeLayer = map.createLayer('treeLayer',tilesArray,0,0)//.setScale(2)
    this.treeLayer2 = map.createLayer('treeLayer2',tilesArray,0,0)//.setScale(2)
    this.treeLayer3 = map.createLayer('treeLayer3',tilesArray,0,0)//.setScale(2)
    this.treeLayer4 = map.createLayer('treeLayer4',tilesArray,0,0)//.setScale(2)
    this.Object = map.createLayer('Object',tilesArray,0,0)//.setScale(2)
    this.wall = map.createLayer('wall',tilesArray,0,0)//.setScale(2)
    this.moreWall = map.createLayer('moreWall',tilesArray,0,0)//.setScale(2)
    this.treeLayer5 = map.createLayer('treeLayer5',tilesArray,0,0)//.setScale(2)
    this.treeLayer6 = map.createLayer('treeLayer6',tilesArray,0,0)//.setScale(2)
    this.treeLayer7 = map.createLayer('treeLayer7',tilesArray,0,0)//.setScale(2)
    this.bottomField = map.createLayer('bottomField',tilesArray,0,0)
    this.field = map.createLayer('field',tilesArray,0,0)
    this.moreObject = map.createLayer('moreObject',tilesArray,0,0)//.setScale(2)
    this.veges = map.createLayer('veges',tilesArray,0,0)//.setScale(2)

        
       
    this.physics.world.bounds.width = this.bg.width;
    this.physics.world.bounds.height = this.bg.height;
  
    // load player into phytsics
    this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
    ).setScale(0.465)
    

    // enable debug
    window.player = this.player;
  
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
  
    //this.bg.setCollisionByExclusion(-1, true);
    this.treeLayer.setCollisionByExclusion(-1, true);
    this.treeLayer2.setCollisionByExclusion(-1, true);
    this.treeLayer3.setCollisionByExclusion(-1, true);
    this.treeLayer4.setCollisionByExclusion(-1, true);
    this.Object.setCollisionByExclusion(-1, true);
    this.wall.setCollisionByExclusion(-1, true);
    this.moreWall.setCollisionByExclusion(-1, true);
    this.treeLayer5.setCollisionByExclusion(-1, true);
    this.treeLayer6.setCollisionByExclusion(-1, true);
    this.treeLayer7.setCollisionByExclusion(-1, true);
    this.moreObject.setCollisionByExclusion(-1, true);


    //this.physics.add.collider(this.player,this.bg);
    this.physics.add.collider(this.player,this.treeLayer);
    this.physics.add.collider(this.player,this.treeLayer2);
    this.physics.add.collider(this.player,this.treeLayer3);
    this.physics.add.collider(this.player,this.treeLayer4);
    this.physics.add.collider(this.player,this.Object);
    this.physics.add.collider(this.player,this.wall);
    this.physics.add.collider(this.player,this.moreWall);
    this.physics.add.collider(this.player,this.treeLayer5);
    this.physics.add.collider(this.player,this.treeLayer6);
    this.physics.add.collider(this.player,this.treeLayer7);
    this.physics.add.collider(this.player,this.moreObject);
  
    //collectables
    this.pumpkin1 = this.physics.add.sprite(255,517,"pumpkin").setScale(1).setVisible(true)
    this.pumpkin2 = this.physics.add.sprite(510,531,"pumpkin").setScale(1)
    this.pumpkin3 = this.physics.add.sprite(434,127,"pumpkin").setScale(1)
    this.pumpkin4 = this.physics.add.sprite(47,198,"pumpkin").setScale(1)
    this.pumpkin5 = this.physics.add.sprite(46,592,"pumpkin").setScale(1)

    //obstacle
    // this.rottenPumpkin1 = this.physics.add.sprite(163,576,"rottenPumpkin").setScale(1)
    // this.rottenPumpkin2 = this.physics.add.sprite(223,580,"rottenPumpkin").setScale(1)
    // this.rottenPumpkin3 = this.physics.add.sprite(613,545,"rottenPumpkin").setScale(1)
    // this.rottenPumpkin1 = this.physics.add.sprite(525,576,"rottenPumpkin").setScale(1)
    // this.rottenPumpkin3 = this.physics.add.sprite(705,545,"rottenPumpkin").setScale(1)

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // collect item
    this.physics.add.overlap(this.player, this.pumpkin1, this.collectPumpkin, null, this);
    this.physics.add.overlap(this.player, this.pumpkin2, this.collectPumpkin, null, this);
    this.physics.add.overlap(this.player, this.pumpkin3, this.collectPumpkin, null, this);
    this.physics.add.overlap(this.player, this.pumpkin4, this.collectPumpkin, null, this);
    this.physics.add.overlap(this.player, this.pumpkin5, this.collectPumpkin, null, this);

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

    } // end of update // 


    gameScene(player, tile){
        console.log("gameScene function");
        let playerPos = {};
        playerPos.x = 165;
        playerPos.y = 240;
        playerPos.dir = "down";
        this.roombgm.loop = false;
        this.roombgm.stop();

        this.scene.start("gameScene",{ playerPos: playerPos })
    }

    collectPumpkin (player, pumpkin){
        console.log("collectPumpkin");
        pumpkin.disableBody(true,true);

        window.pumpkin = window.pumpkin + 1;
        console.log("/5 ", window.pumpkin);

        this.pumpkinScore.setText(  window.pumpkin + '/5 ');
        
    }

    

}
