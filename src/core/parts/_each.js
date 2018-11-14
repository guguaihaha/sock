 import $ from './_isObject'

/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/7 下午3:10
* @Description:遍历对象,并将结果传入到指定的对象体callback内,callback(key,value)
* @params <String> paramName
* @paramsDescription  paramName :
*/
 var _each = function(obj,callback){
     obj = obj || [];
     if($.isArray(obj)){
         for(var i = 0;i < obj.length; i++){
             callback.call(this,i,obj[i]);
         }
         return;
     }
     var length = obj.length || 0;

     if(length > 0){
         for(var i = 0;i < obj.length; i++){
             callback.call(this,i,obj[i]);
         }
         return;
     }
     //
     for(var o in obj){
         if(obj.hasOwnProperty(o)){
             callback.call(this,o,obj[o]);
         }
     }
 }

 export default _each;