/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/7 下午11:03
* @Description:Url格式化
* @params <String> paramName
* @paramsDescription  paramName :
*/
import each from './_each'
var _transUrl = function(search){
    search = search ? search : window.location.search

    var ser = search.replace("?",""),
        o = ser.split("&"),
        p,
        rets = {};
    each(o,function(i,n){
        p = n.split("=");
        rets[p[0]] = p[1];
    })

    return rets;
}

export default _transUrl