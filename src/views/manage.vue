<template><!--动态表格加载：区域不同-->
    <div class="container container-manage">
        <!--查询、新增等操作框-->
        <div class="handle-box">
          <el-cascader
            v-model="choice"
            :options="options"
            :props="props"
            :size="10"
            @change="handleChange"
            class ="chooseSearchItemBox"
            popper-class="chooseSearchItem"
          />
          <el-input v-model="query.content" placeholder="请输入要查询的内容" 
          class="handle-input" clearable @clear="getAllpines"></el-input>
            <!--TODO:若查询为空，出现dialog弹窗？？出现失败！！-->
          <el-button type="subTop SearchButton" class="subManage" :icon="Search" @click="handleSearch">搜索</el-button>
            <el-dialog
              v-show="dialogVisible"
              title=""
              width="30%"
              :append-to-body="true"
              >
              查询内容不能为空
            </el-dialog>
          <el-button type="subTop" class="subManage" :icon="Plus">增加</el-button>
        </div>
        <!--根据网址动态加载属性和数据-->
        <el-table :data="pines_test1"  ref="multipleTable" border class="pinesTable"
          empty-text="暂无数据，稍后重试"
        >
          <!--表项-->
          <el-table-column v-for="column in pinesColumnList" :key="column.prop" :width="column.width" align="center">
            <!--表头属性-->
            <template #header><!--p: html中定义段落-->
              <p v-show="true">
                {{column.label}}
                <flex v-if="column.classify===true"><!--TODO：写完选择排序-->
                  <el-icon @click="chooseType" class="additionalFunc"><Operation/></el-icon>
                </flex>
                <flex v-if="column.sort==true">
                  <el-icon @click="sort" class="additionalFunc"><Sort/></el-icon>
                </flex>
              </p>  
            </template>
            <!--数据修改-->
            <template #default="data">
              <p v-if="column.prop==='id'"><!--不知道为什么数据出不来，强行搞个插槽-->
                {{data.row.id}}
              </p>
              <p v-if="column.prop==='zone'">
                {{data.row.zone}}
              </p>
              <p v-if="column.prop==='type'">
                {{data.row.type}}
              </p>
              <p v-if="column.prop==='supervisor'">
                {{data.row.supervisor}}
              </p>
              <p v-if="column.prop==='birth_time'">
                {{data.row.birth_time}}
              </p>
              <p v-if="column.prop=='status'">
                <el-tag :type="data.row.status==='健康'?'success':data.row.status=='患病IV'?'danger':'warning'">
                  {{data.row.status}}
                </el-tag>
              </p>
              <p v-if="column.prop==='latitude'">
                北纬 {{data.row.latitude.toFixed(8)}}
              </p>
              <p v-if="column.prop==='longitude'">
                东经 {{data.row.longitude.toFixed(8)}}
              </p>
              <p v-if="column.prop==='img'">
                {{data.row.img}}
              </p>
            </template>
          </el-table-column>
          <!--操作项-->
          <el-table-column label="操作" width="200" align="center">
            <template #default="scope">
              <el-button text :icon="Edit" 
              class="blueText" @click="handleEdit(scope.$index, scope.row)" 
              v-permiss="15">
                编辑
              </el-button>
              <el-button text :icon="Delete" 
              class="redText" @click="handleDelete(scope.$index)" 
              v-permiss="16">
                删除
              </el-button>
            </template>
          </el-table-column>  
        </el-table> 
    </div>
</template>

<script setup lang="ts" name="managePines">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue'
//import { fetchPinesInfo } from '@/api/index' 
import { pinesColumnList } from '@/utils/TableAtt'
import { pines_test1 } from '@/assets/data/pines/test_1'
import config from '@/store/config'

interface PinesItem{ //松树管理
  id: number,
  zone: string,
  type: string, //松树的类型
  supervisor: string,
  birth_time: string, //原数据库类型是datetime
  status: string,
  latitude: number, //该树所在纬度
  longitude: number, //经度
  img: string, //图片格式？？
}

