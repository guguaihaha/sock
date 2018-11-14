import $ from './_isObject'
import each from './_each'



var _extend = function(){
    var args = arguments;
    var deeps = false;
    var parent = args[0] || {},
        child = args[1] || {},
        i = 0,
        l = args.length;
    if($.isBoolean(args[0])){
        deeps = args[0];
        parent = args[1];
        child = args[2] || {};
        i = 3;
    }else{
        i = 2;
    }
    //
    //
    each(child,function(i,n){
        var copy = n;
        if(parent == copy)return;
        if(copy && $.isObject(copy) && deeps){
            parent[i] = _extend(parent[i] || {},copy);
        }else if(copy && $.isArray(copy) && deeps){
            parent[i] = _extend(parent[i] || [],copy);
        }else{
            parent[i] = copy;
        }
    })
    //
    if(l > i){
        for(var m = i; m < l; m++){
            parent = _extend(deeps,parent,args[m]);
        }
    }
    //
    return parent;
}

export default _extend