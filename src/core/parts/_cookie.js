/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/7 下午3:23
* @Description:cookie的获取与设置,使用同一个方法即可
* @params <String> paramName
* @paramsDescription  paramName :
*/
var _cookie = function(key,value,time){
    if(typeof(value)=="undefined"&&typeof(key)!="undefined"&&typeof(value)!="boolean"){
        var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
        // console.log(document.cookie);
        if(arr != null) return (unescape(arr[2])); return null;
    }else if(typeof(key)=="string"&&typeof(value)=="string"){
        //默认30天
        if(typeof(time)=="undefined"||typeof(time)!="number") time=30;
        var exp = new Date();
        exp.setTime(exp.getTime() + time*24*60*60*1000);
        document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;";
    }else if(typeof(value)=="boolean"){
        if(value===true){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
            if(arr[2]!=null) document.cookie= key + "="+arr[2]+";expires="+exp.toGMTString()+";path=/";
        }
    }
}

export default _cookie