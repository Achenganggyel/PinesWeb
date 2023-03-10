<template><!--饼图：各阶段的树占比-->
    <div class="chart" ref="chartDom"></div>
</template>

<script lang="ts">
//TODO: 用eachStagePer.ts替代
import { defineComponent, reactive, ref, onMounted, onBeforeUnmount, watch} from 'vue'
import echarts from 'echarts/core'
import {
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
])
type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>
//获取dom
const chartDom = ref()
let option = reactive({
    title: {text:'各阶段松树占比'},
    tooltip: {},
    legend:{
        top: '5%',
        left: 'center'
    },
    series:[{
        name:'',
        type:'pie',
        radius: ['40%','70%'],
        avoidLabelOverlap: false,
        itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
        },
        label:{
            show: true,
            position: 'center'
        },
        emphasis: {
            label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'                
            }
        },
        labelLine:{show: false},
        data: [{value: 408, name:'健康'},
            {value: 408, name:'患病'}]
    }]
})
const width = '400px'
const height = '400px'

//定义echart
let myChart:any = null
const resizeHandler = ()=>{
    myChart.reszie()
}
const debounce = (fun:any,delay:any) => { //设置防抖，保证无论拖动窗口大小，只执行一次获取浏览器宽高的方法
    let timer:any
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fun()
        }, delay)
    }
}
const cancalDebounce = debounce(resizeHandler, 100)

//页面成功渲染时绘制图表
onMounted(() => {
	//配置为 svg 形式，预防页面缩放而出现模糊问题；图表过于复杂时建议使用 Canvas
    myChart = echarts.init(chartDom.value,undefined, {renderer:'svg'})
    // myChart = echarts.init(chartDom.value)
    myChart.setOption(option, true);
    //自适应不同屏幕时改变图表尺寸
    window.addEventListener('resize', cancalDebounce);
})
//页面销毁前，销毁事件和实例
onBeforeUnmount(() => {
    window.removeEventListener('resize', cancalDebounce)
    myChart.dispose()
})
//监听图表数据时候变化，重新渲染图表
watch(() => option, () => {
    myChart.setOption(option, true);
}, { deep: true })
</script>

<style>
@import '@/assets/css/color-light.css';
</style>