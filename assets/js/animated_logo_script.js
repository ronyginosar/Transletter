function changevrot(){
    window.count += 1;
    if(window.count < 66){
        window.vrotScroll += 10;
    }else{
        if(window.count > 131){
            window.vrotScroll = 50;
            window.count = 0;
        }else{
            window.vrotScroll -= 10;
        }
    }
    document.querySelector(':root').style.setProperty('--vrot', window.vrotScroll);
}
window.vrotScroll = 50;
window.count = 0;