cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab:{
            default: null,
            type: cc.Prefab,
        },
        goldPrefab:{
            default: null,
            type: cc.Prefab,
        },
        diamondPrefab:{
            default: null,
            type: cc.Prefab,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        ground: {
            default: null,
            type: cc.Node,
        },
        btnNode: {
            default: null,
            type: cc.Node,
        },
        scoreDisplay:{
            default: null,
            type: cc.Label,
        }
    },

    onLoad: function(){
        this.starPool = new cc.NodePool('Star');
        this.goldPool = new cc.NodePool('Gold');
        this.diamondPool = new cc.NodePool('Diamond');
        this.score = 0;
    },

    createNewItem: function(type){
        var itemPool = null;
        var newSatr = null;
        var itemName = null;
        var itemPrefab = null;
        if (!type){
            type = 1;
        }
        if (type == 1){
            itemPool = this.starPool;
            itemName = 'Star';
            itemPrefab = this.starPrefab;
        }else if(type == 2){
            itemPool = this.goldPool;
            itemName = 'Gold';
            itemPrefab = this.goldPrefab;
        }else if(type == 3){
            itemPool = this.diamondPool;
            itemName = 'Diamond';
            itemPrefab = this.diamondPrefab;
        }
        
        if (itemPool.size() > 0){
            newSatr = itemPool.get(this);
        }else{
            newSatr = cc.instantiate(itemPrefab);
        }
        this.node.addChild(newSatr);
        newSatr.setPosition(cc.p(this.ground.width/2 - newSatr.getContentSize().width,this.ground.y+this.ground.height/2 + newSatr.getContentSize().height/2));
        newSatr.getComponent(itemName).init(this);
        newSatr.getComponent(itemName).moveItem(); 
    },
    despawnStar: function(star,type){
        var itemPool = null;
        if (!type){
            type = 1;
        }
        if (type == 1){
            itemPool = this.starPool;
        }else if(type == 2){
            itemPool = this.goldPool;
        }else if(type == 3){
            itemPool = this.diamondPool;
        }
        itemPool.put(star);
        this.createNewItem(type);
    },
    gainScore: function(nScore){
        this.score += nScore;
        this.scoreDisplay.string = 'Score:' + this.score.toString();
    },
    getRandomPlayerPos:function(){
        return -cc.random0To1()* this.ground.width/2 + this.player.getComponent('Player').node.getContentSize().width;
    },
    onGamestart:function(){
        this.score = 0;
        this.scoreDisplay.string = 'Score:' + this.score.toString();
        this.createNewItem(3);
        this.btnNode.setPositionX(3000);
        var x = this.getRandomPlayerPos();
        this.player.getComponent('Player').resertPos(cc.p(x,this.ground.y/2+540));
    },
    gameOver: function(){
        this.player.getComponent('Player').stopMove();
        this.btnNode.setPositionX(0);
    },
    // update (dt) {},
});
