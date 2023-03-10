<template>
	<div class="container">
		<div class="schart-box">
			<schart class="schart" canvasId="bar" :options="options1"></schart>
		</div>
		<div class="schart-box">
			<schart class="schart" canvasId="line" :options="options2"></schart>
		</div>
		<div class="unit">单位：万棵</div>
		<div class="schart-box">
			<schart class="schart" canvasId="pie" :options="options3"></schart>
		</div>
		<div class="schart-box">
			<schart class="schart" canvasId="ring" :options="options4"></schart>
		</div>
	</div>
</template>

<script setup lang="ts" name="basecharts">
import Schart from 'vue-schart';
import stage_distribute from '../assets/data/pines/dataAnalysis/stage_distribute.json'
import type_distribute from '../assets/data/pines/dataAnalysis/type_distribute.json'
//import StagePropInAll from '@/components/pieCard.vue'
let stage_name:string[]=[]
let stage_number:number[]=[]
let type_name:string[]=[]
let type_number:number[]=[]

for(let i of type_distribute.type){
	type_name.push(i.title)
	type_number.push(i.number)
}
for(let i of stage_distribute.type){
	stage_name.push(i.title)
	stage_number.push(i.number)
}


const options1 = {
	type: 'bar',
	title: {
		text: '各区域松树健康状况'
	},
	xRorate: 25,
	labels: ['所有', 'A区', 'B区', 'C区', 'D区'],
	datasets: [
		{label: '健康',
			data: [216, 55, 56, 55,50]
		},{
			label: '患病I阶段',
			data: [177, 80, 32, 38,30]
		},{
			label: '患病II阶段',
			data: [151, 50, 36, 36,28]
		},{
			label: '患病III阶段',
			data: [117, 35, 17, 32,27]
		},{
			label: '患病IV阶段',
			data: [66, 28, 5, 28,11]
		}
	]
};
const options2 = {
	type: 'line',
	title: {
		text: '近6个月松树健康状态变化'
	},
	bgColor: '#fbfbfb',
	labels: ['9月', '10月', '11月', '12月', '1月', '2月'],
	datasets: [{
			label: '健康',
			data: [223, 220, 219, 218, 218, 218]
		},{
			label: '患病I阶段',
			data: [181, 181, 180, 178, 177, 177]
		},{
			label: '患病II阶段',
			data: [152, 152, 151, 151, 151, 151]
		},{
			label: '患病III阶段',
			data: [ 117, 117, 117, 117, 117, 117]
		},{
			label: '患病IV阶段',
			data: [66, 66, 66, 66, 66, 66]
		}
	]
};
const options3 = {
	type: 'pie',
	title: {
		text: '林区总树木健康状况'
	},
	legend: {
		position: 'left'
	},
	bgColor: '#fbfbfb',
	labels: stage_name,
	datasets: [{
			data: stage_number
	}]
};
const options4 = {
	type: 'ring',
	title: {
		text: '林区松树种类分布'
	},
	showValue: false,
	legend: {
		position: 'bottom',
		bottom: 40
	},
	bgColor: '#fbfbfb',
	labels: type_name,
	datasets: [{
		data: type_number
	}]
};
</script>

<style>
.schart-box {
	display: inline-block;
	margin: 20px;
}
.schart {
	width: 600px;
	height: 400px;
}
.unit {
	color: #aeabab;
	padding-left: 50px;
	padding-top: 10px;
	padding-bottom: 20px;
}
</style>
