
let selectorConfig = {
    selector:".lazy-mod",
    beforeClassName:'lazy-mod',
    choiceClassName:'lazy-loaded',
    attr:"data-src"
}

/**
* @Author: zhangjinglin
* @Email: zhangjinglin5@jd.com
* @Date: Created in 2019/9/6 2:39 PM
* @Description:用于构建模块和图片懒加载行为，支持模块或者图像
* @params <function> cb
* @paramsDescription  paramName :
*/

class lazyLoadImg {
    constructor(cb){
        this.timer = ""
        this.selector = selectorConfig.selector
        this.beforeClassName = selectorConfig.beforeClassName
        this.choiceClassName = selectorConfig.choiceClassName
        this.attr = selectorConfig.attr
        this.lazyMark = selectorConfig.lazyMark
        this.callback = cb || function () {}
        this.update()
        this.reloadEvent()

    }

    init(){
        let _this = this
        $(_this.selector).each(function () {
            if(_this.isLazy(this)){
                _this.loadImg($(this))
                $(this).removeClass(_this.beforeClassName).addClass(_this.choiceClassName)
            }
        })
    }
    isLazy(Node){
        let _this = this
        let w = $(window),
            _wh = w.height(),
            _wt = w.scrollTop(),
            _wb = _wh + _wt
        let node = $(Node),
            _nodeSet = node.offset(),
            _nh = node.height,
            _nt = _nodeSet.top,
            _nb = _nt + _nh

        if(node.length  && (_nt <= _wb && _nt >= _wt || _nb >= _wt && _nb <= _wb)){
            return true
        }else{
            return false
        }
    }
    loadImg(node){
        let _src = node.attr(this.attr)
        if(_src){
            node.attr('src',_src).removeAttr(this.attr)
        }
        this.callback(node[0])


    }


    reloadEvent(){
        var _this = this;
        $(window).unbind("scroll").bind("scroll",function(){
            _this.update()
        })
    }

    update(){
        this.init()
    }


}

class esLazyLoadImg{
    constructor(cb){
        this.callback = this.callback.bind(this)
        this.io = new IntersectionObserver(this.callback,{
            rootMargin:"0px 0px 0px 0px"
        });
        this.cb = cb || function () {}
        this.update()
    }

    init(){
        let _this = this;


        $.each($(selectorConfig.selector),function (i,item) {
            _this.io.observe(item)
        })


    }

    callback(entries){
        let _this = this;
        $.each(entries,function (i,item) {
            if(item.isIntersecting){
                 item.target.src = item.target.dataset.src
                _this.io.unobserve(item.target)
                 item.target.removeAttribute(selectorConfig.attr)
                 $(item.target).removeClass(selectorConfig.beforeClassName).addClass(selectorConfig.choiceClassName)
                _this.cb(item.target)
            }
        })

    }
    update(){
        this.init()
    }
}

class lazyload{
    constructor(cb){
        this.Mod = 'IntersectionObserver' in window ? true : false
        this.io = {}
        this.cb = cb || function () {}
        this.init(cb)
    }

    init(){
        let _this = this
        if(_this.Mod){
            _this.io = new esLazyLoadImg(function (item) {
                    console.log('new=')
                    console.log(item)
                    _this.cb()

                })
        }else{
            _this.io = new lazyLoadImg(function (item) {
                console.log('old=')
                console.log(item)
                _this.cb()
            })
            }
    }
    update(){
        this.io.update()
    }


}


$(function(){

    let lazy = new lazyload()

    setTimeout(function () {
        $("body").append("<img width='200' height='150' class='lazy-mod' data-src='https://www.zhangjinglin.cn/bokeStatic/css/img/zjl.png' />")
        lazy.update()
    },3000)

})

