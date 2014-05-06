var App={Tetorimino:{},service:{}};App.Config={col:20,row:10,timeInterval:500},function(){"use strict";var a=App.Config,b=a.col,c=a.row;App.CellModel=Backbone.Model.extend({defaults:{x:0,y:0},validate:function(a){var b=a.x,c=a.y;return App.CellModel.validateCell(b,c)},isSamePlace:function(a){return this.get("x")===a.get("x")&&this.get("y")===a.get("y")}},{validateCell:function(a,d){return 0>a||a>c-1?"Invalid x position: "+a+" on (x, y) = ("+a+", "+d+")":0>d||d>b-1?"Invalid y position: "+d+" on (x, y) = ("+a+", "+d+")":void 0}})}(),function(){"use strict";var a=["I","J","L","O","S","T","Z"];App.TetoriminoModel=Backbone.Model.extend({fixed:!1,positions:null,centerPosition:null,initialize:function(){this.positions=this.createStartPositions(),this.centerPosition=this.createStartCenterPosition()},_action:function(a){if(this.fixed)return!0;var b=this.positions;return b.canMoveTo(a)?(b.moveTo(a),this.centerPosition.moveTo({x:a.x,y:a.y}),this.trigger("change"),!0):!1},down:function(){return this._action({x:0,y:1})},right:function(){return this._action({x:1,y:0})},left:function(){return this._action({x:-1,y:0})},rotate:function(){var a=this.positions,b=this.centerPosition,c=a.map(_.bind(function(a){var c=a.get("x")-b.get("x"),d=a.get("y")-b.get("y"),e=-d,f=c;return e+=b.get("x"),f+=b.get("y"),App.service.tetoriminoManager.canMoveTo(e,f)?this.createPosition({x:e,y:f}):!1},this));return _.every(c)?(this.positions.reset(c,{silent:!0}),this.trigger("change"),!0):!1},createPosition:function(a){return new App.TetoriminoCellModel({x:a.x,y:a.y,code:this.getCode()})},getCode:function(){throw new Error("Not implements getCode")},getStartCell:function(){throw new Error("Not implements getStartCell")},getStartCenterCell:function(){throw new Error("Not implements getStartCenterCell")},createStartPositions:function(){var a=this.getCode(),b=_.map(this.getStartCell(),function(b){return b.code=a,b});return new App.TetoriminoCellCollection(b)},createStartCenterPosition:function(){var a=this.getCode(),b=this.getStartCenterCell();return b.code=a,new App.TetoriminoCellModel(b)},fix:function(){this.fixed=!0,this.trigger("fix")},isFixed:function(){return this.fixed},getPositions:function(){return this.positions},placedIn:function(a,b){return this.positions.exists(a,b)}},{factory:function(){var b=_.random(0,a.length-1);return new App.Tetorimino[a[b]]}})}(),function(){"use strict";App.TetoriminoCellModel=App.CellModel.extend({defaults:{x:0,y:0,code:null},moveTo:function(a){return this.set({x:this.get("x")+a.x,y:this.get("y")+a.y}),this},placedIn:function(a,b){return this.get("x")===a&&this.get("y")===b},getCode:function(){return this.get("code")},positionSlideTo:function(a){return{x:this.get("x")+a.x,y:this.get("y")+a.y}},canMoveTo:function(a){var b=this.positionSlideTo(a);return App.service.tetoriminoManager.canMoveTo(b.x,b.y)}})}(),function(){"use strict";App.Tetorimino.I=App.TetoriminoModel.extend({getCode:function(){return"I"},getStartCell:function(){return[{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3}]},getStartCenterCell:function(){return{x:4,y:2}}})}(),function(){"use strict";App.Tetorimino.J=App.TetoriminoModel.extend({getCode:function(){return"J"},getStartCell:function(){return[{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:3,y:2}]},getStartCenterCell:function(){return{x:4,y:2}}})}(),function(){"use strict";App.Tetorimino.L=App.TetoriminoModel.extend({getCode:function(){return"L"},getStartCell:function(){return[{x:3,y:0},{x:3,y:1},{x:3,y:2},{x:4,y:2}]},getStartCenterCell:function(){return{x:3,y:2}}})}(),function(){"use strict";App.Tetorimino.O=App.TetoriminoModel.extend({getCode:function(){return"O"},getStartCell:function(){return[{x:3,y:0},{x:3,y:1},{x:4,y:0},{x:4,y:1}]},getStartCenterCell:function(){return{x:4,y:0}},rotate:function(){return!0}})}(),function(){"use strict";App.Tetorimino.S=App.TetoriminoModel.extend({getCode:function(){return"S"},getStartCell:function(){return[{x:5,y:0},{x:4,y:0},{x:4,y:1},{x:3,y:1}]},getStartCenterCell:function(){return{x:4,y:1}}})}(),function(){"use strict";App.Tetorimino.T=App.TetoriminoModel.extend({getCode:function(){return"T"},getStartCell:function(){return[{x:5,y:0},{x:4,y:0},{x:4,y:1},{x:3,y:0}]},getStartCenterCell:function(){return{x:4,y:0}}})}(),function(){"use strict";App.Tetorimino.Z=App.TetoriminoModel.extend({getCode:function(){return"Z"},getStartCell:function(){return[{x:3,y:0},{x:4,y:0},{x:4,y:1},{x:5,y:1}]},getStartCenterCell:function(){return{x:4,y:1}}})}(),function(){"use strict";var a=5;App.TetoriminoCollection=Backbone.Collection.extend({model:App.TetoriminoModel,fixedCellCollection:null,initialize:function(){for(var b=[],c=0;a>c;c++)b.push(this.createNewTetorimino());this.add(b,{silent:!0})},createNewTetorimino:function(){return App.TetoriminoModel.factory()},current:function(){return this.at(0)},dequeue:function(){var a=App.service.tetoriminoManager,b=this.shift();return this.add(this.createNewTetorimino()),a.addFixedPositions(b.getPositions()),this.trigger("dequeue"),b},next:function(){return this.at(1)}})}(),function(){"use strict";App.CellCollection=Backbone.Collection.extend({model:App.TetoriminoCellModel,exists:function(a,b){return this.some(function(c){return c.placedIn(a,b)})},findCell:function(a,b){return this.find(function(c){return c.placedIn(a,b)})},minX:function(){return this.min(function(a){return a.get("x")}).get("x")},minY:function(){return this.min(function(a){return a.get("y")}).get("y")},maxX:function(){return this.max(function(a){return a.get("x")}).get("x")},maxY:function(){return this.max(function(a){return a.get("y")}).get("y")}})}(),function(){"use strict";App.TetoriminoCellCollection=App.CellCollection.extend({moveTo:function(a){this.each(function(b){b.moveTo({x:a.x,y:a.y})})},canMoveTo:function(a){return this.every(function(b){return b.canMoveTo(a)})}})}(),function(){"use strict";var a=App.Config,b=a.row,c=a.col;App.FixedCellCollection=App.CellCollection.extend({_createCollectionMoveTo:function(a){var b=this.map(function(b){return new App.TetoriminoCellModel({x:b.get("x")+a.x,y:b.get("y")+a.y})});return new App.FixedCellCollection(b,{silent:!0})},destroyLine:function(a){var b=[];_.isArray(a)?b=a:b.push(a);for(var c=this.filter(function(a){return!_.contains(b,a.get("y"))}),d=function(a,b){return _.map(a,function(a){return a.get("y")<b&&a.set("y",a.get("y")+1),a})},e=0,f=b.length;f>e;e++){var g=b[e];c=d(c,g)}this.reset(c)},destroyFilledLine:function(){for(var a=[],d=_.bind(function(a){return this.filter(function(b){return b.get("y")===a}).length},this),e=0;c>e;e++){var f=d(e);f===b&&a.push(e)}a.length&&this.destroyLine(a)},reachTopLine:function(){return!!this.where({y:0}).length}})}(),function(){"use strict";App.TetoriminoManagerModel=Backbone.Model.extend({tetoriminoCollection:null,fixedCellCollection:null,initialize:function(a){this.tetoriminoCollection=a.tetoriminoCollection,this.fixedCellCollection=a.fixedCellCollection},current:function(){return this.tetoriminoCollection.current()},down:function(){this.current().down()||this.fix()},right:function(){this.current().right()},left:function(){this.current().left()},rotate:function(){this.current().rotate()},fix:function(){this.tetoriminoCollection.dequeue(),this.fixedCellCollection.destroyFilledLine()},isGameOver:function(){return this.fixedCellCollection.reachTopLine()},addFixedPositions:function(a){this.fixedCellCollection.add(a.models)},canMoveTo:function(a,b){var c=App.CellModel.validateCell(a,b);return c?!1:!this.isFixed(a,b)},isFixed:function(a,b){return this.fixedCellCollection.exists(a,b)},getTetoriminoCollection:function(){return this.tetoriminoCollection},getFixedCellCollection:function(){return this.fixedCellCollection}})}(),function(){"use strict";App.CellView=Backbone.View.extend({tagName:"td",fixed:!1,x:0,y:0,code:null,initialize:function(a){this.x=a.x,this.y=a.y;var b=App.service.tetoriminoManager;this.tetoriminoCollection=b.getTetoriminoCollection(),this.fixedCellCollection=b.getFixedCellCollection(),this.listenTo(this.fixedCellCollection,"add",this.fix),this.listenTo(this.fixedCellCollection,"reset",this.refresh),this.listenTo(App.mediator,"cell:watch",this.watchTetorimino),this.listenTo(this.tetoriminoCollection,"dequeue",this.watchTetorimino)},fix:function(a){this.setTetorimino(a)&&(this.fixed=!0)},setTetorimino:function(a){return this.fixed?!1:a.placedIn(this.x,this.y)?(this.setCode(a.getCode()),!0):(this.clearCode(),!1)},setCode:function(a){return a?(this.code=a,void this.$el.addClass(a)):void 0},clearCode:function(){this.code&&(this.$el.removeClass(),this.code=null)},render:function(){var a=this.tetoriminoCollection.current();return this.setTetorimino(a),this},refresh:function(){var a=this.fixedCellCollection.findCell(this.x,this.y);return a?(this.setCode(a.code),void(this.fixed=!0)):(this.clearCode(),this.fixed=!1,void this.watchTetorimino())},watchTetorimino:function(){if(!this.fixed){var a=this.tetoriminoCollection.current();this.listenTo(a,"change",this.render)}}})}(),function(){"use strict";App.UserOperatorView=Backbone.View.extend({pressing:!1,el:document.body,events:{keydown:"keydown",keyup:"keyup"},keydown:function(a){this.pressing=!0;var b=a.keyCode||a.which;37===b?App.service.tetoriminoManager.left():39===b?App.service.tetoriminoManager.right():40===b?App.service.tetoriminoManager.down():32===b&&App.service.tetoriminoManager.rotate()},keyup:function(){this.pressing=!1}})}(),function(){"use strict";App.TimerView=Backbone.View.extend({interval:500,initialize:function(){this.loopAction()},loopAction:function(){setTimeout(_.bind(function(){return App.service.tetoriminoManager.down(),App.service.tetoriminoManager.isGameOver()?void alert("Game over!"):void this.loopAction()},this),this.interval)}})}(),function(){"use strict";App.BoardView=Backbone.View.extend({tagName:"table",col:0,row:0,initialize:function(a){this.col=a.col,this.row=a.row},render:function(){for(var a=this.col,b=this.row,c=0;a>c;c++){for(var d=$("<tr/>"),e=[],f=0;b>f;f++){var g=new App.CellView({x:f,y:c});e.push(g.$el)}d.append(e),this.$el.append(d)}return this}})}(),function(){"use strict";App.SubSpaceView=Backbone.View.extend({el:"#subspace",render:function(){var a=new App.NextHoldView({collection:App.service.tetoriminoManager.getTetoriminoCollection()});return a.render(),this}})}(),function(){"use strict";App.NextHoldTetoriminoView=Backbone.View.extend({tagName:"table",positions:null,initialize:function(a){this.positions=a.positions},render:function(){for(var a=this.positions,b=a.maxX(),c=a.minX(),d=a.maxY(),e=a.minY(),f=b-c,g=d-e,h=[],i=0;g>=i;i++){for(var j=[],k=$("<tr/>"),l=0;f>=l;l++){var m=$("<td/>"),n=a.findCell(l+c,i+e);n&&m.addClass(n.getCode()),j.push(m)}k.append(j),h.push(k)}return this.$el.append(h),this}})}(),function(){"use strict";App.NextHoldView=Backbone.View.extend({el:"#subspace .next-tetorimino",collection:null,initialize:function(){this.listenTo(this.collection,"dequeue",this.render)},render:function(){var a=this.collection.next(),b=a.createStartPositions(),c=new App.NextHoldTetoriminoView({positions:b});return this.$el.html(c.render().$el),this}})}(),function(){"use strict";App.WorkSpaceView=Backbone.View.extend({el:"#workspace",board:null,initialize:function(a){this.board=a.board},render:function(){return this.$el.append(this.board.render().$el),this}})}(),function(){"use strict";App.AppView=Backbone.View.extend({workspace:null,subspace:null,initialize:function(a){var b=a.col,c=a.row,d=new App.TetoriminoCollection,e=new App.FixedCellCollection;App.service.tetoriminoManager=new App.TetoriminoManagerModel({col:b,row:c,tetoriminoCollection:d,fixedCellCollection:e}),this.workspace=new App.WorkSpaceView({board:new App.BoardView({col:b,row:c})}),this.subspace=new App.SubSpaceView(a.subspace||{})},render:function(){this.workspace.render(),this.subspace.render()},start:function(){App.mediator.trigger("cell:watch"),new App.UserOperatorView,new App.TimerView}})}(),function(){"use strict";App.mediator=_.extend({},Backbone.Events);var a=App.Config.col,b=App.Config.row,c=new App.AppView({col:a,row:b});c.render(),$(function(){c.start()})}();