import {Point} from "./point.js";

export class Slide{
    constructor(stageWidth,stageHeight,point_count){
        this.stageWidth=stageWidth;
        this.stageHeight=stageHeight;
        this.point_count=point_count;
        this.pointGap=this.stageWidth/(5-1);
        this.window=window;
        this.points=[];
        this.left_on=true;

        this.left_check=[];
        this.right_check=[];
        this.left_gap_check=[];
        this.right_gap_check=[];
        this.move_permission=[]; //이녀석이 true가 되야 움직임 가능

        for(let i=0; i<point_count; i++){
            this.left_check[i]=false;
            this.right_check[i]=false;
            this.left_gap_check[i]=false;
            this.right_gap_check[i]=false;
            this.move_permission[i]=false;
        }
        this.move_permission[point_count-1]=true;
    }


    resize(){
        this.centerX=this.stageWidth/2;
        this.centerY=this.stageHeight/2;
        this.pointGap=this.stageWidth/(4);

        this.init();
    }
    init(){
        for(let i=0; i<this.point_count; i++){
            this.points[i]=new Point(
                0,
                this.centerY,
                this.stageWidth,
                this.stageHeight,
                i
            );
        }
    }


    draw(ctx,moveX){
        this.condition_check();
        for(let i=0; i<this.point_count; i++){
            this.points[i].draw(ctx,moveX,this.move_permission[i]);
        }
    }
    condition_check(){
        const left_gap=this.pointGap;
        const right_gap=this.stageWidth-this.pointGap;

        if(this.left_check[this.point_count-1]==true){
            this.left_on=true;
        }
        else if(this.right_check[0]){
            this.left_on=false;
        }

        // console.log(this.left_on);
        for(let i=0; i<this.point_count; i++){
            if(this.points[i].x<=0){
                this.left_check[i]=true;
            }
            else if(this.points[i].x>=this.stageWidth){
                this.right_check[i]=true;
            }//양 끝에 닿았는지를 확인하는 체크변수
            else{
                this.left_check[i]=false;
                this.right_check[i]=false;
            }//끝점이 아니라면 false반환    
        }
        if(this.left_on===true){
            for(let i=(this.point_count-1); i>0; i--){
                if(this.points[i].x>left_gap&&this.left_check[i-1]==true){
                    this.move_permission[i-1]=true; //시작 조건
                }
                else if(this.points[i-1].x>right_gap && this.right_check[i]==true){
                    if(this.points[i-1].x<right_gap && this.right_check==true)
                        this.move_permission[i]=true;
                    else
                        this.move_permission[i]=false; //끝나기 조건
                }
                
                
                    

                // console.log(this.move_permission[this.point_count-1]);
            }//left condition
        }
        else if(this.left_on===false){
            for(let i=0; i<this.point_count-1; i++){
                if(this.points[i].x<right_gap&&this.right_check[i+1]==true)
                    this.move_permission[i+1]=true;
                if(this.points[i+1].x<left_gap && this.left_check[i]==true)
                    this.move_permission[i]=false;
            }
        } 
    }



}