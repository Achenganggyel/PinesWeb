<template>
	<div class="SmallMap">
	<el-amap
		view-mode="2D"
		:pitch="pitch"
		:show-label="false"
		:center="center"
		:zoom="zoom"
		@click="clickMap"
		@init="initMap"
		style="height: 600px;width: 600px"
	>	
        <el-amap-loca>
		<!--热力图-->
		<el-amap-loca-heatmap
			:visible="visibleSmall"
			:source-url="sourceUrl"
			:layer-style="layerStyle"
		/>
		</el-amap-loca>
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
	name: "Map_Heat",
	data() {
	  return {
		center: [120.115196, 30.17133],
		zoom: 10,
		pitch: 55,
		visibleSmall: true,
		sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_house_order.json',
		layerStyle: layerStyle
	  }
	},
	methods: {
	  clickMap(e:any) {
		console.log('click map: ', e);
	  },
	  initMap(map:any) {
		console.log('init map: ', map);
	  }
	}
  })
</script>
  
<style>
.SmallMap{
	width:100%;
	height: 100%;
}
</style>