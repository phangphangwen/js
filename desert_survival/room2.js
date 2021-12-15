class room2 extends Phaser.Scene {

    constructor() {
        super('room2');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    
    }

    preload() {
        var map = this.load.tilemapTiledJSON('room2','assets/room2.json')

        this.load.image("futuristic4", "assets/futuristic4.png");
        this.load.image("land6", "assets/land6.png");

        //items to collect
        this.load.image("pumpkin", "assets/pumpkin.png");
        this.load.image("water", "assets/water.png");
        this.load.image("weapon", "assets/weapon.png");

         //bgm
        this.load.audio("roombgm","assets/roombgm.mp3");

        
        this.load.image("emptyBottle", "assets/emptyBottle.png");

        // character
        // this.load.atlas('left', 'assets/leftWalk.png', 'assets/leftWalk.json');
        // this.load.atlas('right', 'assets/rightWalk.png', 'assets/rightWalk.json');
        // this.load.atlas('up', 'assets/backWalk.png', 'assets/backWalk.json');
        // this.load.atlas('down', 'assets/frontWalk.png', 'assets/frontWalk.json');
    }

    create() {
        console.log('* room2 scene');

        var map = this.make.tilemap({key:'room2'});

        this.music = this.sound
      .add("roombgm",{
          loop : true,
      })
      .setVolume(0.3);
      this.roombgm= this.music;

      this.music.play();

      
        var tileset1= map.addTilesetImage('futuristic4','futuristic4');
        var tileset2= map.addTilesetImage('land6','land6');


    let tilesArray = [tileset1,tileset2]

    this.bg = map.createLayer('bg',tilesArray,0,0)//.setScale(2)
    this.walk = map.createLayer('walk',tilesArray,0,0)//.setScale(2)
    this.tree = map.createLayer('tree',tilesArray,0,0)//.setScale(2)
    this.moreTree = map.createLayer('moreTree',tilesArray,0,0)//.setScale(2)
    this.moremoreTree = map.createLayer('moremoreTree',tilesArray,0,0)//.setScale(2)
    this.object = map.createLayer('object',tilesArray,0,0)//.setScale(2)
    this.wall = map.createLayer('wall',tilesArray,0,0)//.setScale(2)
    this.treeLayer = map.createLayer('treeLayer',tilesArray,0,0)//.setScale(2)
    this.moreObject = map.createLayer('moreObject',tilesArray,0,0)//.setScale(2)
    this.moremoreObject = map.createLayer('moremoreObject',tilesArray,0,0)//.setScale(2)

       
    this.physics.world.bounds.width = this.bg.width;
    this.physics.world.bounds.height = this.bg.height;
  
  
  
    // load player into phytsics
    //this.player = this.physics.add.sprite(320, 563, 'up').setScale(0.5)

    this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
    ).setScale(0.465)

    window.player = this.player;
  
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
  
    //this.bg.setCollisionByExclusion(-1, true);
    this.wall.setCollisionByExclusion(-1, true);
    this.tree.setCollisionByExclusion(-1, true);
    this.moreTree.setCollisionByExclusion(-1, true);
    this.moremoreTree.setCollisionByExclusion(-1, true);
    this.object.setCollisionByExclusion(-1, true);
    this.treeLayer.setCollisionByExclusion(-1, true);
    this.moreObject.setCollisionByExclusion(-1, true);
    this.moremoreObject.setCollisionByExclusion(-1, true);

    //this.physics.add.collider(this.player,this.bg);
    this.physics.add.collider(this.player,this.wall);
    this.physics.add.collider(this.player,this.tree);
    this.physics.add.collider(this.player,this.moreTree);
    this.physics.add.collider(this.player,this.moremoreTree);
    this.physics.add.collider(this.player,this.object);
    this.physics.add.collider(this.player,this.treeLayer);
    this.physics.add.collider(this.player,this.moreObject);
    this.physics.add.collider(this.player,this.moremoreObject);
  
    //collectables
    this.water1 = this.physics.add.sprite(593,153,"water").setScale(1)
    this.water2 = this.physics.add.sprite(288,134,"water").setScale(1)
    this.water3 = this.physics.add.sprite(213,576,"water").setScale(1)
    this.water4 = this.physics.add.sprite(47,231,"water").setScale(1)
    this.water5 = this.physics.add.sprite(718,497,"water").setScale(1)

    //obstacle
    this.emptyBottle1 = this.add.sprite(384,191,"emptyBottle").setScale(1)
    this.emptyBottle2 = this.add.sprite(280,367,"emptyBottle").setScale(1)
    this.emptyBottle3 = this.add.sprite(613,545,"emptyBottle").setScale(1)

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // collect item
    this.physics.add.overlap(this.player, this.water1, this.collectWater, null, this);
    this.physics.add.overlap(this.player, this.water2, this.collectWater, null, this);
    this.physics.add.overlap(this.player, this.water3, this.collectWater, null, this);
    this.physics.add.overlap(this.player, this.water4, this.collectWater, null, this);
    this.physics.add.overlap(this.player, this.water5, this.collectWater, null, this);

    //Disable pumpkin icon as pumpkins are collected
    this.pumpkinIcon = this.add.sprite(570,50,"pumpkin").setScale(1).setScrollFactor(0);
    this.waterIcon = this.add.sprite(570,85,"water").setScale(1).setScrollFactor(0);
    this.weaponIcon = this.add.sprite(570,120,"weapon").setScale(1).setScrollFactor(0);
    
    //scoreText
    this.pumpkinScore = this.add.text(590, 50, window.pumpkin + '/5 ', { 
    fontSize: '20px', 
    fill: '000000', 
    }).setScrollFactor(0);
    this.waterScore = this.add.text(590, 85, window.water + '/5 ', { 
    fontSize: '20px', 
    fill: '000000', 
    }).setScrollFactor(0);
    this.weaponScore = this.add.text(590, 120, window.weapon + '/5 ', { 
    fontSize: '20px', 
    fill: '000000', 
    }).setScrollFactor(0);
  
        
    } // end of create //

    update() {

        if(this.player.x > 356 && this.player.x < 422 &&
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
        playerPos.x = 802;
        playerPos.y = 230;
        playerPos.dir = "down";
        this.roombgm.loop = false;
        this.roombgm.stop();

        this.scene.start("gameScene",{ playerPos: playerPos })
    }

    collectWater (player, water){
        console.log("collectWater");
        water.disableBody(true,true);

        window.water = window.water + 1;
        console.log("/5 ", window.water);

        this.waterScore.setText(  window.water + '/5 ');
        
    }

}
