var level_state = {
    
    create: function() {
        this.starfield = game.add.tileSprite(0,0,1600,480,'starfield');
        
        player.create();
        
        enemy.create();
        
        var music = game.add.audio('spaceTune', 0.5, true);
        music.play();
        
    },
    
    update: function() {
        
        this.starfield.tilePosition.y += 2;
        
        player.update();
        
    }
    
};