"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var selectorConfig = {
  selector: ".lazy-mod",
  beforeClassName: 'lazy-mod',
  choiceClassName: 'lazy-loaded',
  attr: "data-src"
  /**
  * @Author: zhangjinglin
  * @Email: zhangjinglin5@jd.com
  * @Date: Created in 2019/9/6 2:39 PM
  * @Description:用于构建模块和图片懒加载行为，支持模块或者图像
  * @params <function> cb
  * @paramsDescription  paramName :
  */

};

var lazyLoadImg =
/*#__PURE__*/
function () {
  function lazyLoadImg(cb) {
    _classCallCheck(this, lazyLoadImg);

    this.timer = "";
    this.selector = selectorConfig.selector;
    this.beforeClassName = selectorConfig.beforeClassName;
    this.choiceClassName = selectorConfig.choiceClassName;
    this.attr = selectorConfig.attr;
    this.lazyMark = selectorConfig.lazyMark;

    this.callback = cb || function () {};

    this.update();
    this.reloadEvent();
  }

  _createClass(lazyLoadImg, [{
    key: "init",
    value: function init() {
      var _this = this;

      $(_this.selector).each(function () {
        if (_this.isLazy(this)) {
          _this.loadImg($(this));

          $(this).removeClass(_this.beforeClassName).addClass(_this.choiceClassName);
        }
      });
    }
  }, {
    key: "isLazy",
    value: function isLazy(Node) {
      var _this = this;

      var w = $(window),
          _wh = w.height(),
          _wt = w.scrollTop(),
          _wb = _wh + _wt;

      var node = $(Node),
          _nodeSet = node.offset(),
          _nh = node.height,
          _nt = _nodeSet.top,
          _nb = _nt + _nh;

      if (node.length && (_nt <= _wb && _nt >= _wt || _nb >= _wt && _nb <= _wb)) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "loadImg",
    value: function loadImg(node) {
      var _src = node.attr(this.attr);

      if (_src) {
        node.attr('src', _src).removeAttr(this.attr);
      }

      this.callback(node[0]);
    }
  }, {
    key: "reloadEvent",
    value: function reloadEvent() {
      var _this = this;

      $(window).unbind("scroll").bind("scroll", function () {
        _this.update();
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.init();
    }
  }]);

  return lazyLoadImg;
}();

var esLazyLoadImg =
/*#__PURE__*/
function () {
  function esLazyLoadImg(cb) {
    _classCallCheck(this, esLazyLoadImg);

    this.callback = this.callback.bind(this);
    this.io = new IntersectionObserver(this.callback, {
      rootMargin: "0px 0px 0px 0px"
    });

    this.cb = cb || function () {};

    this.update();
  }

  _createClass(esLazyLoadImg, [{
    key: "init",
    value: function init() {
      var _this = this;

      $.each($(selectorConfig.selector), function (i, item) {
        _this.io.observe(item);
      });
    }
  }, {
    key: "callback",
    value: function callback(entries) {
      var _this = this;

      $.each(entries, function (i, item) {
        if (item.isIntersecting) {
          item.target.src = item.target.dataset.src;

          _this.io.unobserve(item.target);

          item.target.removeAttribute(selectorConfig.attr);
          $(item.target).removeClass(selectorConfig.beforeClassName).addClass(selectorConfig.choiceClassName);

          _this.cb(item.target);
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.init();
    }
  }]);

  return esLazyLoadImg;
}();

var lazyload =
/*#__PURE__*/
function () {
  function lazyload(cb) {
    _classCallCheck(this, lazyload);

    this.Mod = 'IntersectionObserver' in window ? true : false;
    this.io = {};

    this.cb = cb || function () {};

    this.init(cb);
  }

  _createClass(lazyload, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (_this.Mod) {
        _this.io = new esLazyLoadImg(function (item) {
          console.log('new=');
          console.log(item);

          _this.cb();
        });
      } else {
        _this.io = new lazyLoadImg(function (item) {
          console.log('old=');
          console.log(item);

          _this.cb();
        });
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.io.update();
    }
  }]);

  return lazyload;
}();

$(function () {
  var lazy = new lazyload();
  setTimeout(function () {
    $("body").append("<img width='200' height='150' class='lazy-mod' data-src='https://www.zhangjinglin.cn/bokeStatic/css/img/zjl.png' />");
    lazy.update();
  }, 3000);
});
var host = {
  index: 'http://www.job.com'
};
var Router = {
  getCat: {
    host: host.index,
    path: '/getMine',
    type: 'get',
    response: {
      status: 200,
      data: [1, 2, 3]
    }
  }
};

for (var item in Router) {
  Mock.mock(Router[item].host + Router[item].path, Router[item].type, function (options) {
    return Router[item].response;
  });
}

$.ajax({
  url: "http://www.job.com/getMine",
  type: "get",
  success: function success(data) {// console.log(data)
  },
  error: function error(e) {
    console.log(e);
  }
});