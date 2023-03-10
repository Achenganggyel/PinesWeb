<template>
    <div class="container container-base">
        <div :key="this_key">
            <el-row :gutter="22">
                <el-col :span="11">
                <!--图片上传位置-->
                <el-card shadow="hover" class="uploadLocation" @click="callImage"><!--上传后显示预览-->
                    <!--上传前-->
                    <span v-if="!dialogVisible">
                        <div><el-icon class="uploadIcon">
                            <Upload />
                        </el-icon></div>
                        <input type="file"
                                id="file"
                                accept="image/*"
                                @change="selectPic($event)"
                        >
                        <div class="uploadText second-font-color">图片上传</div>
                    </span>
                    <!--上传后-->
                    <span v-else class="pictureLocation">
                        <!--ul,li标签展示从本地添加的预览图-->
                        <ul v-show="imgSrc_str.length!=0">
                            <li v-for="(item, index) in imgSrc_str"
                                :key="index"
                                class="finishUpload">
                                <img :src="item">
                            </li>
                        </ul>
                    </span>
                </el-card>
                </el-col>
                <!--空白空间-->
                <el-col :span="1">
                </el-col>
                <!--结果判断位置-->
                <el-col :span="11">
                <div class="ansLoctaion" >
                    <div class="info-all">
                        <div class="info-all-text">图片上传数量：
                            <span v-if="dialogVisible">{{total_num}}</span>
                            <span v-else>0</span>
                        </div>
                        <div class="info-all-text">总<flex class="first-font-color">病变</flex>树木：
                            <span v-if="dialogVisible">{{sicktree_num}} 棵</span>
                            <span v-else> 0 棵</span> </div>
                        <div class="info-all-text">总<flex class="first-font-color">病树</flex>占比：
                            <span v-if="dialogVisible">{{sicktree_per}} %</span>
                            <span v-else> 0 %</span></div>
                    </div>
                    <!--病树信息-->
                    <div class="info-details">
                        <span v-show="predictFlag">
                            <div class="details-text">算法识别中...</div>
                        </span>
                        <span v-if="dialogVisible" class="rescureMarginTop">
                            <div class="subTitle"><el-icon class="subTitle-icon"><CaretRight /></el-icon>检测结果</div>
                            <!--检测结果-->
                            <template v-for="num in sicktree_num" :key="num">
                                <div class="image-result">
                                <flex class="image-name-result">{{imgName[0]}}</flex> 是 
                                <flex class="image-ans-result">{{ans[0]}}</flex> 的松树 <!--TODO：不适用于多张图片-->
                                </div>
                            </template>
                        </span>
                        <span v-if="!dialogVisible&&!predictFlag">
                            <div class="details-text">等待图片获取...</div>
                        </span>
                    </div>
                    <!--一群按钮-->
                    <div v-show="dialogVisible"><!--因为显示结果的会导致这部分组件移动...所以让它在没结果时不显示了-->
                        <!--下载按钮-->
                        <flex class="downlowad-group">
                            <el-button type="confirm"><!--下载json格式的结果表格-->
                                下载json格式数据结果
                            </el-button>
                            <el-button type="confirm"><!--下载excel格式的结果表格-->
                                下载excel格式数据结果
                            </el-button>
                        </flex>
                        <!--重新检测-->
                        <flex class="rePredict">
                            <el-button type="rePredict-purple" class="re-predict" @click="handleRePredict">
                                重新检测
                            </el-button>
                        </flex>
                    </div>
                </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let this_key = 0//[用于页面更新]初始页面为0
let dialogVisible = ref(false) //是否获得图片，默认为否
let imgSrc:any[] = [] //图片对象
let imgSrc_str:any[] = [] //web形式的路径，用作预览
let imgName:any[] = [] //图片的原名
let ans:any[] = []
let predictFlag = ref(false) //是否调用模型检测，默认为否
//结果
let sicktree_num = ref(0)
let sicktree_per = ref(0)
let total_num = ref(0)

