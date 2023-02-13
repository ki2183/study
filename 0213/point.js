export class Point{
    constructor(stageWidth,stageHeight){
        this.stageWidth=stageWidth;
        this.stageHeight=stageHeight;

        this.minx=0;
        this.maxx=stageWidth*5/13;
        this.miny=0;
        this.maxy=stageWidth*5/13;

        this.x=[];
        this.y=[];

        for(let i=0; i<4; i++){
            this.x[i]=0;
            this.y[i]=0;
        }
        this.speed=-105;
    
        this.radian=stageWidth/13*5;
    }
    draw(ctx){
        this.animation();
        ctx.save();
        ctx.beginPath();
        for(let i=0; i<4; i++){
            (i===0) ? ctx.moveTo(this.x[i],this.y[i]) : ctx.lineTo(this.x[i],this.y[i]);
        }
        ctx.fill();
        
       

    }
    animation(){
            if(this.speed>-135){
                this.speed-=0.5;
            }

        this.x[0]=this.radian*Math.cos(Math.PI/90*this.speed)+this.maxx;
        this.y[0]=this.radian*Math.sin(Math.PI/90*this.speed)+150;

        this.x[1]=this.radian*Math.cos(Math.PI/90*-this.speed)+this.maxx;
        this.y[1]=this.radian*Math.sin(Math.PI/90*-this.speed)+this.maxx+150//up

        
        let GapX=this.y[0]-this.y[1]; //높이로 쓸꺼임
        let GapY=(this.y[0]-this.y[1])/5;

        this.x[2]=this.x[1]+GapX;
        this.y[2]=this.y[1]+GapY;

        this.x[3]=this.x[0]+GapX;
        this.y[3]=this.y[0]-GapY;

    }
}