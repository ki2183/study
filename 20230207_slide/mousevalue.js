export class Mousevalue{
    constructor(mouse_window){
        this.mouse_window=mouse_window;

        this.moveX=0;
        this.clientX=0;
        this.click_check=false;
    }
    mouseValue(){
        this.mouse_window.addEventListener('mousedown',this.mouseDown.bind(this),false);
        this.mouse_window.addEventListener('mousemove',this.mouseMove.bind(this),false);
        this.mouse_window.addEventListener('mouseup',this.mouseUp.bind(this),false);

    }
    mouseDown(e){
        this.click_check=true;
        this.clientX=e.clientX;
        this.moveX=0;
    }
    mouseMove(e){
        if(this.click_check===true){
            this.moveX=e.clientX-this.clientX;
            this.clientX=e.clientX;
        }
    }
    mouseUp(e){
        this.click_check=false;
        // this.moveX=0;
    }
    MOVEX(){
        return this.moveX;
    }
    CLICK_CHECK(){
        return this.click_check;
    }
}