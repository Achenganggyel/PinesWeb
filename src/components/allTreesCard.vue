<template><!--患病树占比和天气组件-->
    <el-card 
    shadow="hover" 
    :body-style="{ padding: '0px' }"
    ><!--TODO：添加和风天气api-->
        <div class="card-illPer">
                <div class="percent-num first-font-color">20%</div>
                <div class="percent-text second-font-color">患病松树占比</div>
                <div class="weather">
            </div>
        </div>
    </el-card>

</template>

<script setup lang="ts">
</script>

<style>
@import '@/assets/css/color-light.css';
.background{
    background-image:url(@/assets/img/pines.jpg);
    background-size: 100%;
    background-position: 0%;
    -webkit-filter: blur(50px);
    filter: blur(15px);
    width: 100%;
    border-radius: 10%;
}
.card-illPer{
    background-color:rgba(255, 255, 255, 0.603);
    margin-left:20px;
    margin-top:10px;
}
.percent-num{
    font-size: 80px;
}
.percent-text{
    font-size:30px;
}
</style>