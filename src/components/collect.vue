<template>
    <div>
        <mt-header title="我的收藏" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="container-padding"></div>
        <article-list :listItem="item" :isCollect="true"/>
    </div>
</template>
<script>
import artileList from "./article";
import request from "@/js/request.js";
export default {
    data(){
        return{
            item:[]
        }
    },
    methods:{
        doQuery(){
            let profile = JSON.parse(sessionStorage.getItem('profile'))
            request.getCollect(profile.loginname).then(res=>{
                this.item = res.data.data
            })
        }
    },
    created(){
        this.doQuery();
    },
    components: {
        "article-list": artileList
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.container-padding {
    padding-top: 50px;
}
</style>
