<template><!--各个地区的患病树占比，放在地区分布情况页面-->
    <el-dropdown @command="chooseZone">
        <el-button size="small" type="subTop">
            选择区域
            <el-icon class="icon-arrow">
                <arrow-down />
            </el-icon>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu size="small">
                <el-dropdown-item prop="areaAll">所有区域</el-dropdown-item>
                <el-dropdown-item prop="areaA">A区</el-dropdown-item>
                <el-dropdown-item prop="areaB">B区</el-dropdown-item>
                <el-dropdown-item prop="areaC">B区</el-dropdown-item>
                <el-dropdown-item prop="areaD">D区</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <div class="zoneCom">
        <div class="chart-center2">
            <stageInAll class="chart-center"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import stageInAll from './stageInAll.vue'
import Schart from 'vue-schart'

const stage_name = ['健康','患病I阶段','患病II阶段','患病III阶段','患病IV阶段']
const area = [{
        id: 'A',
        opt_link: 'pinesA_opt'
    },{
        id: 'B',
        opt_link: 'pinesB_opt'
    },{
        id: 'C',
        opt_link: 'pinesC_opt'
    },{
        id: 'D',
        opt_link: 'pinesD_opt'
    }]
const chooseZone = ()=>{

}
const pinesA_data = [55,80,50,35,28]
const pinesB_data = [56,32,36,17,5]
const pinesC_data = [55,38,36,32,28]
const pinesD_data = [50,30,28,27,11]
const pinesA_opt = {
    type: 'pie',
    title: {text:'A区'},
    legend:{position:'center'},
    bgColor:'#fff',
    labels: stage_name,
    datasets:[{data:pinesA_data}]
}
const pinesB_opt = {
    type: 'pie',
    title: {text:'B区'},
    legend:{position:'center'},
    bgColor:'#fff',
    labels: stage_name,
    datasets:[{data:pinesB_data}]
}
const pinesC_opt = {
    type: 'pie',
    title: {text:'C区'},
    legend:{position:'center'},
    bgColor:'#fff',
    labels: stage_name,
    datasets:[{data:pinesC_data}]
}
const pinesD_opt = {
    type: 'pie',
    title: {text:'D区'},
    legend:{position:'center'},
    bgColor:'#fff',
    labels: stage_name,
    datasets:[{data:pinesD_data}]
}
</script>

<style>
@import '@/assets/css/color-light.css';
.zoomCom{
    display: flex;
    width: 100%;
    height: 100%;
}
.chart-center{
    height: 300px;
    width: 550px;
    text-align: center;
    margin-left: 80px;
    margin-top: -30px;
}
.icon-arrow{
    margin-right: -8px;
    vertical-align:-10%;
}
</style>