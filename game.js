var game = new Phaser.Game(320, 480, Phaser.AUTO, '');

game.global = {
    music: null,
    score: 0,
    bossNum: 0
};

// Our init or boot state
// Loads progress bar, physics, and scaling
var boot_state = {
    
    preload: function() {
        
        game.load.image('progressBar', 'assets/progressBar.png');
        
        game.scale.maxWidth = 800;
        game.scale.maxHeight = 600;
        
    },
    
    create: function() {
        
        game.stage.backgroundColor = '000000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        if (!game.device.desktop) {
            
            // set the type of scaling to "show-all"
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            // Add a black color to the page, to hide the white borders we might have
            document.body.style.backgroundColor = '#000000';
            
            // Set the min and max width/height of the game
            /*game.scale.minWidth = 250;
            game.scale.minHeight = 170;
            game.scale.maxWidth = 320;
            game.scale.maxHeight = 480;*/
            
            // Center the game on the screen
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            
            // Appy the scale changes
            game.scale.setScreenSize();
            
        } else {
            
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            
        }
        
        game.state.start('load');
        
    },
    
};

// Our load state
// Loads initial assets for players, enemies, etc.
var load_state = {
    
    preload: function() {
        
        // Background
        game.load.image('starfield', 'assets/background.png');
        
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        
        // Create our player ship & preload assets
        player = new Player(game);
        player.preload();
        
        // Create our enemies
        enemy = new Enemy(game);
        enemy.preload();
        
        boss = new Boss(game);
        boss.preload();
        
        // Musics
        game.load.audio('spaceTune', ['assets/SpaceAwesome.mp3', 'assets/SpaceAwesome.ogg']);
        game.load.audio('laser', ['assets/laser.mp3', 'assets/laser.ogg']);
        game.load.audio('explosion', ['assets/explosion.mp3', 'assets/explosion.ogg']);
        
        
    },
    
    create: function() {
        
        game.state.start('menu');
        
    }
    
};

// Our menu state
// Starts the menu
var menu_state = {
    
    create: function() {
        
        var titleLabel = game.add.text(game.world.centerX, game.world.centerY, 'Space Shooter', { font: '35px Arial', fill: '#ffffff' });
        titleLabel.anchor.setTo(0.5, 0.5);
        
        var startLabel = game.add.text(game.world.centerX, game.world.centerY + 80, 'Tap to start', { font: '35px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        
        player.lives = 3;
        
        game.input.onDown.addOnce(this.start, this);
        
    },
    
    start: function() {
        
        game.state.start('level');
        
    }
    
};

var victory_state = {
    
    create: function() {
        
        var victoryLabel = game.add.text(game.world.centerX, game.world.centerY, 'You Win!!', { font: '35px Arial', fill: '#ffffff' });
        victoryLabel.anchor.setTo(0.5, 0.5);
        
        var playAgainLabel = game.add.text(game.world.centerX, game.world.centerY + 80, 'Tap to replay!', { font: '35px Arial', fill: '#ffffff' });
        playAgainLabel.anchor.setTo(0.5, 0.5);
        
        player.lives = 3;
        
        game.input.onDown.addOnce(this.restart, this);
        
    },
    
    restart: function() {
        game.state.start('level');
    } 
    
};

game.state.add('boot', boot_state);
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('level', level_state);
game.state.add('victory', victory_state);
game.state.start('boot');