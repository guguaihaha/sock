/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/7 下午10:38
* @Description:字符分割
* @params <String> paramName 
* @paramsDescription  paramName :
*/
import each from './_each'
var _splitNumber = function(number,split,qt){
    var split = split || 3,
        number = number + "",
        qt = qt || ",";
    number = number.split("");
    number = number.reverse();
    var ret = [];
    each(number,function(i,n){
        if(i != 0 && i % split == 0){
            ret.push(qt);
            ret.push(n);
        }else{
            ret.push(n);
        }
    })
    ret = ret.reverse();
    ret = ret.join("");
    return ret;
}
export default _splitNumber