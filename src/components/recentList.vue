<template>
    <div>
        <div class="nothing" v-if="recentItem && recentItem.length == 0">
            暂无内容
        </div>
        <ul class="recent" v-if="recentItem && recentItem.length > 0">
            <li v-for="item in recentItem" :key="item.id">
                <a @click="goDetail(item.id)">
                    <img :src="item.author.avatar_url" :alt="item.author.loginname">
                    <div class="content">
                        <p class="title">{{item.title}}</p>
                        <p class="name">{{item.author.loginname}}</p>
                    </div>
                    <div style="clear:both">

                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'recentList',
    data(){
        return{

        }
    },
    methods: {
        goDetail(id) {
            this.$router.push({
                path: `/detail/${id}`
            });
        }
    },
    props:['recentItem']
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.recent
    li
        margin 10px 0
        padding 5px 0
        border-top 1px solid #ccc
        border-bottom 1px solid #ccc
        img 
            width 50px
            height 50px
            float left
            margin-left 5px
        .content
            margin-left 60px
            .title
                font-size 16px
                font-weight bold
                white-space: nowrap;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                overflow hidden
                color #000
            .name
                margin-top 10px
                color #26a2ff
.nothing
    text-align center
    margin-top 30px
    font-size 16px
    color #999
</style>
