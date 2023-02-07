import { Mousevalue } from "./mousevalue.js";

const PI2 = Math.PI*2;
const half_root3=Math.sqrt(3);

export class Point{
    constructor(x,y,stageWidth,stageHeight){
        this.x=x;
        this.y=y;

        this.stageWidth=stageWidth;
        this.stageHeight=stageHeight;   
        
        this.radius=stageWidth/10;   
        this.radius_fixed=stageWidth/10;   
        this.moveX=0;

        this.minX=0;
        this.maxX=this.stageWidth;

        this.mouse=new Mousevalue(window);
        this.moveX=this.mouse.MOVEX;

        this.size_ratio_left=0;
        this.size_ratio_right=0;

        this.size_=1;
    }
    draw(ctx,moveX,permission){   
        this.size_animate();

        // console.log(this.stageWidth/2,this.x);
        if(0<=this.x<this.stageWidth/2){
            this.radius=this.radius_fixed*(this.size_ratio_left+1);
        }


        const angle=PI2/4;
        this.moveX=moveX*0.4;
        this.animate(permission);
        
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(PI2/360*-30);
        ctx.beginPath();

        ctx.save();
        ctx.beginPath();

        for(let i=0; i<4; i++){
            const x=this.radius*Math.cos(angle*i);
            const y=this.radius*Math.sin(angle*i);

            switch(i){

                case 0:
                    ctx.moveTo(y-this.radius/2*half_root3,x-this.radius/2); //
                    break;
                case 1:
                    ctx.lineTo(x,y);
                    break;
                case 2:
                    ctx.lineTo(y+this.radius/2*half_root3,x+this.radius/2); //
                    break;
                case 3:
                    ctx.lineTo(x,y);
                    break;
                default:
                    console.log(' ');
            }
        }
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.restore();
       
    }

    animate(permission){
        if(this.x>=this.minX&&this.x<=this.maxX){
            if(permission==true){
                this.x+=this.moveX;
            }
        }
        else if(this.x<0)
            this.x=0;
        else if(this.x>this.stageWidth)
            this.x=this.stageWidth; //범위를 벗어났을때를 대비
        
    }
    size_animate(){
    this.size_ratio_left=this.x/this.stageWidth;
    this.size_ratio_right=1-this.size_ratio_left;

        if(this.size_ratio<0)
            this.size_ratio_left=0;
        else if(this.size_ratio>this.stageWidth)
            this.size_ratio_left=1;
         
        if(this.size_ratio_right>this.stageWidth)
            this.size_ratio_right=0;
        else if(this.size_ratio_right<0)
            this.size_ratio_right=1;
    }
}