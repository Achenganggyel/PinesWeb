<template>
 <div class="container chartsContainer" id="dataAnalysis">
    <div><!--第一行-->
        <flex el-card class="chart-box chart-type1">测试1</flex>
        <flex StagePropInAll class="chart-box chart-type2"></flex>
    </div>
    <div><!--第二行-->
        <flex el-card class="chart-box chart-type1">测试3</flex>
        <flex el-card class="chart-box chart-type2">测试4</flex>
    </div>
 </div>
</template>

<script setup lang="ts">
import pieCard from '@/components/pieCard.vue'

</script>

<style>
.chartsContainer{
    width: calc(178vh);
    height: 140%;
    border-radius: 20px;
    margin-bottom: 20px;
    align-items: center;
}
.chart-box{
    margin-top: -200px;
    display: inline-block;
    text-align: center;
    margin-bottom: 50px;
    box-shadow:inset 0px 0px 5px 1px #000;
}
.chart-type1{ /*折线图和柱状图*/
    width: 800px;
    height: 400px;
    margin-left: 20px;
    margin-right: 80px;
}
.chart-type2{
    width: 400px;
    height: 400px;
    margin-right: 20px;
}
</style>