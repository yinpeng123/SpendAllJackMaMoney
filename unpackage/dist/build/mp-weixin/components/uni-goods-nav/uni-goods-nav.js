(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-goods-nav/uni-goods-nav"],{"0668":function(t,n,o){"use strict";o.r(n);var e=o("e29b"),u=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(n,t,function(){return e[t]})}(i);n["default"]=u.a},2837:function(t,n,o){},"7b86":function(t,n,o){"use strict";o.r(n);var e=o("8298"),u=o("0668");for(var i in u)"default"!==i&&function(t){o.d(n,t,function(){return u[t]})}(i);o("87f5");var c=o("2877"),r=Object(c["a"])(u["default"],e["a"],e["b"],!1,null,"6da74e2a",null);n["default"]=r.exports},8298:function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},u=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return u})},"87f5":function(t,n,o){"use strict";var e=o("2837"),u=o.n(e);u.a},e29b:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"UniGoodsNav",props:{options:{type:Array,default:function(){return[{icon:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png",text:"店铺"},{icon:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png",text:"购物车"}]}},buttonGroup:{type:Array,default:function(){return[{text:"加入购物车",backgroundColor:"#ff0000",color:"#fff"},{text:"立即购买",backgroundColor:"#ffa200",color:"#fff"}]}},fill:{type:Boolean,default:!1}},methods:{onClick:function(t,n){this.$emit("click",{index:t,content:n})},buttonClick:function(n,o){t.report&&t.report(o.text,o.text),this.$emit("buttonClick",{index:n,content:o})}}};n.default=o}).call(this,o("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-goods-nav/uni-goods-nav-create-component',
    {
        'components/uni-goods-nav/uni-goods-nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7b86"))
        })
    },
    [['components/uni-goods-nav/uni-goods-nav-create-component']]
]);                
