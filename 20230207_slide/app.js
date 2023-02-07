import { Mousevalue } from "./mousevalue.js";
import { Slide } from "./slide.js";

class App{
    constructor(){
        this.a=0;
        this.canvas=document.createElement('canvas');
        this.ctx=this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
 
        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();

        this.mousevalue=new Mousevalue(window);
        this.mousevalue.mouseValue();

        requestAnimationFrame(this.animate.bind(this));
    }   
    resize(){
        this.stageWidth=document.body.clientWidth;
        this.stageHeight=document.body.clientHeight;

        this.canvas.width=this.stageWidth*2;
        this.canvas.height=this.stageHeight*2;

        this.ctx.scale(2,2);

        this.slide=new Slide(this.stageWidth,this.stageHeight,10);
        this.slide.resize();
    }
    animate(){
    
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        this.slide.draw(this.ctx,this.mousevalue.MOVEX());
 
    }

}
window.onload=()=>{
    new App();
}