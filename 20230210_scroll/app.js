import { Poligon } from "./poligon.js";

class App{
    constructor(){
        
        this.isClick=false;
        this.moveX=0;
        this.offsetX=0;

        this.canvas=document.createElement('canvas');
        this.ctx=this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        window.addEventListener('mousedown',this.MouseDown.bind(this),false);
        window.addEventListener('mousemove',this.MouseMove.bind(this),false);
        window.addEventListener('mouseup',this.MouseUp.bind(this),false);
       
        
        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }
    resize(){
        this.stageWidth=document.body.clientWidth;
        this.stageHeight=document.body.clientHeight;

        this.canvas.width=this.stageWidth*2;
        this.canvas.height=this.stageHeight*2;

        this.ctx.scale(2,2);

        this.poligon= new Poligon(
            this.stageWidth/2,
            this.stageHeight+this.stageHeight/2,
            this.stageHeight/2,
            20);
    }
    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.moveX*=0.92;
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        this.poligon.draw(this.ctx,this.moveX);
    }

    MouseDown(e){
        this.isClick=true;
        this.offsetX=e.clientX;
    }
    MouseMove(e){
        if(this.isClick===true){
            this.moveX=e.clientX-this.offsetX;
            this.offsetX=e.clientX;
        }
    }
    MouseUp(e){
        this.isClick=false;
    }
}

window.onload=()=>{
    new App();
}