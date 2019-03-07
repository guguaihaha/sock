### 快速搭建电商首页

如果想要快速拥有一个合格的电商首页那就来使用吧。基于京东的首页和京东的快速加载策略。

### 快速使用方法

+ clone或者fork后到本地

+ 通过yarn或者npm进行安装

```
$ yarn install

//or

$ npm install
```

+ 安装完毕后直接运行

```javascript
$ npm run sock
```

### 目录简介

src 开发目录
├─ core|开发常用工具包类，包含各种业务组件，最终会在lib目录下生成Sock的业务组件。同时也会合并其他业务组件到dist/combine.min.js
├─ javascript|业务逻辑代码放置区域，最后统一合并压缩并显示在首页index.html中用`<script>代码区域</script>`显示。
├─ lib|第三方公共组件库,最终会合并成dist/combine.min.js，并且在注入到首页index.html底部
├─ sass|整个首页的样式，最终会显示注入到首页，并且以`<style>Css样式</style>`显示
├─ .babelrc|babel转换配置文件
├─ index.js| 临时文件，不可删除 