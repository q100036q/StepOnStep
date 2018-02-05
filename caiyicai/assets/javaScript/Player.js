cc.Class({
    extends: cc.Component,

    properties: {
        moveDownSpeed: 0,
        moveUpSpeed: 0,
        maxHeight: 0,
    },

    onLoad: function(){
    },

    controlTouch: function(){
        var self = this;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch,event){
                var touchTime = self.node.getNumberOfRunningActions();
                if (touchTime < 1)
                    return true;
            },
            onTouchEnded: function(touch,event){
                self.moveFunc();
            }
        }, self.node);

    },
    getCentersPos:function(){
        var centerPos = cc.p(this.node.x,this.node.y);
        
        return centerPos;
    },
    resertPos: function(pos){
        this.controlTouch();
        this.node.setPosition(pos);
    },
    moveFunc: function(){
        var moveDown = cc.moveBy(this.maxHeight/this.moveDownSpeed,0,-this.maxHeight);
        var moveUp = cc.moveBy(this.maxHeight/this.moveUpSpeed,0,this.maxHeight);
        this.node.runAction(cc.sequence(moveDown,moveUp));
    },
    stopMove: function () {
        cc.eventManager.removeListeners(this.node);
        this.node.stopAllActions();
    },
    start () {

    },

    // update (dt) {},

});
