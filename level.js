var level_state = {
    
    create: function() {
        this.starfield = game.add.tileSprite(0,0,1600,480,'starfield');
        
        player.create();
        
        enemy.create();
        
        boss.create();
        
        game.global.music = game.add.audio('spaceTune', 0.5, true);
        game.global.music.play();
        
    },
    
    update: function() {
        
        this.starfield.tilePosition.y += 2;
        
        player.update();
        
        enemy.update();
        
        boss.update();
        
        if (boss.bosses.children.length < 1 && game.global.score > 250) {
            game.global.bossNum = 1;
            boss.spawnBoss();
        }
        if (boss.bosses.children.length < 2 && game.global.score > 1000) {
            console.log(boss.boss);
            game.global.bossNum = 2;
            boss.spawnBoss();
        }
        if (boss.bosses.children.length < 3 && game.global.score > 2000) {
            game.global.bossNum = 3;
            boss.spawnBoss();
        }
        if (boss.bosses.children.length < 4 && game.global.score > 3500) {
            game.global.bossNum = 4;
            boss.spawnBoss();
        }
        
        if (boss.bosses.countLiving() === 0 && game.global.score > 4000) {
            game.global.music.stop();
            game.time.events.add(1000, function() {
                game.state.start('victory');
            });
        }
        
    }
    
};