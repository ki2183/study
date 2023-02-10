const PI2=Math.PI*2;

export class Poligon{
    constructor(x,y,size,sides){
        this.x=x;
        this.y=y+y/3;
        this.size=size;
        this.sides=sides;
        this.rotate=0;
        this.rotate2=-Math.PI*2/360*30;
        this.radias=y;
        this.radias2=y/8
        this.root3=Math.sqrt(3);
        this.colorlist=[];

        for(let l=0; l<this.sides; l++)
            this.colorlist[l]=Colors();
        
    }
    draw(ctx,moveX){
        
        const angle=PI2/this.sides;
        const angle2=PI2/4;
        
        ctx.save();
        ctx.translate(this.x,this.y);
        this.rotate+=moveX*0.001;
        this.rotate2-=moveX*0.001;
        ctx.rotate(this.rotate);
        ctx.beginPath();
        for(let i=0; i<this.sides; i++){
            const x= this.radias*Math.cos(angle*i);
            const y= this.radias*Math.sin(angle*i);

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate(this.rotate2)
            ctx.fillStyle=this.colorlist[i];
            ctx.beginPath();
            for(let j=0; j<4; j++){
                const x2= this.radias2*Math.cos(angle2*j);
                const y2= this.radias2*Math.sin(angle2*j); 

                switch(j){

                    case 0:
                        ctx.moveTo(y2-this.radias2/2*this.root3,x2-this.radias2/2); //
                        break;
                    case 1:
                        ctx.lineTo(x2,y2);
                        break;
                    case 2:
                        ctx.lineTo(y2+this.radias2/2*this.root3,x2+this.radias2/2); //
                        break;
                    case 3:
                        ctx.lineTo(x2,y2);
                        break;
                    default:
                        console.log(' ');
                }
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.closePath();
        ctx.restore();
        
    }
}
function Colors(){
    const colorlist=[1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
    let colors='#';

    for(let i=0; i<6; i++){
        colors+=colorlist[Math.ceil(Math.random()*14)];
    }
    return colors;
}