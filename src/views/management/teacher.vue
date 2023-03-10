<template>
<div>
	<div class="container">
		<div class="handle-box">
			<el-select v-model="query.college" placeholder="学院" class="handle-select-college">
				<el-option key="1" label="工学院" value="工学院"></el-option>
				<el-option key="2" label="文学院" value="文学院"></el-option>
				<el-option key="3" label="理学院" value="理学院"></el-option>
				<el-option key="4" label="商学院" value="商学院"></el-option>
				<el-option key="5" label="农学院" value="农学院"></el-option>
				<el-option key="6" label="医学院" value="医学院"></el-option>
				<el-option key="7" label="艺术学院" value="艺术学院"></el-option>
				<el-option key="8" label="社会学院" value="社会学院"></el-option>
			</el-select>
			<el-select v-model="query.department" placeholder="系" class="handle-select-department">
				<el-option key="1.1" label="计算机系" value="计算机系"></el-option>
				<el-option key="2.1" label="电子系" value="电子系"></el-option>
				<el-option key="3.1" label="机械系" value="电子系"></el-option>
			</el-select>				
			<el-input v-model="query.name" placeholder="姓名" class="handle-input-long"></el-input>
			<el-button type="subManage" :icon="Search" @click="handleSearch()">搜索</el-button>
			<el-button type="subManage" :icon="Plus">新增</el-button>
		</div>
		<div class="boxShadow">
			<div>
				<el-table
					:data="tableData"
					ref="multipleTable"
					tooltip-effect="dark"
					header-cell-class-name="table-header"
				>
				<!--动态表格的v-for和v-if问题不知如何避免，用静态表格-->
				<el-table-column sortable prop="id" label="工号" align="center"></el-table-column>
				<el-table-column prop="name" label="姓名" align="center"></el-table-column>
				<el-table-column 
				 :filters="[{
					text:'男',value:'男'
				 },{
					text:'女',value:'女'
				 }
				 ]"
				 prop="gender" label="性别">
				</el-table-column>
				<el-table-column 
				:filters="[{
					text:'工学院',value:'工学院'
					},{
					text:'商学院',value:'商学院'
					}
				]"
				prop="college" label="学院" 
				align="center">
				</el-table-column>
				<el-table-column 
				:filters="[]"
				prop="department" label="系"
				align="center">
				</el-table-column>
				<el-table-column 
				:filters="[]"
				selectable prop="major" label="专业"
				align="center">
				</el-table-column>
				<el-table-column
				:filters="[]"
				prop="post" label="职位"
				align="center">
			    </el-table-column>
				<el-table-column 
				:filters="[]"
				prop="status" label="工作状态" 
				width="100" align="center">
					<template #default="teacher_data">
						<el-tag 
						:type="teacher_data.row.status<0?'danger':
						teacher_data.row.status>0?'info':'success'">
						<template v-if="teacher_data.row.status==-1">
							未到
						</template>
						<template v-else-if="teacher_data.row.status==0">
							在岗
						</template>
						<template v-else-if="teacher_data.row.status==1">
							出差
						</template>
						<template v-else-if="teacher_data.row.status==2">
							请假
						</template>
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column sortable prop="reg_time" label="注册时间" width="150"></el-table-column>
				<el-table-column sortable prop="birth" label="出生日期"  width="150"></el-table-column>
				<el-table-column sortable prop="thism_attendance" label="出勤率" width="100" align="center">
					<template #default="teacher_data">
						{{teacher_data.row.thism_attendance}} %
					</template>
				</el-table-column>
				<el-table-column prop="mailbox" label="邮箱账号"></el-table-column>
				<el-table-column prop="lecture" label="授课信息" width="100"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template #default="teacher">
						<el-button class="blue" text :icon="Edit" @click="handleEdit(teacher.$index, teacher.row)" v-permiss="15">
					编辑
						</el-button>
						<el-button class="red" text :icon="Delete"  @click="handleDelete(teacher.$index)" v-permiss="16">
					删除
						</el-button>
					</template>
				</el-table-column>
				</el-table>	
			</div>
		</div>
		
		<div class="pagination">
			<el-pagination
				background
				layout="total, prev, pager, next"
				:current-page="query.pageIndex"
				:page-size="query.pageSize"
				:total="pageTotal"
				@current-change="handlePageChange"
			></el-pagination>
		</div>
	</div>

	<!-- 编辑弹出框 -->
	<el-dialog title="编辑" v-model="editVisible" width="30%">
		<el-form label-width="70px">
			<el-form-item label="工号">
				<el-input v-model="form.id"></el-input>
			</el-form-item>
			<el-form-item label='姓名'>
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label='性别'>
				<el-input v-model="form.gender"></el-input>
			</el-form-item>
			<el-form-item label='学院'>
				<el-input v-model="form.college"></el-input>
			</el-form-item>
			<el-form-item label='系'>
				<el-input v-model="form.department"></el-input>
			</el-form-item>
			<el-form-item label='专业'>
				<el-input v-model="form.major"></el-input>
			</el-form-item>
			<el-form-item label='职位'>
				<el-input v-model="form.post"></el-input>
			</el-form-item>
			<el-form-item label='工作状态'>
				<el-input v-model="form.status"></el-input>
			</el-form-item>
			<el-form-item label='注册时间'>
				<el-input v-model="form.reg_time"></el-input>
			</el-form-item>
			<el-form-item label='生日'>
				<el-input v-model="form.birth"></el-input>
			</el-form-item>
			<el-form-item label='出勤率'>
				<el-input v-model="form.thism_attendance"></el-input>
			</el-form-item>
			<el-form-item label='授课信息'>
				<el-input v-model="form.lecture"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</div>
