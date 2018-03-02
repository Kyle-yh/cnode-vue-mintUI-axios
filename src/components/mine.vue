<template>
    <div>
        <mt-header title="个人中心" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            <mt-button slot="right" @click="exit()"><i class="iconfont icon-tuichu"></i></mt-button>
        </mt-header>
        <div class="mine">
            <img :src="item.avatar_url" :alt="item.loginame">
        </div>
        <div class="mine-loginname">
            {{item.loginname}}
        </div>
        <div class="mine-info">
            <span>积分：{{item.score}}</span>
            <span>注册于：{{item.create_at|simpleTime}}</span>
        </div>
        <div>
            <div>
                <mt-navbar v-model="selected">  
                    <mt-tab-item id="1">您创建的主题</mt-tab-item> 
                    <mt-tab-item id="2">您参与的主题</mt-tab-item>  
                </mt-navbar>  
            </div>
            <mt-tab-container v-model="selected" swipeable>  
                <mt-tab-container-item id="1">
                    <recent-list :recentItem="item.recent_topics" :isEidt="true"/>
                </mt-tab-container-item>  
                <mt-tab-container-item id="2"> 
                    <recent-list :recentItem="item.recent_replies"/>
                </mt-tab-container-item>  
            </mt-tab-container>  
        </div>
    </div>
</template>
<script>
import recentList from './recentList'
import request from "@/js/request.js";
import { MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";
export default {
    name:'mine',
    data(){
        return{
            item:{},
            selected:"1"
        }
    },
    methods:{
        ...mapMutations(["setLogin", "setProfile", "exitUser"]),
        exit() {
            MessageBox.confirm("确定退出帐号?").then(action => {
                sessionStorage.clear();
                this.exitUser();
                this.$router.push({name:'index'});
            });
        }
    },
    created(){
        let profile = JSON.parse(sessionStorage.getItem('profile'));
        request.getProfile(profile.loginname).then(res =>{
            this.item = res.data.data
            console.log(this.item)
        })
    },
    components:{
        'recent-list':recentList
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.mine 
    margin-top 60px;
    text-align center 
    img
        width 80px;
        height 80px;
        border-radius 50%
.mine-loginname
    margin-top 10px
    text-align center
    font-size 16px
    font-weight bold
.mine-info
    margin-top 10px
    margin-bottom 20px
    text-align center
    span 
        margin  0 10px
        color #333
</style>
