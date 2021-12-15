class room3 extends Phaser.Scene {

    constructor() {
        super('room3');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    
    }

    preload() {
        var map = this.load.tilemapTiledJSON('room3','assets/room3.json')

        this.load.image("home", "assets/home.png");
        this.load.image("horror", "assets/horror.png");
        this.load.image("horror3", "assets/horror3.png");
        this.load.image("land6", "assets/land6.png");

        //items to collect
        this.load.image("pumpkin", "assets/pumpkin.png");
        this.load.image("water", "assets/water.png");
        this.load.image("weapon", "assets/weapon.png");

         //bgm
         this.load.audio("roombgm","assets/roombgm.mp3");
    }

    create() {
        console.log('* room3 scene');

        var map = this.make.tilemap({key:'room3'});

        this.music = this.sound
      .add("roombgm",{
          loop : true,
      })
      .setVolume(0.3);
      this.roombgm= this.music;

      this.music.play();

        var tileset1= map.addTilesetImage('home','home');
        var tileset2= map.addTilesetImage('horror','horror');
        var tileset3= map.addTilesetImage('horror3','horror3');
        var tileset4= map.addTilesetImage('land6','land6');

    let tilesArray = [tileset1,tileset2,tileset3,tileset4]

    this.bg = map.createLayer('bg',tilesArray,0,0)//.setScale(2)
    this.walk = map.createLayer('walk',tilesArray,0,0)//.setScale(2)
    this.tree = map.createLayer('tree',tilesArray,0,0)//.setScale(2)
    this.moreTree = map.createLayer('moreTree',tilesArray,0,0)//.setScale(2)
    this.wall = map.createLayer('wall',tilesArray,0,0)//.setScale(2)
    this.moreWall = map.createLayer('moreWall',tilesArray,0,0)//.setScale(2)
    this.object = map.createLayer('object',tilesArray,0,0)//.setScale(2)
    this.moreObject = map.createLayer('moreObject',tilesArray,0,0)//.setScale(2)
    this.moremoreObject = map.createLayer('moremoreObject',tilesArray,0,0)//.setScale(2)

       
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
  
    this.bg.setCollisionByExclusion(-1, true);  // collider
    this.wall.setCollisionByExclusion(-1, true);
    //this.object.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player,this.bg);
    this.physics.add.collider(this.player,this.wall);
    //this.physics.add.collider(this.player,this.object);

    //collectables
    this.weapon1 = this.physics.add.sprite(593,153,"weapon").setScale(1)
    this.weapon2 = this.physics.add.sprite(288,134,"weapon").setScale(1)
    this.weapon3 = this.physics.add.sprite(213,576,"weapon").setScale(1)
    this.weapon4 = this.physics.add.sprite(47,231,"weapon").setScale(1)
    this.weapon5 = this.physics.add.sprite(718,497,"weapon").setScale(1)


    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // collect item
    this.physics.add.overlap(this.player, this.weapon1, this.collectweapon, null, this);
    this.physics.add.overlap(this.player, this.weapon2, this.collectweapon, null, this);
    this.physics.add.overlap(this.player, this.weapon3, this.collectweapon, null, this);
    this.physics.add.overlap(this.player, this.weapon4, this.collectweapon, null, this);
    this.physics.add.overlap(this.player, this.weapon5, this.collectweapon, null, this);

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

        // if(this.player.x > 349 && this.player.x < 409 &&
        //     this.player.y > 718
    
        // ){
        //     this.gameScene();
        // }

        if(this.player.x >687 && this.player.x < 718 &&
            this.player.y > 511
    
        ){
            this.winningScene();
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

    // gameScene(player, tile){
    //     console.log("gameScene function");
    //     let playerPos = {};
    //     playerPos.x = 482;
    //     playerPos.y = 810;
    //     playerPos.dir = "down";
    //     this.roombgm.loop = false;
    //     this.roombgm.stop();

    //     this.scene.start("gameScene",{ playerPos: playerPos })
    // }

    collectweapon (player, weapon){
        console.log("collectweapon");
        weapon.disableBody(true,true);

        window.weapon = window. weapon + 1;
        console.log("/5 ", window.weapon);

        this. weaponScore.setText(  window.weapon + '/5 ');
        
    }

    winningScene(player, tile){
        console.log("winningScene function");
        this.roombgm.loop = false;
        this.roombgm.stop();
        this.scene.start("winningScene") //,{ playerPos: playerPos }
    }

}