//使连接的组件触发type为upload的input标签
const callImage = () =>{
    let fileDom: HTMLElement = document.querySelector("#file")! 
    fileDom.click()
}
//选择>=1张图片
const selectPic = (e:any) =>{
    const file = e.target.files[0];
	if (!file.type.includes('image/')) {
		return;
	}
    let file_str =  window.URL.createObjectURL(e.target.files[0])
    imgName.push(e.target.files[0].name)
    imgSrc_str.push(file_str)
	const reader = new FileReader()
    imgSrc.push(file) //在数组中增加
	reader.onload = (event: any) => {
        //将图片转为base64格式
		dialogVisible.value = true
		//TODO：上传到服务器 
	};
	reader.readAsDataURL(file)
    //返回结果
    sicktree_num.value = total_num.value = imgSrc.length
    for(let img of imgSrc){
        ans.push(predict(img))
        predictFlag.value = false
    }
    sicktree_per.value = 100
}
//开始预测
const predict = (image:any) => {
    predictFlag.value = true
    setTimeout(function(){},2289)//延迟两秒
    return '患病'
}
//恢复状态以重新预测
const handleRePredict = () => {
    dialogVisible.value = false
    imgSrc = [] //图片对象
    imgSrc_str = [] //用作预览
    ans = []
    predictFlag = ref(false) //重新为否
    //结果更新
    sicktree_num = ref(0)
    sicktree_per = ref(0)
    total_num = ref(0)
    ///////TODO：页面更新。keychanging没有用啊
    this_key += 1
}
</script>

<style>
@import '@/assets/css/color-light.css';
input{
    display: none;
}  
.uploadLocation{
    width:100%;
    height: calc(72vh);
    border-radius: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}
.uploadIcon{
    font-size: 100px;
    color: #a8a3a3;
    position:relative;
    text-align: center;
    margin-left: 55%;
    margin-top: 8%;
}
.uploadText{
    position:relative;
    font-size:30px;
    text-align: center;
    width: 400px;
    height: 100px;
    margin-left: 17%;
}
.uploadLocation .finishUpload{
    height: 100px;
    width: 100px;
    margin-bottom: 150px;
    margin-left: 150px;
}
.ansLoctaion{
    width:100%;
    height: calc(72vh);
}
.info-all-text{
    font-size: 20px;
    margin-bottom: 10px;
}
.info-all{
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #8a8282;
    margin-bottom: 60px;
    /*TODO：把边缘换掉 */
}
.uploadLocation ul{
    display: flex;
}
.uploadLocation ul li{
    margin-right: 10px;
}
.info-details{
    padding-left: 20px;
    height: 290px;
}
.rescueMarginTop{
    padding-left: 20px;
    height: 320px;
}
.details-text{
    font-size: 20px;
    color:#999;
}
.download-group{
    margin-bottom:calc(10vh);
}
.re-predict{
    margin-left: 150px;
    margin-right: 0px;
}
.el-button--rePredict-purple,
.el-button--rePredict-purple:focus{ /*靠近底部的确认键*/
	background-color: #af4e7c;
	border-color: #af4e7c;
	color:#fff;
}
.el-button--rePredict-purple:hover{
	background-color: #8a325b;
	border-color: #8a325b;
	color: #fff;
}
.el-button--rePredict-purple.is-active,
.el-button--rePredict-purple:active{
	background-color: #721f46;
	border-color: #721f46;
	color: #fff;
}
.subTitle{
    font-size: 24px;
    font-size: bold;
    margin-top: -35px;
    margin-bottom: 30px;
    color: #908989;
}
.subTitle-icon{
    font-size: 24px;
    vertical-align:-15%;
    margin-right: 3px;
    margin-left: -5px;
}
.downlowad-group{
    padding-bottom: -20px;
}
.image-result{
    font-size: 20px;
}
.image-name-result{
    color: #6d706c;
}
.image-ans-result{
    color: #145b91;
}
</style>
