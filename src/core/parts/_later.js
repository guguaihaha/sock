var _later = function(fn,time,which){
    time = time || 0;
    var r = (which) ? setInterval(fn, time) : setTimeout(fn, time);
    return {
        id:r,
        interval:which,
        cancel:function(){
            if(this.interval){
                clearInterval(this.id);
            }else{
                clearTimeout(this.id);
            }
        }
    }
}

export default _later