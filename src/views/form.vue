<template>
	<div class="container">
		<div class="form-box">
			<el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
				<el-form-item label="通知名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="发送单位" prop="from">
					<el-select v-model="form.region" placeholder="请选择"><!--参考“县林业局有哪些部门：https://zhidao.baidu.com/question/80279688.html#:~:text=%E6%9E%97%E4%B8%9A%E5%B1%80%E6%98%AF%E4%B8%BB%E7%AE%A1%E6%9E%97%E4%B8%9A%E5%B7%A5%E4%BD%9C%E7%9A%84%E5%9B%BD%E5%8A%A1%E9%99%A2%E7%9B%B4%E5%B1%9E%E6%9C%BA%E6%9E%84%E3%80%82,%E5%86%85%E8%AE%BE%E6%9C%BA%E6%9E%8411%E4%B8%AA%EF%BC%9A%E5%8A%9E%E5%85%AC%E5%AE%A4%E3%80%81%E6%A4%8D%E6%A0%91%E9%80%A0%E6%9E%97%E5%8F%B8%E3%80%81%E6%A3%AE%E6%9E%97%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E5%8F%B8%E3%80%81%E9%87%8E%E7%94%9F%E5%8A%A8%E6%A4%8D%E7%89%A9%E4%BF%9D%E6%8A%A4%E5%8F%B8%E3%80%81%E6%A3%AE%E6%9E%97%E5%85%AC%E5%AE%89%E5%B1%80%EF%BC%88%E6%A3%AE%E6%9E%97%E9%98%B2%E7%81%AB%E5%8A%9E%E5%85%AC%E5%AE%A4%EF%BC%89%E3%80%81%E6%94%BF%E7%AD%96%E6%B3%95%E8%A7%84%E5%8F%B8%E3%80%81%E5%8F%91%E5%B1%95%E8%AE%A1%E5%88%92%E4%B8%8E%E8%B5%84%E9%87%91%E7%AE%A1%E7%90%86%E5%8F%B8%E3%80%81%E7%A7%91%E5%AD%A6%E6%8A%80%E6%9C%AF%E5%8F%B8%E3%80%81%E5%9B%BD%E9%99%85%E5%90%88%E4%BD%9C%E5%8F%B8%E3%80%81%E4%BA%BA%E4%BA%8B%E6%95%99%E8%82%B2%E5%8F%B8%E3%80%81%E6%9C%BA%E5%85%B3%E5%85%9A%E5%A7%94%E3%80%82”-->
						<el-option key="sjwh" label="数据维护部门" value="sjwh"></el-option>
						<el-option key="zszl" label="植树造林办" value="zszl"></el-option>
						<el-option key="slfh" label="森林防火办公室" value="slfh"></el-option>
						<el-option key="slga" label="森林公安分局" value="slga"></el-option>
						<el-option key="kxjs" label="科学技术办" value="kxjs"></el-option>
						<el-option key="slzy" label="森林资源管理办" value="slzy"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发布日期" prop="date">
					<el-col :span="11">
						<el-form-item>
							<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="form.date"
								style="width: 100%"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="接收单位" prop="get">
					<el-checkbox-group v-model="form.type">
						<el-checkbox label="所有部门" name="upload"></el-checkbox>
						<el-checkbox label="数据维护部门" name="upload"></el-checkbox>
						<el-checkbox label="植树造林办" name="upload"></el-checkbox>
						<el-checkbox label="森林防火办公室" name="upload"></el-checkbox>
						<el-checkbox label="森林公安分局" name="upload"></el-checkbox>
						<el-checkbox label="科学技术办" name="upload"></el-checkbox>
						<el-checkbox label="森林资源管理办" name="sdzx"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="优先级" prop="priority">
					<el-radio-group v-model="form.priority">
						<el-radio label="低"></el-radio>
						<el-radio label="中"></el-radio>
						<el-radio label="高"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="通知详情" prop="desc">
					<el-input type="textarea" rows="5" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="confirm" @click="onSubmit(formRef)">表单提交</el-button>
					<el-button @click="onReset(formRef)">重置表单</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="baseform">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';


const rules: FormRules = {
	name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
	from: [{ required: true, message: '请选择发布单位', trigger: 'blur'  }],
	date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
	get: [{ required: true, message: '请输入通知单位', trigger: 'blur'  }]
};
const formRef = ref<FormInstance>();
const form = reactive({
	name: '',
	region: '',
	date:'',
	type: '',
	priority: '中',
	desc: '',
	options: []
});
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
	// 表单校验
	if (!formEl) return;
	formEl.validate(valid => {
		if (valid) {
			console.log(form);
			ElMessage.success('提交成功！');
		} else {
			return false;
		}
	});
};
// 重置
const onReset = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style>
@import '@/assets/css/color-light.css';
.el-checkbox {
  color: #000;
  margin-right: 30px;
  font-size: 16px;
  margin-bottom: 3px;
}
.el-checkbox__inner:hover {
  background-color:  #20946f !important;
  border-color: #20946f!important;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  background-color:  #529d84 !important;
  border-color: #529d84!important;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #20946f !important;
}
.el-radio__input.is-checked .el-radio__inner{
  background-color: #529d84 !important;
  border-color: #529d84!important;
}
</style>