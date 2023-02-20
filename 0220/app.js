import { Sun } from "./sun.js";
import { Hill } from "./hill.js";
import { Point } from "./point.js";
class App{
    constructor(){
        this.canvas=document.createElement('canvas');
        this.ctx=this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.sun = new Sun();
        this.curser={
            left:false,
            center:false,
            right:false,
            value:0
        }
        
        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();
        

        requestAnimationFrame(this.animate.bind(this));
    }
    resize(){
        this.stageWidth=document.body.clientWidth;
        this.stageHeight=document.body.clientHeight;

        this.canvas.width=this.stageWidth*2;
        this.canvas.height=this.stageHeight*2;

        this.ctx.scale(2,2);

        this.sun.resize(this.stageWidth,this.stageHeight);
        this.hill = new Hill(this.stageWidth,this.stageHeight,9,5,100,'#ff4674');
        
        this.point=new Point(this.stageWidth);
        this.hill2 = new Hill(this.stageWidth,this.stageHeight,11,8,0,'#fd6bea');
        this.point={x:this.stageWidth/2,y:this.stageHeight/2}
    }
    animate(t){


        requestAnimationFrame(this.animate.bind(this));
        this.ctx.fillStyle='#CCCCFF'
        this.ctx.fillRect(0,0,this.stageWidth,this.stageHeight);
        
        this.sun.draw(this.ctx,t);
        this.hill2.draw(this.ctx);
        this.hill.draw(this.ctx);
    }
}
window.onload=()=>{
    new App();
}