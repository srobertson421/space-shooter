var Enemy = function(game) {
    this.game = game;
    this.enemies = null;
};

Enemy.prototype = {
    
    preload: function() {
        
        this.game.load.image('enemy1', 'assets/enemies/enemy2.png');
        
    },
    
    create: function() {
        
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        //this.enemies.createMultiple(3, 'enemy1');
        
        this.createEnemy();
        this.game.time.events.add(Phaser.Timer.SECOND * 1, this.createEnemy, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.createEnemy, this);
        
        /*for (var i = 0; i < 3; i++) {
            
            var enemy = this.enemies.create(0, 0, 'enemy1')
            
            this.game.add.tween(enemy).to({x: 20, y: 20}, 2000, Phaser.Easing.Linear.None)
                .to({y: 250, x: 300}, 2000, Phaser.Easing.Linear.None)
                .to({y: 280, x: 20}, 2000, Phaser.Easing.Linear.None)
                .to({y: 155, x: this.game.world.width - 75}, 2000, Phaser.Easing.Linear.None)
                .loop().start();
            
        }*/
        
        
    },
    
    update: function() {
        
    },
    
    createEnemy: function() {
        
        var enemy = this.enemies.create(0, 0, 'enemy1')
            
        this.game.add.tween(enemy).to({x: 20, y: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 250, x: 300}, 2000, Phaser.Easing.Linear.None)
            .to({y: 280, x: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 155, x: this.game.world.width - 75}, 2000, Phaser.Easing.Linear.None)
            .loop().start();
        
    }
    
};