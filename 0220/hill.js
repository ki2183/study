const PI = Math.PI;
export class Hill{
    constructor(stageWidth,stageHeight,index,num,t_height,color){
        this.stageWidth=stageWidth*2;
        this.stageHeight=stageHeight;
        this.num=num;
        this.color=color;
        this.Max_height=20;

        this.index=index;

        this.point_arr=[]
        
        this.Gap=this.stageWidth/(index-1);

        for(let i=0; i<this.index; i++){
            const point=this.index_(i,this.Gap);
            this.point_arr[i]={
                x:point.x,
                y:point.y,
            }
        }
        this.translate={
            x:-this.stageHeight/2,
            y:t_height}
        window.addEventListener('mousemove',this.move.bind(this),false);
    }
    index_(i,gap){
        let hill_height=0;
        let hill_width=0;
        (i%2===0) ? hill_width=i*gap : hill_width=i*gap+this.random_pointX();

        (i%2===0) ? hill_height=this.stageHeight/4*3+this.random_pointY(200)+100 : hill_height=this.stageHeight/5-this.random_pointY(50)-50;

        if(i===0||i===this.index-1){
            hill_height=this.stageHeight/4*3
        }
        
        return {
            x:hill_width,
            y:hill_height,
        }
    }
    draw(ctx){

       ctx.save();
       
       ctx.translate(this.translate.x,this.translate.y);
       ctx.fillStyle=this.color;
       ctx.beginPath();
       let preX=this.point_arr[0].x;
       let preY=this.point_arr[0].y;
       ctx.moveTo(preX,preY);
       for(let i=1; i<this.index; i++){
        const cx= (this.point_arr[i].x+preX)/2;
        const cy= (this.point_arr[i].y+preY)/2;

        ctx.quadraticCurveTo(preX, preY,cx,cy);

        preX=this.point_arr[i].x;
        preY=this.point_arr[i].y;
       }
       ctx.lineTo(this.point_arr[this.index-1].x,this.point_arr[this.index-1].y);
       ctx.lineTo(this.point_arr[this.index-1].x,this.stageHeight);
       ctx.lineTo(this.point_arr[0].x,this.stageHeight);
       ctx.lineTo(this.point_arr[0].x,this.point_arr[0].y);

       ctx.fill();
       ctx.restore();
    }
    random_pointX(){
        return Math.random()*10;
    }
    random_pointY(max){
        return Math.random()*max;
    }   
    move(e){
        if(this.translate.x<=0 && this.translate.x>-this.stageWidth*2){
            gsap.to(this.translate,{
            // x:this.stageHeight-e.offsetX-this.stageHeight,
            x:this.stageHeight-e.offsetX-this.stageHeight,
            duration:this.num,
            delay:0.1,
            ease: 'Power0.easeOut'
        });
            if(this.translate.x>0){
                this.translate.x=0;
            }
        }
    
        
    }

}