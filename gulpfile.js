//导入工具包 require('node_modules里对应模块')
const gulp = require('gulp'), //本地安装gulp所用到的地方
    concat = require('gulp-concat'),//合并文件 --合并只是放一起--压缩才会真正合并相同样式
    sass = require("gulp-sass"),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    autoprefixer = require("gulp-autoprefixer"),
    webserver = require('gulp-webserver'),
    runSequence = require('run-sequence'),
    through = require('through2'),
    rollup = require('rollup'),
    resolve = require('rollup-plugin-node-resolve'),
    commonjs = require('rollup-plugin-commonjs'),
    babel = require('rollup-plugin-babel'),
    Gbabel = require('gulp-babel'),
    uglify = require('rollup-plugin-uglify'),
    serveIndex = require('serve-index'),
    watch = require('gulp-watch'),
    eslint = require('gulp-eslint'),
    config = require('./sock.config');

let _Mod = config.Mod

/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 上午9:18
* @Description:文件合并成首页的路径集合
*/
const CCT = config.CCT

/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 上午9:19
* @Description:其他路径集合
*/
const CGI = config.CGI


/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 上午9:19
* @Description:文件输出路径集合
*/
const DEST = config.DEST
/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 下午3:03
* @Description:观察路径
*/
const WATCH = config.WATCH
/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 上午9:19
* @Description:组合首页的方法,可进行二次配置
*/
gulp.task('rebuildIndex', function() {
    let p = [];
    let _p = [
        CCT.doctype,
        CCT.meta,
        CCT.dns,
        CCT.meta,
        CCT.others,
        CCT.meta,
        CCT.styles,
        CCT.meta,
        CCT.links,
        CCT.meta
    ]
    if(_Mod === 'development'){
        _p = [..._p,CCT.js,CCT.script,CCT.h1]
    }else{
        _p = [..._p,CCT.script,CCT.h1]
    }


    let _S = [],
        _F = [],
        _l = []
    if(_Mod === 'development'){
        _l = [..._l,CCT.js,CCT.h2]
    }else{
        _p = [..._l,CCT.h2]
    }



    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/22 8:21 PM
    * @Description:首屏的Url循环显示方式,默认是首屏为4种结构
    */
    for(let i = 1;i <= 4; i++ ){
        _S.push(CCT['S'+i])
    }
    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@aliyun.com
    * @Date: Created in 2018/10/22 8:22 PM
    * @Description:楼层显示方式,默认最多9个楼层,包含footer也属于楼层
    */
    for(let i = 1; i<= 9; i++){
        _F.push(CCT.Floor+i+'.b.html')
        _F.push(CCT.Floor+i+'.html')
    }

    p = p.concat(_p,_S,_F,_l);

    return gulp.src(p)
        .pipe(concat("index.html"))
        .pipe(gulp.dest(DEST.index))
})


/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/14 下午10:17
* @Description:首页嵌入式样式的生成方法
*/
gulp.task('indexStyle', function () {
    return gulp.src([CGI.indexStyle]) //该任务针对的文件
        .pipe(sass()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],//last 5 versions-
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(DEST.indexCss)) //将会在src/css下生成index.css
        .pipe(minifyCss())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(DEST.indexCss))
});

/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/14 下午10:18
* @Description:首页嵌入式javascript的生成方法
*/
gulp.task('indexJavascript',function(){
    return  gulp.src(CGI.indexJavascript)
        .pipe(concat("index.js"))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(Gbabel())
        .pipe(gulp.dest(DEST.indexJs))
        .pipe(minifyJs())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(DEST.indexJs))
})
/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 下午2:10
* @Description:生成页面嵌入式样式文件
*/
gulp.task('rebuildCss' ,function(){
    return gulp.src(CGI.indexCss)
        .pipe(through.obj(function(file, encode, cb) {
            var result = file.contents.toString()
            var _str = '<!--some styles should be here-->\n'
            _str += '<style type="text/css">\n'
            _str += result
            _str += '\n</style>'
            file.contents = Buffer.from(_str)
            this.push(file)
            cb()
        }))
        .pipe(rename(function(path){
            path.basename = "styles"
            path.extname = '.html'
        }))
        .pipe(gulp.dest(DEST.cssPage))
})

