<template>
	<div class="container">
		<div class="chooseChar">
			<span class="label">角色：</span>
			<el-select v-model="role" @change="handleChange">
				<el-option label="超级管理员" value="admin"></el-option>
				<el-option label="普通用户" value="user"></el-option>
			</el-select>
		</div>
		<div class="tree-wrapper">
			<el-tree
				ref="tree"
				:data="data"
				node-key="id"
				default-expand-all
				show-checkbox
				:default-checked-keys="checkedKeys"
			/>
		</div>
		<el-button type="confirm" class="save" @click="onSubmit">保存权限</el-button>
	</div>
</template>

<script setup lang="ts" name="permission">
import { ref } from 'vue';
import { ElTree } from 'element-plus';
import { usePermissStore } from '../store/permiss';

const role = ref<string>('admin');

interface Tree {
	id: string;
	label: string;
	children?: Tree[];
}

const data: Tree[] = [
	{
		id: '1',
		label: '系统首页'
	},{
		id: '2',
		label: '数据统计'
	},{
		id: '3',
		label: '分布情况'
	},{
		id: '4',
		label: '松树管理',
		children: [{
			id: '4',
			label: '所有区域'
		},{
			id: '5',
			label: '单个区域'
		}]
	},{
		id: '6',
		label: '病树检测'
	},{
		id: '7',
		label: '消息通知',
		children: [{
			id: '7',
			label: '通知接收'
		},{
			id: '8',
			label: '通知发送',
		}]
	},{
		id: '9',
		label: '权限管理'
	},{
		id: '10',
		label: '系统信息'
	}
];

const permiss = usePermissStore();

// 获取当前权限
const checkedKeys = ref<string[]>([]);
const getPremission = () => {
	// 请求接口返回权限
	checkedKeys.value = permiss.defaultList[role.value];
};
getPremission();

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = () => {
	// 获取选中的权限
	console.log(tree.value!.getCheckedKeys(false));
};

const handleChange = (val: string[]) => {
	tree.value!.setCheckedKeys(permiss.defaultList[role.value]);
};
</script>

<style>
@import '@/assets/css/color-light.css';
.tree-wrapper {
	margin-top: 25px;
	max-width: 500px;
}
.label {
	font-size: 14px;
}
.save {
	margin-top: 40px;
}

/*checkbox*/
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #20946f !important;
  background-color: #20946f!important;
}
.el-checkbox__inner:hover {
  border-color: #529d84!important;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #529d84!important;
}
.el-checkbox {
  color: #111;
  margin-right: 30px;
  font-size: 16px;
  margin-bottom: -1px;
}

</style>
