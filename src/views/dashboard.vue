<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<!--用户头像及信息卡片-->
				<el-card shadow="hover" class="card-all" style="{height: 252px}">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">{{ name }}</div>
							<div>{{ role }}</div>
						</div>
					</div>
					<div class="user-info-list">
						上次登录时间：
						<span>2022-10-01</span>
					</div>
					<div class="user-info-list">
						上次登录地点：
						<span>汕头</span>
					</div>
					<div class="user-info-list">
						本次登录地点：
						<span>汕头</span>
					</div>
				</el-card>
				<el-card shadow="hover" style="height: 331px" class="card-all">
					<template #header>
						<div class="clearfix">
							<span>各阶段松树</span>
						</div>
					</template>
					<!--TODO：要和数据库数据联系上，计算方式calc/eachStagePer.ts-->
					<div>
						健康
						<el-progress :percentage="71.3" color="#42b983"></el-progress>
					</div>
					<div>
						阶段I
						<el-progress :percentage="24.1" color="#f1e05a"></el-progress>
					</div>
					<div>
						阶段II
						<el-progress :percentage="13.7"></el-progress>
					</div>
					<div>
						阶段III
						<el-progress :percentage="4.9" color="#f56c6c"></el-progress>
					</div>
					<div>
						阶段IV
						<el-progress :percentage="1.0" color="#f56c6c"></el-progress>
					</div>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-row :gutter="20" class="card-all">
					<el-col :span="14">
						<!--第一张卡片：患病树占比-->
						<allTrees class="card-all trees-all"/>
					</el-col>
					<el-col :span="10">
						<!--第二张卡片：树木的总数-->
						<el-card shadow="hover" 
							:body-style="{ padding: '0px' }"
							style="height: 160px"
							class="card-all">
							<div class="grid-content"><!--修改这里的圆角-->
								<img src="@/assets/img/icon/松树icon.png" class="grid-con-icon first-icon-color" />
								<div class="grid-cont-right">
									<div class="grid-num">7270000</div>
									<div class="grid-text second-font-color">总松树数目</div>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-card shadow="hover" style="height: 430px" class="card-all">
					<template #header>
						<div class="clearfix" @click="goToMap()">
							<span>患病松树分布</span>
						</div>
					</template>
					<mapHeat class="map-heat" />
				</el-card>
			</el-col>
		</el-row>
		<!--下方的几个数据统计-->
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card shadow="hover" class="card-all">
					<schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover" class="card-all">
					<schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
/*导入数据卡片*/
import allTrees from '@/components/allTreesCard.vue'
import Schart from 'vue-schart'
import mapHeat from '@/components/mapHeat.vue'
import imgurl from '../assets/img/img.jpg'
import router from '@/router'

const goToMap=()=>{
	router.push('/distribution')
}

const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';

const options = {
	type: 'bar',
	title: {
		text: '各区域松树健康状况'
	},
	xRorate: 25,
	labels: ['所有', 'A区', 'B区', 'C区', 'D区'],
	datasets: [
		{label: '健康',
			data: [54, 55, 56, 55,50]
		},{
			label: '患病I阶段',
			data: [30, 80, 34, 37,28]
		},{
			label: '患病II阶段',
			data: [30, 50, 34, 37,28]
		},{
			label: '患病III阶段',
			data: [30, 35, 67, 37,28]
		},{
			label: '患病IV阶段',
			data: [30, 35, 80, 37,25]
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
			data: [234, 278, 270, 190, 230, 100]
		},{
			label: '患病I阶段',
			data: [234, 278, 270, 190, 230, 100]
		},{
			label: '患病II阶段',
			data: [164, 178, 150, 135, 160, 100]
		},{
			label: '患病III阶段',
			data: [114, 138, 200, 235, 190, 90]
		},{
			label: '患病IV阶段',
			data: [114, 138, 200, 235, 190, 80]
		}
	]
};

</script>

<style>
@import '@/assets/css/color-light.css';
.grid-content {
	display: flex;
	align-items: center;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
}

.grid-num {
	font-size: 50px;
	color:rgb(236, 33, 74);
	font-weight: bold;
}

.grid-text{
	font-size:30px;
	padding-bottom: 3px;
}

.grid-con-icon {
	font-size: 50px;
	width: 120px;
	height: 160px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}
.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}
.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.trees-all{
	height:160px;
}
.map-heat{
	width: 1000px;
	height: 430px;
	margin-left: -50px;
	margin-top: -20px;
}
.schart {
	width: 100%;
	height: 300px;
	vertical-align: center;
	text-align: center;
}
</style>
