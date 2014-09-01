var Enemy = function(game) {
    this.game = game;
    this.enemies = null;
    this.explosions = null;
};

Enemy.prototype = {
    
    preload: function() {
        
        this.game.load.image('enemy1', 'assets/enemies/enemy1.png');
        this.game.load.image('enemy2', 'assets/enemies/enemy2.png');
        this.game.load.image('enemy3', 'assets/enemies/enemy3.png');
        this.game.load.image('enemy4', 'assets/enemies/enemy4.png');
        
        this.game.load.spritesheet('explosion', 'assets/explosion.png', 64, 64);
        
    },
    
    create: function() {
        
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        //this.enemies.createMultiple(3, 'enemy1');
        
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(20, 'explosion');
        this.explosions.forEach(this.explosionSet, this);
        
        this.spawnEnemies();
        
        
    },
    
    explosionSet: function(explosion) {
        
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('explosion');
        
    },
    
    update: function() {
        
        /*if (this.enemies.countLiving() === 0) {
            this.spawnEnemies();
        }*/
        
    },
    
    spawnEnemies: function() {
        
        if (this.enemies.countLiving() > 0) {
            return;
        }
        
        var enemyType = this.game.rnd.integerInRange(1, 4);
        var enemyPattern = this.game.rnd.integerInRange(1, 4);
        var enemyAmount = this.game.rnd.integerInRange(1, 6);
        console.log(enemyAmount);
        
        this.game.time.events.repeat(Phaser.Timer.SECOND * 1, enemyAmount, this.createEnemy, this, enemyType, enemyPattern);
        
    },
    
    createEnemy: function(enemyType, enemyPattern) {
        
        var enemy = null;
        
        // Check enemyType and create the appropriate enemy
        if (enemyType === 1) {
            enemy = this.enemies.create(0, 0, 'enemy' + enemyType);
        } else if (enemyType === 2) {
            enemy = this.enemies.create(this.game.world.width, 0, 'enemy' + enemyType);
        } else if (enemyType === 3) {
            enemy = this.enemies.create(0, 0, 'enemy' + enemyType);
        } else {
            enemy = this.enemies.create(this.game.world.width, 0, 'enemy' + enemyType);
        }
        
        // Check enemyPattern and create appropriate tween animation
        if (enemyPattern === 1) {
            this.alphaPattern(enemy);
        } else if (enemyPattern === 2) {
            this.betaPattern(enemy);
        } else if (enemyPattern === 3) {
            this.charliePattern(enemy);
        } else {
            this.deltaPattern(enemy);
        }
        
        console.log(this.enemies.countLiving());
        
    },
    
    // First tween movement callback for enemies
    alphaPattern: function(enemy) {
        
        this.game.add.tween(enemy).to({x: 20, y: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 250, x: 300}, 2000, Phaser.Easing.Linear.None)
            .to({y: 280, x: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 155, x: this.game.world.width - 75}, 2000, Phaser.Easing.Linear.None)
            .loop().start();
        
    },
    
    // Second tween movement callback for enemies
    betaPattern: function(enemy) {
        
        this.game.add.tween(enemy).to({x: this.game.world.width - 20, y: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 250, x: this.game.world.width - 300}, 2000, Phaser.Easing.Linear.None)
            .to({y: 280, x: this.game.world.width - 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 155, x: this.game.world.width - 75}, 2000, Phaser.Easing.Linear.None)
            .loop().start();
        
    },
    
    // Third tween movement callback for enemies
    charliePattern: function(enemy) {
        
        this.game.add.tween(enemy).to({x: 20, y: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 250, x: 300}, 2000, Phaser.Easing.Linear.None)
            .to({y: 280, x: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 155, x: this.game.world.width - 75}, 2000, Phaser.Easing.Linear.None)
            .loop().start();
        
    },
    
    // Fourth tween movement callback for enemies
    deltaPattern: function(enemy) {
        
        this.game.add.tween(enemy).to({x: this.game.world.width - 20, y: 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 250, x: this.game.world.width - 300}, 2000, Phaser.Easing.Linear.None)
            .to({y: 280, x: this.game.world.width - 20}, 2000, Phaser.Easing.Linear.None)
            .to({y: 155, x: this.game.world.width - 75}, 2000, Phaser.Easing.Linear.None)
            .loop().start();
        
    }
    
};