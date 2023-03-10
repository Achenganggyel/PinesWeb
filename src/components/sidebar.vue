<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			:collapse="sidebar.collapse"
			background-color="#7f6caa"
			text-color="#bfcbd9" 
			active-text-color="#f7da94"
			unique-opened
			router
		>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
						<template #title>
							<el-icon>
								<component :is="item.icon"></component>
							</el-icon>
							<span>{{ item.title }}</span>
						</template>
						
						<template v-for="subItem in item.subs">
							<el-menu-item
								:index="subItem.index"
								v-permiss="subItem.permiss"
							>
								<template #title>{{ subItem.title }}</template>
							</el-menu-item>
							
						</template>
					</el-sub-menu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
	{
		icon: 'Odometer',
		index: '/dashboard',
		title: '系统首页',
		permiss: '1'
	},{
		icon: 'DataAnalysis',
		index: '/charts',
		title: '数据统计',
		permiss: '2'
	},{
		icon: 'MapLocation',
		index: '/distribution',
		title: '松树分布',
		permiss: '3',
	},{
		icon: 'Calendar',
		title: '松树管理',
		permiss: '4',
		subs: [{
				index:'/ManageAll',
				title:'全区',
				permiss: '4'
			},{
				index:'/ManageAreaA',
				title:'A区',
				permiss: '5'
			},
			{	index:'/ManageAreaB',
				title:'B区',
				permiss: '5'
			},
			{	index:'/ManageAreaC',
				title:'C区',
				permiss: '5'
			},
			{	index:'/ManageAreaD',
				title:'D区',
				permiss: '5'
			},
		]
	},{
		icon:'Camera',
		index:'/uploadPic',
		title:'病树检测',
		permiss:'6'
	},{
		icon: 'DocumentCopy',
		index: '/tabs',
		title: '通知接收',
		permiss: '7'
	},{
		icon: 'Edit',
		index: '/form',
		title: '通知发送',
		permiss: '8',
		
	},{
		icon: 'Warning',
		index: '/permission',
		title: '权限管理',
		permiss: '9'
	},
	{
		icon:'Compass',
		index:'/info',
		title:'系统信息',
		permiss:'10'
	}
];

const route = useRoute();
const onRoutes = computed(() => {
	return route.path;
});

const sidebar = useSidebarStore();
</script>

<style>
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 60px;
	bottom: 0;
	overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}
.sidebar > ul {
	height: 100%;
}
</style>
