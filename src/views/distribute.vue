<template>
    <div class="container container-distribute" ><!--地图分布-->
        <el-row :gutter="20">
            <el-col :span="10">
                <el-card class="card-all Map-BigMap"> 
                    <MapFull class="map-full"/>
                </el-card>
            </el-col>
            <el-col :span="10">
                <div class="OtherInfo"> 
                    <!--重点关注松树信息[表格]-->
                    <div class="subTitle">
                        <el-icon class="subTitle-icon"><StarFilled/></el-icon>
                        重点关注松树
                    </div>
                    <div class="attention-pines">
                        <el-table :data="AttentionPines" border class="attention-table"> 
                            <el-table-column label="编号" prop="id" align="center"></el-table-column>
                            <el-table-column label="状态" width="80px" prop="status" align="center">
                                <template #default="data">
                                    <el-tag :type="data.row.status==='健康'?'success':'warning'">
                                        {{data.row.status}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="纬度" width="160px" prop="latitude" align="center">
                                <template #default="data">北纬 {{data.row.latitude.toFixed(8)}}</template>
                            </el-table-column>
                            <el-table-column label="经度" width="160px" prop="longtitude" align="center">
                                <template #default="data">东经 {{data.row.longitude.toFixed(8)}}</template>
                            </el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template #default="cancel">
                                    <!--定位到此处-->
                                    <el-button text :icon="Place" 
                                    class="attention-smallIcon first-smallIcon" 
                                    @click="handleChooseLoc(cancel.$id)" 
                                    v-permiss="15">
                                    </el-button>
                                    <!--取消关注-->
                                    <el-button text :icon="CloseBold" 
                                    class="attention-smallIcon second-smallIcon" 
                                    @click="handleDelete(cancel.$index, cancel.row)" 
                                    v-permiss="15">
                                    </el-button>
                                </template>
                            </el-table-column>  
                        </el-table>
                    </div>
                    <!--各区域患病松树占比-->
                    <div class="subTitle second-subtitle">
                        <el-icon class="subTitle-icon"><StarFilled/></el-icon>
                        各区域患病情况
                    </div>
                    <stageInZone class="stage-diff-zone"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import MapFull from "@/components/mapFull.vue"
import stageInZone from "@/components/stageInZone.vue"
import { Place, CloseBold } from '@element-plus/icons-vue'
//重点关注的松树信息
const AttentionPines=[{ 
    id:1,
    status:'健康',
    latitude: 20.220233453, 
    longitude: 126.003453343358, 
    },{
    id:1,
    status:'健康',
    latitude: 20.220233453, 
    longitude: 126.003453343358,  
    },{
    id:1,
    status:'健康',
    latitude: 20.220233453, 
    longitude: 126.003453343358,
    },{
    id:1,
    status:'健康',
    latitude: 20.220233453, 
    longitude: 126.003453343358,
    }]
//重定位函数
const handleChooseLoc = (id:number) =>{

}
//删除关注
const handleDelete = (index:any, row:any) => {

}
</script>

<style>
@import '@/assets/css/color-light.css';
.container-distribute{
    width:96%;
    height: calc(80vh); 
}
.Map-BigMap{
    flex:1;
    width: 650px;
    height: 580px;
}
.map-full{
    width: 600px;
    height: 520px;
    margin-top: 5px;
    text-align: center;
}
.OtherInfo{
    flex: 1;
    width: 650px;
    height: 600px;
    margin-left: calc(15vh);
}
.subTitle{
    font-size: 20px;
    font-size: bold;
    margin-bottom: 15px;
    color: #585555;
}
.subTitle-icon{
    font-size: 20px;
    vertical-align:-15%;
    color: #8f8a8a;
}
.attention-pines{
    width: 100%;
}
.attention-table{
    width: 100%;
    height: 200px;
    border-radius: 5px;
}
.attention-smallIcon{
    height: 20px;
    width: 20px;
    font-size: 13px;
    color:rgb(168, 161, 161);
}
.second-subtitle{
    margin-top: 20px;
}
.first-smallIcon{
    padding-left: -5px;
}
.second-smallIcon{
    padding-right: -5px;
}
.stage-diff-zone{
    width: 100%;
    height: 600px;
}
</style>