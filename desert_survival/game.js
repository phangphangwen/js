var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#A07437',
    pixelArt: true,
    scene: [preloadScene,introduction,gamePlay,gameScene,room1,room2,room3,room4,gameoverScene,winningScene]
};

var game = new Phaser.Game(config);
window.heart = 5;
window.pumpkin = 0;
window.water = 0;
window.weapon = 0;