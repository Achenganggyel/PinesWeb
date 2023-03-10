<template>
	<div class="BigMap">
		<div class="controller">
			<!--图类型切换按钮-->
			<flex>
				<el-button @click="switchVisible()" type="subTop" class="mapButton TypeSwitch">{{visibleBig? '点状图' : '热力图'}}
				</el-button>
			</flex>
			<!--经纬度输入-->
			<flex>
				<flex class="first-location">经度</flex> <el-input class="location-input"></el-input> 
				纬度 <el-input class="location-input last-location"></el-input> 
				<el-button @click="changeLoc()" type="subTop" class="mapButton save-loc">确认
				</el-button>
			</flex>
	    </div>
	<el-amap
		view-mode="2D"
		:pitch="pitch"
		:show-label="false"
		:center="center"
		:zoom="zoom"
		@click="clickMap"
		@init="initMap"
		style="height: 480px;width: 600px"
	>	
		<el-amap-loca>
			<!--点状图-->
			
			<!--热力图-->
			<el-amap-loca-heatmap
				:visible="visibleBig"
				:source-url="sourceUrl"
				:layer-style="layerStyle"
			/>
		</el-amap-loca>
		<!--点状图-->
	</el-amap>
	</div>
</template>
  
<script lang="ts">
  import {defineComponent} from "vue";
  const gradient = {
	0.1: 'rgba(50,48,118,1)',
	0.2: 'rgba(127,60,255,1)',
	0.4: 'rgba(166,53,219,1)',
	0.6: 'rgba(254,64,95,1)',
	0.8:  'rgba(236,220,79,1)',
	1:'rgba(255,98,4,1)',
  }
  const layerStyle = {
	radius: 20,
	unit: 'px',
	height: 90,
	// radius: 10,
	// unit: 'px',
	// height: 10,
	gradient: gradient,
	value (index:any, feature:any) {
	return feature.properties.count;
	},
	min: 0,
	max: 10,  //4.6
	heightBezier: [0, .53, .37, .98]
  }

  export default defineComponent({
	name: "mapFULL",
	data() {
	  return {
		center: [120.115196, 30.17133],
		zoom: 10,
		pitch: 55,
		visibleBig: true,
		sourceUrl:'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_house_order.json',
		layerStyle: layerStyle
	  }
	},
	methods: {
	  clickMap(e:any) {
		console.log('click map: ', e);
	  },
	  initMap(map:any) {
		console.log('init map: ', map);
	  },
	  switchVisible(){
		this.visibleBig = !this.visibleBig;
	  },
	  changeLoc(){
		this.center = [120,30];
	  }
	}
  })
</script>
  
<style>
@import '@/assets/css/color-light.css';
.BigMap{
	width:100%;
	height: 100%;
}
.controller{
	width: 100%;
	margin-top: -15px;
	margin-bottom: 10px;
}
.mapButton:deep(i){
	font-size: 10px;
}
.TypeSwitch{
	width: 67px;
	height: 28px;
}
.save-loc{
	width: 50px;
	height: 28px;
}
.location-input{
	width: 150px;
	height: 28px;
	margin-right: 5px;
}
.first-location{
	margin-left: 46px;
}
.last-location{
	margin-right: 10px;
}
</style>