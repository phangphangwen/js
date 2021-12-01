var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#A07437',
    pixelArt: true,
    scene: [preloadScene, gameScene,room1,room2,room3,room4]
};

var game = new Phaser.Game(config);