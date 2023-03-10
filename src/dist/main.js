"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var pinia_1 = require("pinia");
var element_plus_1 = require("element-plus");
var ElementPlusIconsVue = require("@element-plus/icons-vue");
var zh_cn_1 = require("element-plus/es/locale/lang/zh-cn");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var permiss_1 = require("./store/permiss");
require("element-plus/dist/index.css");
require("./assets/css/icon.css");
var vue_amap_1 = require("@vuemap/vue-amap");
require("@vuemap/vue-amap/dist/style.css");
var echarts = require("echarts");
vue_amap_1.initAMapApiLoader({
    key: 'eb90afad898eb2979030bf6b4abac7fa',
    plugins: ['AMap.Scale'],
    securityJsCode: 'ceab304a1720a44ff1c6ec770ab81e66',
    Loca: {
        version: '2.0.0'
    } // 如果需要使用loca组件库，需要加载Loca
});
var app = vue_1.createApp(App_vue_1["default"]);
app.config.globalProperties.$echarts = echarts;
app.use(vue_amap_1["default"]);
app.use(pinia_1.createPinia());
app.use(router_1["default"]);
app.use(element_plus_1["default"], {
    locale: zh_cn_1["default"]
});
// 注册elementplus图标
for (var _i = 0, _a = Object.entries(ElementPlusIconsVue); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], component = _b[1];
    app.component(key, component);
}
// 自定义权限指令
var permiss = permiss_1.usePermissStore();
app.directive('permiss', {
    mounted: function (el, binding) {
        if (!permiss.key.includes(String(binding.value))) {
            el['hidden'] = true;
        }
    }
});
app.mount('#app');
