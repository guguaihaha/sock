// $(function(){
//     var io = new IntersectionObserver(callback,{
//         rootMargin:"0px 0px 0px 0px"
//     });
//     var imgs = document.querySelectorAll('[data-src]');
//     function callback(entries){
//         entries.forEach((item) => {
//             if(item.isIntersecting){
//                 item.target.src = item.target.dataset.src
//                 io.unobserve(item.target)
//                 item.removeAttribute('data-src')
//             }
//
//         })
//     }
//     imgs.forEach((item)=>{
//         io.observe(item)
//     })
//
//
// })

class lazyLoadImg {
    constructor(cb){
        this.timer = ""
        this.selector = '.lazy-mod'
        this.attr = 'data-src'
        this.callback = cb
    }
    
    init(){
        let _this = this
        $(_this.selector).each(function () {
            if(_this.isLazy(this)){
                _this.loadImg(this)
            }
        })
    }
    isLazy(Node){
        let _this = this
        let $w = $(window),
            _wh = $w.height(),
            _wt = $w.scrollTop(),
            _wb = _wh + _wt
        let $node = $(Node),
            _nodeSet = $node.offset(),
            _nh = $node.height
            _nt = _nodeSet.top,
            _nb = _nt + _nh

        if($node.length && (_nt <= _wb || _nb >= _wt)){
            _this.loadImg($node)
            console.log(Node)
        }
    }
    loadImg($node){
        let _src = $node.attr(this.attr)
        $node.attr('src',_src).removeAttr('src')
        this.callback($node[0])

    }

}

