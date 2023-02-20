export class Sun{
    constructor(){
        this.radius=100;
        this.total=60;
        this.gap=1/this.total;
        this.origin_pos=[];
        this.pos=[];

        for(let i=0; i<this.total; i++){
            const pos= this.getCirclePoint(i,this.gap,this.radius);
            this.origin_pos[i]=pos;
            this.pos[i]=pos;
        }
        
        this.fps=18;
        this.frame=1000/this.fps;

        window.addEventListener('mousemove',this.move.bind(this),false);
    }
    resize(stageWidth,stageHeight){
        this.stageWidth=stageWidth;
        this.stageHeight=stageHeight;

        this.translate_default={
            x:this.stageWidth/2,
            y:this.stageHeight/5
        }
        this.translate={
            x:this.stageWidth/2,
            y:this.stageHeight/5
        }
    }
    draw(ctx,t,curser){
        if(!this.time){
            this.time=t;
        }
        const now=t-this.time;

        if(now>this.frame){
            this.time=t;
            this.getAnimatePoint();
        }
        ctx.save();
        ctx.translate(this.translate.x,this.translate.y);
        ctx.beginPath();

        ctx.fillStyle="rgb(208, 167, 0)";
        for(let i=0; i<this.total; i++){
            (i===0) ? ctx.moveTo(this.pos[i].x,this.pos[i].y) : ctx.lineTo(this.pos[i].x,this.pos[i].y);
        }
        ctx.fill();
        ctx.restore();
    }
    getCirclePoint(i,gap,radius){
        const theta=Math.PI*gap*i*2;
        
        return {
            x:radius*Math.cos(theta),
            y:radius*Math.sin(theta),
        }
    }

    getAnimatePoint(){
        for(let i=0; i<this.total; i++){
            const pos=this.origin_pos;
            this.pos[i]={
                x:pos[i].x+this.random_plus(5),
                y:pos[i].y+this.random_plus(5),
            }
        }
    }

    random_plus(max){
        return Math.random()*max;
    }
    move(e){
        gsap.to(this.translate,{
            x:this.stageWidth-e.offsetX,
            duration:15,
            delay:0.1,
            ease: 'Power0.easeOut'
        });

    }
}