//搜索类别选择
const choice = ref([]) //获得的菜单选择
const options = [{
  value:'id',
  label:'编号'
},{
  value:'zone',
  label:'区域',
},{
  value:'type',
  label:'种类'
},{
  value:'supervisor',
  label:'负责人'
},{
  value:'status',
  label:'状态' 
}]
//具体查询
const query = reactive({
  content:'', //查询内容
  type:choice, //五种查询的prop
  pageIndex:1, //当前页码
  pageSize:10 //每页显示条数
})


const props = {
  expandTrigger: 'hover' as const
}
const handleChange = () =>{
  console.log('选择成功')
}

//表格具体数据
const tableData:[] = []

// ref<PinesItem[]>([])

const pageTotal = ref() //表格长度

//获取松树数据的接口
/*
const getPinesInfo = () =>{
  fetchPinesInfo().then(res => {
    tableData.value = res.data.list
    pageTotal.value = res.data.pageTotal
  })
}
getPinesInfo()
*/
const getAllpines = () => {
  
} 

/**
 * 查询：以松树的某个特征找它们
 * @arg
*/
const handleSearch = () => {
  
}
let dialogVisible = ref(false) //初始不会弹出弹窗


/**
 * 查询某一页
 * @arg
 */
const handlePageChange = (val: number) => {
  

}

/**在列表中选择特定类别的
 * @arg:
 *  
 */
const chooseType = (label:string, kind:string) => {

}

/**对项目排序
 * @arg:
 * @return:
 */
const sort = (label:string)=>{

}

/**删除handleDelete
@arg:
  index：表格项的编号输入
@return
*/
const handleDelete = (index: number) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功')
			tableData.splice(idx, 1) //TODO:更新数据库
		})
		.catch(() => {})
}

/**表格编辑和保存弹窗
 *  */
const editVisible = ref(false)
let form = reactive({ //增加列的表格
  id: null,
  zone: '',
  type: '', //select
  supervisor: '',
  birth_time: null, //date
  status: '', //select
  latitude: null, //limited number
  longitude: null, //l n
  img: null, //image
})
let idx: number = -1
const handleEdit = (index: number, row:PinesItem) => {
  idx = index;


}
const handleSaveEdit = () => {

}

</script>

<style>
@import '@/assets/css/color-light.css';
.container-manage{
  width: 96%;
  height: calc(120vh);
}
.handle-box{
  width: 100%;
  height: 50px;
  position:relative; /*屏幕的相对位置 */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;
  margin-top: -20px;
  height: 80px;
  gap: 20px; /*flexbox中的间距*/
}
.chooseSearchItemBox{
  width:100px;
}
.chooseSearchItem{  /*TODO：没搜到这玩意的可用样式修改 */
  height: 180px; 
  width: 100px;
  text-align: center;
  border-radius: 20px;
}
.chooseSearchItem :focus{
  border-color: #20894d;
}
.chooseSearchItem :hover{ /*鼠标悬浮时，菜单的样式*/
  width: 100px;
}
.handle-input{ 
  width: 300px;
}
.subManage{
  border-radius: 15px;
}	
.SearchButton{ /*搜索中的查询icon*/
  margin-right: calc(95vh);
}
/*表格信息*/
.additionalFunc{ /*表头小icon*/
  vertical-align:-20%; /*解决icon和文字不对齐*/
  font-size: 15px;
  color:#857be6;
}
.additionalFunc :hover{ 
  font-size: 15px;
  color:#c3bef0;
}
.additionalFunc :active{
  font-size: 14px; 
  color:#c3bef0;
}
.additionalFunc :focus{ 
  vertical-align:-20%;
  font-size: 15px;
  color:#857be6;
}
.pinesTable{
  width: 100%;
  border-radius: 5px;
}
.blueText{ /**TODO：修改文字按钮：https://element-plus.gitee.io/zh-CN/component/button.html#button-exposes*/
  color:rgb(100, 169, 214);
}
.redText{
  color:rgb(237, 121, 97);
}
</style>