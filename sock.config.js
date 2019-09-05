module.exports = {
    Mod:'development',//product or development
    server:{
        livereload: true,
        directoryListing:true,
        port:9876,
        open: "./index.html"
    },
    CCT:{
        doctype : 'src/pages/doctype.html',
        meta : 'src/pages/meta.html',
        dns : 'src/pages/dns.html',
        others : 'src/pages/others.html',
        styles : 'src/pages/styles.html',
        links : 'src/pages/links.html',
        script : 'src/pages/script.html',
        h1 : 'src/pages/_h_b.html',
        S1: 'src/pages/body/firstScreen/ad.html',
        S2: 'src/pages/body/firstScreen/userInfo.html',
        S3: 'src/pages/body/firstScreen/search.html',
        S4: 'src/pages/body/firstScreen/pictures.html',
        Floor: 'src/pages/body/floor/',
        js : 'src/pages/js.html',
        h2 : 'src/pages/_b_h.html'
    },
    CGI:{
        //开发类样式路径
        indexStyle : 'src/sass/index.scss',
        //开发类脚本路径
        indexJavascript : 'src/javascript/*.js',
        //读取合并样式文件
        indexCss : 'src/pages/styles/index.min.css',
        //读取合并脚本文件
        indexJs : 'src/pages/js/index.min.js',
        //合并所有外部js文件,必须手动配置每一个文件，文件夹形式体积过大，并且确保jquery放在最前面
        concatJs: ['src/lib/jQuery/index.min.js','src/lib/lazyLoad/index.js'],
        concatDevJs:['src/lib/Mock/index.js']
    },
    DEST:{
        index : '',
        //开发类样式生成路径
        indexCss : 'src/pages/styles',
        //开发类脚本生成路径
        indexJs: 'src/pages/js',
        //开发类样式生成页面路径
        cssPage: 'src/pages',
        //开发类脚本生成页面路径
        jsPage: 'src/pages',
        //外部合并输出路径
        combineJs: 'dist'
    },
    WATCH:{
        indexPages : 'src/pages/**/*.html',
        sass : 'src/sass/*.scss',
        js : 'src/javascript/**/*.js',
        cssPage : 'src/pages/styles/index.min.css',
        jsPage : 'src/page/js/index.min.js',
        sock : 'src/core/**/*.js',
        concatJs : 'src/lib/**/*.js'
    }


}