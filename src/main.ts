import {createApp} from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import { usePermissStore } from './store/permiss'
import 'element-plus/dist/index.css'
import './assets/css/icon.css'
import VueAMap, { initAMapApiLoader} from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'
import * as echarts from 'echarts'

initAMapApiLoader({  //TODO：报错没解决...希望没事
    key: 'eb90afad898eb2979030bf6b4abac7fa',
    plugins:['AMap.Scale'],
    securityJsCode: 'ceab304a1720a44ff1c6ec770ab81e66', // 新版key需要配合安全密钥使用
    Loca:{
      version: '2.0.0'
    } // 如果需要使用loca组件库，需要加载Loca
  })

const app = createApp(App)
app.config.globalProperties.$echarts = echarts

app.use(VueAMap)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})


// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 自定义权限指令
const permiss = usePermissStore()
app.directive('permiss', {
    mounted(el, binding) {
        if(!permiss.key.includes(String(binding.value))){
            el['hidden'] = true;
        }
    }
})

app.mount('#app')