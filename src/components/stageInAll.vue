<template>
    <div class="chartAll">
        <Schart class="schart" canvasId="stageInAll" :options="pinesAll_opt"></Schart>
    </div>
</template>

<script setup lang="ts">
import Schart from 'vue-schart'
import stage_distribute from '../assets/data/pines/dataAnalysis/stage_distribute.json'
let stage_name:string[]=[]
let stage_number:number[]=[]
for(let i of stage_distribute.type){
	stage_name.push(i.title)
	stage_number.push(i.number)
}

const pinesAll_opt = {
    type: 'pie',
	title: {
		text: '所有区域'
	},
	legend: {
		position: 'left'
	},
	bgColor: '#fbfbfb',
	labels: stage_name,
	datasets: [{
        data: stage_number
	}]
}

</script>

<style>
.schart{
    width: 100%;
    height: 100%;
}
</style>