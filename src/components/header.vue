<template>
    <el-header class="first-kind">
        <div class="flex">
            <div class="logo">{{SystemName}}</div>
            <div class="panel-manager item" ><!--侧边栏折叠-->
                <el-icon @click="collapseChange" v-if="sidebar.collapse"><ArrowRight/></el-icon>
                <el-icon @click="collapseChange" v-else><ArrowLeft/></el-icon>
            </div>
            <div class="tools flex">
                <div class="flex item right-item"><!--全局搜索-->
                	<el-icon class="fisrt-right"><Search /></el-icon>
                </div>
				<div class="flex item right-item"><!--消息提示-->
				<el-icon class="btn-bell" @click="router.push('/tabs')">
					<Bell/>
					<span class="btn-bell-badge" v-if="message"></span>
					<el-tooltip
						effect="dark"
						:content="message ? `有${message}条未读消息` : `消息中心`"
						placement="middle"
					>
					</el-tooltip>
				</el-icon>
                </div>
                <div><!--用户头像-->
				<el-dropdown class="user-name" trigger="click">
				<span class="el-dropdown-link">
					{{ username }}
					<el-icon><arrow-down /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item  @click="router.push('/user')">个人中心</el-dropdown-item>
						<el-dropdown-item divided @click="handeLoginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
				</el-dropdown>
                </div>
            </div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRouter } from 'vue-router';
import config from '../store/config'

const SystemName = config.systemName
const username: string | null = localStorage.getItem('ms_username');
const message: number = 2;

const sidebar = useSidebarStore();
// 侧边栏折叠
const collapseChange = () => {
	sidebar.handleCollapse();
};

onMounted(() => {
	if (document.body.clientWidth < 1500) {
		collapseChange();
	}
});

// 用户名下拉菜单选择登出
const router = useRouter();
const handeLoginout = function(){
	localStorage.removeItem('ms_username')
	router.push('/login')
}
</script>

<style>
.first-kind{
    width: 100%;
    height: 20px;
    position: fixed;
    line-height: 60px;
    font-size: 20px;
    left:0%;
    top:0%;
    background: #8360c3;
    background: -webkit-linear-gradient(to right, rgb(131, 96, 195), rgb(46, 191, 145));
    background: linear-gradient(to right, rgb(131, 96, 195), rgb(46, 191, 145));
    box-shadow: 0px -5px 16px 0px #0000007e; /*十分不明显的投影*/
    z-index: 1;
}
.flex{
    display: flex;
    flex-direction: row;
}
.first-kind .logo{
  letter-spacing: 1px;
  width: 200px;/*用变量替换*/
  background-image:-webkit-linear-gradient(right,#ffffba, rgb(246, 243, 234), rgb(255, 255, 255));
  -webkit-background-clip: text;/*这个issue不用管*/
  -webkit-text-fill-color: transparent; /*渐变色*/
}

.first-kind .item{
  display: flex;
  margin-top: 20px;
  color: #fff;
  font-size:20px;
}
.first-kind .fisrt-right{
  margin-left: calc(123vh);
}
.first-kind .right-item{
  margin-left: 60px;
  color: #fff;
}

.first-kind .user-icon{
  margin-right: 30px;
  color:#fff;
  font-size:20px;
}
.header .logo {
	float: left;
	width: 250px;
	line-height: 70px;
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	height: 70px;
	align-items: center;
}
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.btn-bell-badge {
	position: absolute;
	right: 2px;
	margin-top: -15px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}
.btn-bell .el-icon-notice {
	color: #fff;
}
.user-name {
	margin-left: 80px;
	margin-top: 23px;
	font-size: 15px;
}
.user-avator {
	margin-left: 20px;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-dropdown-menu__item {
	text-align: center;
}
</style>
