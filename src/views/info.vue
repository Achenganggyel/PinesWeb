<template>
    <div class="container infoContainer">
        <div style="padding: 14px;"> 
            <div align="center" class="header-t">
                <span>系统介绍</span>
            </div>
        <div class="text">
        <br><br><br>
        这是一款基于vue+element+flask开发的松树管理系统
        <br><br><br>
        本系统的宗旨是，减轻松树管理的复杂度、增进松材线虫病防治的效率
        <br><br>
        本系统是“松林天眼——您的护林好帮手”
        </div>
        </div>
    </div>
</template>
   
<script lang="ts">
    export default {
    data() {
        return {
        currentDate: new Date()
        };
    }
}
</script>

<style>
.infoContainer{
    height: calc(75vh);
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.text{
    margin-left: 10%;
    margin-right: 10%;
}
</style>
   
