<template>
    <div>
        <div class="nothing" v-if="messageItem.length == 0">暂无消息</div>
        <div class="message-list" v-if="messageItem.length >0">
            <ul>
                <li v-for="item in messageItem" :key="item.id">
                    <a href="">
                        <img :src="item.author.avatar_url" :alt="item.author.loginname">
                        <div class="right">
                            <p class="name">
                                <span>{{item.author.loginname}}</span>
                                <span class="time">{{item.create_at|simpleTime}}</span>
                            </p>
                            <div v-html="item.reply.content"></div>
                        </div>
                    </a>
                    <div style="clear:both"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"messageCell",
    data(){
        return{

        }
    },
    props:['messageItem']
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
            img 
                float left
                width 60px
                height 60px
            .right
                margin-left 70px
                .name 
                    font-size 15px
                    .time
                        float:right;
                        font-size 12px;
                        color #999
</style>
