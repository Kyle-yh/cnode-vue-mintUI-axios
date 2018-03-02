<template>
    <div>
        <mt-header title="发表主题" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            <mt-button slot="right" @click="save()">保存</mt-button>
        </mt-header>
        <div class="select">
            <span style="font-size:14px;"> 板块：</span>
            <select v-model="selected">  
                <option v-for="item in selectItem" v-bind:value="item.value" :key="item.value">{{item.text}}</option>  
            </select> 
        </div>
        <div class="eidt">
            <span style="font-size:14px;"> 标题：</span>
            <input type="text" v-model="title" placeholder="请输入标题">
        </div>
        <div class="eidt">
            <p><span style="font-size:14px;"> 主题内容：</span></p>
            <p>
                <vue-html5-editor :content="showHtml" :height="500" @change="updateData"></vue-html5-editor>
            </p>
        </div>
    </div>
</template>
<script>
import request from "@/js/request.js";
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            selectItem:[{
                    text:"分享",
                    value:'share'
                },{
                    text:"问答",
                    value:'ask'
                },{
                    text:"招聘",
                    value:'job'
                },{
                    text:"客户端测试",
                    value:'dev'
            }],
            selected:"dev",
            title:'',
            content:'',
        }
    },
    computed: {
        showHtml() {
            return this.content ? this.content
                .replace(this.content ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#39;/g, "\'") : this.content
        }
    },
    created(){
         let id = this.$route.params.id;
         if(id){
             request.getDetail(id).then(res=>{
                 let item = res.data.data;
                 this.selected = item.tab;
                 this.title = item.title;
                 this.content = item.content;
             })
         }
    },
    methods:{
        save(){
            let content = this.content;
            let title = this.title;
            let tab = this.selected;
            if(!title){
                Toast({
                    message: "标题不能为空"
                });
                return;
            }
            if(!content){
                Toast({
                    message: "内容不能为空"
                });
                return;
            }
            let accesstoken = sessionStorage.getItem('accesstoken');
            let id = this.$route.params.id;
            if(!id){
                request.saveTopic(accesstoken,title,tab,content).then(res=>{
                    Toast({
                        message: "创建成功"
                    });
                    console.log(res);
                    setTimeout(() => {
                        this.$router.push({path:`/detail/${res.data.topic_id}`})
                    }, 1000);
                },err=>{
                    
                })
            }else{
                request.eidtTopic(accesstoken,title,tab,content,id).then(res=>{
                    Toast({
                        message: "编辑成功"
                    });
                    console.log(res);
                    setTimeout(() => {
                        this.$router.push({path:`/detail/${res.data.topic_id}`})
                    }, 1000);
                },err=>{
                    
                })
            }
            
        },
        updateData(data){
            this.content = data;
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.select
    margin-top 70px
    margin-left 10px
select{
    border-radius :5px;
    border:1px solid #999
    outline: none;
    width: 50%;
    height: 30px;
    line-height: 40px;
    padding-left: 10px;
}
.eidt
    margin-top 20px
    padding 0 10px
    input 
        border-radius 5px
        border:1px solid #999
        height 30px
        width :70%
        padding  2px 5px
</style>
