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
        btnContinue: {
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
        this.next = false;
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
        if (this.itemNoConfig["length"] == this.itemCount){
            this.gameNextStation();
            return;
        }
        this.itemCount = this.itemCount + 1;
        this.createNewItem(this.itemNoConfig["no"+this.itemCount]);
    },
    gainScore: function(nScore){
        this.score += nScore;
        this.scoreDisplay.string = 'Score:' + this.score.toString();
    },
    getRandomPlayerPos:function(){
        return -cc.random0To1()* this.ground.width/2 + this.player.getComponent('Player').node.getContentSize().width;
    },
    gameStart:function(){
        this.itemCount = 1;
        if (!this.next)
            this.score = 0;
        else
            this.score = this.score;
            
        this.next = false;
        this.scoreDisplay.string = 'Score:' + this.score.toString();
        this.createNewItem(this.itemNoConfig["no"+this.itemCount]);
        this.btnNode.setPositionX(3000);
        this.btnContinue.setPositionX(3000);
        var x = this.getRandomPlayerPos();
        this.player.getComponent('Player').resertPos(cc.p(x,this.ground.y/2+540));
    },
    randomConfigData:function(){
        var randomConfig = Math.floor(cc.random0To1()*10);
        if (randomConfig == 0){
            randomConfig = 1;
        }
        var self = this;
        cc.loader.load(cc.url.raw('resources/itemConfig.json'), function(err,res){  
            if (err) {  
                cc.log(err);  
            }else{  

                self.itemNoConfig = res[randomConfig+""];
                self.gameStart();
            }  
        }); 
    },
    
    gameNextStation: function(){
        this.player.getComponent('Player').stopMove();
        this.btnContinue.setPositionX(0);
        this.next = true;
    },
    gameOver: function(){
        this.player.getComponent('Player').stopMove();
        this.btnNode.setPositionX(0);
    },
    resertData:function(){
        this.randomConfigData();
    },
    // update (dt) {},
});
