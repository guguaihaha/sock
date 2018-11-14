/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/7 下午2:58
* @Description:对象校验器
*/
var $ = {}

//
//  var reg_html = /^\s*<(\w+|!)[^>]*>/,
//      reg_selector = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/;
//
//
var ArrayProto = Array.prototype, ObjProto = Object.prototype;// FuncProto = Function.prototype;
//
var
// push             = ArrayProto.push,
    slice            = ArrayProto.slice,
// concat           = ArrayProto.concat,
    toString         = ObjProto.toString;
// hasOwnProperty   = ObjProto.hasOwnProperty;
//
var
// nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys;
// nativeBind         = FuncProto.bind,
// nativeCreate       = Object.create;
//
// [root, dir, basename, ext]




$.isArray = function(obj){
    return toString.call(obj) === "[object Array]";
}

$.isObject = function(obj){
    return toString.call(obj) === "[object Object]";
}

$.isPlainObject = function(obj){
    //确保不是dom节点与window对象
    if(!obj || !$.isObject(obj) || obj.nodeType || obj.window ==obj){
        return false;
    }
    //hasOwnProperty(不检测原型链),isPrototypeOf(对象原型中是否存在对象),constructor(创建此对象的数组函数的引用),instanceof(测试对象是否为标杆对象的实例)
    try{
        if(!ObjProto.hasOwnProperty.call(obj,"constructor") && !ObjProto.hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf")){
            return false;
        }
    } catch(e){
        return false;
    }
    //
    for(var key in obj){}
    return ((key===undefined) || ObjProto.hasOwnProperty.call(obj,key));
}

$.isFunction = function(obj){
    return toString.call(obj) === "[object Function]";
}

$.isString = function(obj){
    return typeof obj === "string";
}

$.isRegExp = function(obj){
    return toString.call(obj) === "[object RegExp]";
}

$.isNumber = function(obj){
    return toString.call(obj) === "[object Number]";
}

$.isNull = function(obj){
    if(null === obj){
        return true;
    }
}
$.isBoolean = function(obj){
    return toString.call(obj) === "[object Boolean]";
}

$.isDate = function(obj){
    return toString.call(obj) === "[object Date]";
}

export default $