export class Ball{
    constructor(stageWidth,stageHeight,radius,speed){
        this.stageWidth=stageWidth;
        this.stageHeight=stageHeight;
        this.radius=radius;
        this.speed=speed;

        this.x=radius*2+(Math.random()*stageWidth-radius*2);
        this.y=radius*2+(Math.random()*stageHeight-radius*2);

        this.vx=this.speed;
        this.vy=this.speed;

        this.color=RandomColor();
    }
    draw(ctx){
        this.move()

        ctx.fillStyle='blue';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
    }
    move(){
        const maxX=this.stageWidth-this.radius;
        const minX=this.radius;
        const maxY=this.stageHeight-this.radius;
        const minY=this.radius;

        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x>maxX||this.x<minX)
            this.vx*=-1;

        if(this.y>maxY||this.y<minY)
            this.vy*=-1;    
    }
}
function RandomColor(){
    let color='#';
    const colorlist=[1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];

    for(let i=0; i<6; i++){
        color+=Math.ceil(Math.random()*14);
    }

    return color;
}