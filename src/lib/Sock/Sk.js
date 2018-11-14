var Sock = (function () {
    'use strict';

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/7 下午9:57
    * @Description:浏览器特性检测
    * @params <String> paramName
    * @paramsDescription  paramName :
    */
    var _browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                isSupportTouch: "ontouchend" in document ? true : false, //是否支持touch
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/7 下午3:23
    * @Description:cookie的获取与设置,使用同一个方法即可
    * @params <String> paramName
    * @paramsDescription  paramName :
    */
    var _cookie = function _cookie(key, value, time) {
        if (typeof value == "undefined" && typeof key != "undefined" && typeof value != "boolean") {
            var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
            // console.log(document.cookie);
            if (arr != null) return unescape(arr[2]);return null;
        } else if (typeof key == "string" && typeof value == "string") {
            //默认30天
            if (typeof time == "undefined" || typeof time != "number") time = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000);
            document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
        } else if (typeof value == "boolean") {
            if (value === true) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
                if (arr[2] != null) document.cookie = key + "=" + arr[2] + ";expires=" + exp.toGMTString() + ";path=/";
            }
        }
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/7 下午2:58
    * @Description:对象校验器
    */
    var $ = {};

    //
    //  var reg_html = /^\s*<(\w+|!)[^>]*>/,
    //      reg_selector = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/;
    //
    //
    var ObjProto = Object.prototype; // FuncProto = Function.prototype;
    //
    var 
    // concat           = ArrayProto.concat,
    toString = ObjProto.toString;
    // nativeBind         = FuncProto.bind,
    // nativeCreate       = Object.create;
    //
    // [root, dir, basename, ext]


    $.isArray = function (obj) {
        return toString.call(obj) === "[object Array]";
    };

    $.isObject = function (obj) {
        return toString.call(obj) === "[object Object]";
    };

    $.isPlainObject = function (obj) {
        //确保不是dom节点与window对象
        if (!obj || !$.isObject(obj) || obj.nodeType || obj.window == obj) {
            return false;
        }
        //hasOwnProperty(不检测原型链),isPrototypeOf(对象原型中是否存在对象),constructor(创建此对象的数组函数的引用),instanceof(测试对象是否为标杆对象的实例)
        try {
            if (!ObjProto.hasOwnProperty.call(obj, "constructor") && !ObjProto.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }
        //
        for (var key in obj) {}
        return key === undefined || ObjProto.hasOwnProperty.call(obj, key);
    };

    $.isFunction = function (obj) {
        return toString.call(obj) === "[object Function]";
    };

    $.isString = function (obj) {
        return typeof obj === "string";
    };

    $.isRegExp = function (obj) {
        return toString.call(obj) === "[object RegExp]";
    };

    $.isNumber = function (obj) {
        return toString.call(obj) === "[object Number]";
    };

    $.isNull = function (obj) {
        if (null === obj) {
            return true;
        }
    };
    $.isBoolean = function (obj) {
        return toString.call(obj) === "[object Boolean]";
    };

    $.isDate = function (obj) {
        return toString.call(obj) === "[object Date]";
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/7 下午3:10
    * @Description:遍历对象,并将结果传入到指定的对象体callback内,callback(key,value)
    * @params <String> paramName
    * @paramsDescription  paramName :
    */
    var _each = function _each(obj, callback) {
        obj = obj || [];
        if ($.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                callback.call(this, i, obj[i]);
            }
            return;
        }
        var length = obj.length || 0;

        if (length > 0) {
            for (var i = 0; i < obj.length; i++) {
                callback.call(this, i, obj[i]);
            }
            return;
        }
        //
        for (var o in obj) {
            if (obj.hasOwnProperty(o)) {
                callback.call(this, o, obj[o]);
            }
        }
    };

    var _extend = function _extend() {
        var args = arguments;
        var deeps = false;
        var parent = args[0] || {},
            child = args[1] || {},
            i = 0,
            l = args.length;
        if ($.isBoolean(args[0])) {
            deeps = args[0];
            parent = args[1];
            child = args[2] || {};
            i = 3;
        } else {
            i = 2;
        }
        //
        //
        _each(child, function (i, n) {
            var copy = n;
            if (parent == copy) return;
            if (copy && $.isObject(copy) && deeps) {
                parent[i] = _extend(parent[i] || {}, copy);
            } else if (copy && $.isArray(copy) && deeps) {
                parent[i] = _extend(parent[i] || [], copy);
            } else {
                parent[i] = copy;
            }
        });
        //
        if (l > i) {
            for (var m = i; m < l; m++) {
                parent = _extend(deeps, parent, args[m]);
            }
        }
        //
        return parent;
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/7 下午10:17
    * @Description:格式化时间类型
    * @params <String> paramName
    * @paramsDescription  paramName :
    */
    var _format = function _format(fmt, time) {
        var date = new Date(time);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    };

    var _later = function _later(fn, time, which) {
        time = time || 0;
        var r = which ? setInterval(fn, time) : setTimeout(fn, time);
        return {
            id: r,
            interval: which,
            cancel: function cancel() {
                if (this.interval) {
                    clearInterval(this.id);
                } else {
                    clearTimeout(this.id);
                }
            }
        };
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/7 下午10:38
    * @Description:字符分割
    * @params <String> paramName 
    * @paramsDescription  paramName :
    */
    var _splitNumber = function _splitNumber(number, split, qt) {
        var split = split || 3,
            number = number + "",
            qt = qt || ",";
        number = number.split("");
        number = number.reverse();
        var ret = [];
        _each(number, function (i, n) {
            if (i != 0 && i % split == 0) {
                ret.push(qt);
                ret.push(n);
            } else {
                ret.push(n);
            }
        });
        ret = ret.reverse();
        ret = ret.join("");
        return ret;
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/7 下午11:03
    * @Description:Url格式化
    * @params <String> paramName
    * @paramsDescription  paramName :
    */
    var _transUrl = function _transUrl(search) {
        search = search ? search : window.location.search;

        var ser = search.replace("?", ""),
            o = ser.split("&"),
            p,
            rets = {};
        _each(o, function (i, n) {
            p = n.split("=");
            rets[p[0]] = p[1];
        });

        return rets;
    };

    var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g;

    var _trim = function _trim(obj) {

        return obj == null ? "" : (obj + "").replace(RE_TRIM, "");
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/8 下午2:06
    * @Description:对象全部输出
    */

    //
    var tools = {
        browser: _browser,
        cookie: _cookie,
        each: _each,
        extend: _extend,
        format: _format,
        later: _later,
        splitNumber: _splitNumber,
        transUrl: _transUrl,
        trim: _trim,
        isObject: $
    };

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/8 下午1:13
    * @Description:公共工具类,requestAnimationFrame
    * @params <String> paramName
    * @paramsDescription  paramName :
    */
    (function () {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    })();

    var core = {
        init: function init() {},
        version: "1.10.0",
        events: {},
        eventsFn: {},
        ajax: {}
    };

    //定制化常用工具类

    window.Sk = {
        tools: tools,
        core: core
    };

    var index = window.Sk;

    return index;
}());