/**chu
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 下午4:37
* @Description:生成页面嵌入式脚本(必须预先加载的脚本)
*/
gulp.task('rebuildJs' ,function(){
    return gulp.src(CGI.indexJs)
        .pipe(through.obj(function(file, encode, cb) {
            var result = file.contents.toString()
            var _str = '<!--some scripts config should be here-->\n'
            _str += '<script type="text/javascript">\n'
            _str += result
            _str += '\n</script>'
            file.contents = Buffer.from(_str)
            this.push(file)
            cb()
        }))
        .pipe(rename(function(path){
            path.basename = "script"
            path.extname = '.html'
        }))
        .pipe(gulp.dest(DEST.jsPage))
})

/**
 * @Author: zhangjinglin
 * @Email: zhangjinglin@aliyun.com
 * @Date: Created in 2018/10/16 下午3:00
 * @Description:合成外部引用文件
 */
gulp.task('concatJs' ,function(){
    let _art = Object.assign([],CGI.concatJs)
    if(_Mod === 'development'){
        _art = [..._art,...CGI.concatDevJs]
    }
    return gulp.src(_art)
        .pipe(concat("combine.js"))
        .pipe(minifyJs())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(DEST.combineJs))
})


/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 下午2:47
* @Description:自动启动服务,默认端口:9876
*/
gulp.task('webserver', function() {
    return gulp.src('./')
        .pipe(webserver(config.server));
});


/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 下午4:44
* @Description:顺序执行任务
* @params <String> paramName
* @paramsDescription  paramName :
*/
gulp.task('_cssQueen',function(cb){
    runSequence(
        'indexStyle',
        'rebuildCss',
        cb
    )
})
gulp.task('_jsQueen',function(cb){
    runSequence(
        'indexJavascript',
        'rebuildJs',
        cb
    )
})

/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 下午8:44
* @Description:rollup打包整合
*/
gulp.task("rollup" ,async function(){
    const dev = await rollup.rollup({
        input: 'src/index.js',
        plugins:[
            resolve(),
            uglify(),
            babel(),
            commonjs({
                extensions: [ '.js', '.coffee' ]
            })
        ]
    })

    await dev.write({
        file : 'src/lib/Sock/Sk.min.js',
        format : 'iife',
        name : 'Sock'
    })
    await runSequence(
        'concatJs'
    )
})


/**
* @Author: zhangjinglin
* @Email: zhangjinglin@aliyun.com
* @Date: Created in 2018/10/15 下午2:57
* @Description:观察模式
*/
gulp.task("watcher" ,function (){
    var rebuildIndex = gulp.watch(WATCH.indexPages , ['rebuildIndex']),
        buildSass = gulp.watch(WATCH.sass , ['_cssQueen']),
        buildJs = gulp.watch(WATCH.js , ['_jsQueen']),
        // sockJs = gulp.watch(WATCH.sock , ['rollup']),
        concatJs = gulp.watch(WATCH.concatJs , ['concatJs'])
        //cssPage = gulp.watch(WATCH.cssPage , ['rebuildCss']),
        //jsPage = gulp.watch(WATCH.js , ['rebuildJs']),


    //观察组合首页的所有HTML页面片段的变化事件
    rebuildIndex.on('change', function(){
        console.log('Watcher is rebuilding index.html now...')
    })
    //观察首页嵌入式样式(必须预先加载的样式)的变化事件
    buildSass.on('change', function(){
        console.log('Watcher is build index style...')
    })
    //观察首页必须加载的脚本变化事件
    buildJs.on('change', function(){
        console.log('Watcher is build index javascript...')
    })
    //sock文件发生变化
    // sockJs.on('change', function(){
    //     console.log('Watcher is concat sock.js...')
    // })
    //外部合并的js文件变化
    concatJs.on('change', function(){
        console.log('Watcher is concat combine.min.js... ')
    })

})

let init = (cb) => {
    runSequence(
        'watcher',
        'webserver',
        cb
    )
}


gulp.task('default',function(cb){
    init(cb)
})

