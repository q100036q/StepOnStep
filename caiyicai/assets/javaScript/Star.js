cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0,
        score: 0,
        itemNo: 0,
        game:{
            default: null,
            serializable: false,
        }
    },
    init: function(game){
        this.game = game;
    },
    reuse(game){
        this.init(game);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    moveItem: function(){
        var moveAction = cc.moveBy(this.game.ground.width/this.moveSpeed,-this.game.ground.width,0);
        var gameOverAction = cc.callFunc(this.gameOver,this);
        this.node.runAction(cc.sequence(moveAction,gameOverAction));
    },
    getPlayerDistance:function(){
        
        var pickPosX1 = this.game.player.getComponent('Player').node.x;
        var pickPosX2 = this.game.player.getComponent('Player').node.x + this.game.player.getComponent('Player').node.getContentSize().width;
        var pickPosY = this.node.y +this.node.height+ this.game.ground.height;
        //判断是否和player重合了，通过星星的x坐标加上星星的宽去匹配player固定的x+player的宽，然后在判断player当前y坐标是不是小于星星的y坐标+高度即可
        if (((this.node.x >= pickPosX1) & (this.node.x <= pickPosX2))||((this.node.x + this.node.width >= pickPosX1) & (this.node.x + this.node.width <= pickPosX2))){
            if(pickPosY > this.game.player.getComponent('Player').node.y)
            {
                return true;
            }
        }
    },
    gameOver: function() {
        this.node.stopAllActions();
        this.node.destroy();
        this.game.gameOver();
    },
    onPicked: function(){
        this.game.gainScore(this.score);
        this.node.stopAllActions();
        this.game.despawnStar(this.node,this.itemNo);
    },
    update: function(dt) {
        if (this.getPlayerDistance()){
            this.onPicked();
            return;
        }
    },
});
