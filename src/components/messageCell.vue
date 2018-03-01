<template>
    <div>
        <div class="nothing" v-if="messageItem.length == 0">暂无消息</div>
        <div class="message-list" v-if="messageItem.length >0">
            <ul>
                <li v-for="item in messageItem" :key="item.id">
                    <a @click="goDetail(item.topic.id)">
                        <div class="title">
                            {{item.topic.title}}
                        </div>
                        <img :src="item.author.avatar_url" :alt="item.author.loginname">
                        <div class="right">
                            <p class="name">
                                <span>{{item.author.loginname}}</span>
                                <span class="time">{{item.create_at|simpleTime}}</span>
                            </p>
                            <div v-html="item.reply.content"></div>
                            
                        </div>
                    </a>
                    <div style="text-align:right" v-if="!item.has_read">
                        <mt-button type="primary" size="small" @click="setReaded(item.id)">设为已读</mt-button>
                    </div>
                    <div style="clear:both"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import request from "@/js/request.js";
import { Toast } from "mint-ui";
export default {
    name:"messageCell",
    data(){
        return{

        }
    },
    methods:{
        goDetail(id){
            this.$router.push({ path:`/detail/${id}`})
        },
        setReaded(id){
            request.setReaded(this.accesstoken,id).then(res=>{
                Toast({
                    message: "设置成功"
                });
                this.$emit('doQuery');
            })
            
        }
    },
    props:['messageItem','accesstoken']
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.nothing
    text-align center
    margin-top 30px
    font-size 16px
    color #999
.message-list
    li
        width 100%
        margin 10px 0
        padding 5px
        box-shadow 0 2px 3px #b2a4a4
        border-top 1px solid #e9e9e9
        box-sizing border-box
        a
            color #000
            .title
                font-size 16px
                font-weight bold
                padding 5px
            img 
                float left
                width 60px
                height 60px
                margin-left: 5px;
            .right
                margin-left 70px
                .name 
                    font-size 15px
                    color #08a00e
                    .time
                        float:right;
                        font-size 12px;
                        color #999
                         
</style>