</template>

<script setup lang="ts" name="table_teacher">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox,ElTable } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchTeacher} from '../../../src/api/index';
import { TeacherCol } from '../config/TeacherCol';
import { table } from 'console';

interface TableItem {
	id: number;
	name: string;
	gender:string;
	college: string;
	department: string;
	major:string;
	post:string;
	status: number;
	reg_time: string;
	birth:string;
	thism_attendance:number;
	lecture:string;
}

const query = reactive({
	gender: '',
	status: '',
	college: '',
	department:'',
	major:'',
	name: '',
	pageIndex: 1,
	pageSize: 10
});

const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchTeacher().then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.pageTotal;
	});
};
getData();


// 查询操作
const handleSearch= () => {
	query.college='工学院';
	query.department='';
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	id:0,
	name:'',
	gender:'',
	college: '',
	department: '',
	major:'',
	post:'',
	status: 0,
	reg_time: '',
	birth:'',
	thism_attendance:100,
	lecture:''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index
	form.name = row.name
	form.id = row.id
	form.gender = row.gender
	form.college = row.college
	form.department = row.department
	form.major = row.major
	form.post = row.post
	form.status = row.status
	form.reg_time = row.reg_time
	form.birth = row.birth
	form.thism_attendance = row.thism_attendance
	form.lecture = row.lecture
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	let arr = Array(TeacherCol.cols.keys)
	tableData.value[idx].id = form.id
	tableData.value[idx].name = form.name
	tableData.value[idx].gender = form.gender
	tableData.value[idx].college = form.college
	tableData.value[idx].department = form.department
	tableData.value[idx].major = form.major
	tableData.value[idx].post = form.post
	tableData.value[idx].status = form.status
	tableData.value[idx].reg_time = form.reg_time 
	tableData.value[idx].birth = form.birth
	tableData.value[idx].thism_attendance = form.thism_attendance
	tableData.value[idx].lecture = form.lecture
};
</script>

<style>
.handle-box {
	margin-bottom: 20px;
}

.handle-select-college {
	margin-right: 10px;
}
.handle-select-department {
	margin-right: 10px;
}
.handle-input-long{
	width: 300px;
}
.el-button--subManage{
	background-color: #fa7e2316;
	border-color: #fa7e2316;
	color: #ff0000;
	margin-left: 15px;
}	
.el-button--subManage:hover{
	background-color: #fba414;
	border-color: #fba414;
	color:#fff;
}	

.blue{
	background-color:#5698c330;
	border-color:#5698c330;
}
.red{
	background-color: #e3b4b875;
	border-color:#e3b4b875;
}
</style>
