<template>
    <div>
        <mt-header :title="item.title" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="topic-content">
            <div class="goLogin" @click="goLogin()" v-if="!isLogin">
                您还未登录，请点击<a>登录</a>  
            </div>
            <div>
                <a href="">
                    <img :src="imgUrl" class="avator" :alt="loginname"/>
                </a>
                <p style="margin-bottom: 13px;">
                    <span class="loginname">{{loginname}}</span>
                    <span class="visted-count">阅读:{{item.visit_count}}</span>
                </p>
                <span style="margin-left: 10px;">{{item.create_at|simpleTime}}</span>
                <span class="last_reply_at">{{item.last_reply_at|simpleTime}}</span>
            </div>
        </div>
        <h2 class="topic-title">{{item.title}}</h2>
        <div v-html="showHtml"></div>
        <div class="height20"></div>
        <div class="collect">
            <mt-button type="danger" @click.native="collect(item.is_collect)">{{item.is_collect ? '已收藏' : '收藏'}}</mt-button>
        </div>
        <div style="text-align:right">
            <textarea minlength="8" class="ant-input" style="height: 60px;" v-model="content"> </textarea>
            <div style="margin:5px">
                <mt-button type="primary" size="small" @click.native="save()">评论</mt-button>
            </div>
        </div>
        <div class="topic-reply-count">共<span style="color: rgb(16, 142, 233);">{{item.reply_count}}</span>条回复</div>
        <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"  infinite-scroll-distance="10" style="width:100%">
            <div class="anwser" v-for="(repliesItem,index) in replies" :key="repliesItem.id" v-if="index < floor">
                <a href="/user/atian25">
                    <img :src="repliesItem.author.avatar_url" class="avator" :alt="repliesItem.author.loginname">
                </a>
                <span class="loginname">
                    {{repliesItem.author.loginname}} 
                    <span v-if="repliesItem.author.loginname == loginname">楼主</span>
                </span>
                <span style="font-size: 1.3rem;">{{repliesItem.create_at|simpleTime}}</span>
                <span style="font-size: 1.3rem; float: right; margin-right: 8px;">{{index + 1}}楼</span>
                <div v-html="repliesItem.content"></div>
                <div style="text-align: right;">
                    <div style="margin-bottom:10px">
                        <span style="margin-right:10px" @click="thumbUp(index,repliesItem.id)" :class="{'up':repliesItem.action == 'up'}">
                            <i class="iconfont icon-dianzan" style="color: rgba(0, 0, 0); font-weight: 400;">
                                <span class="icon-dianzan-num">{{repliesItem.ups.length}}</span>
                            </i>
                        </span>
                        <span @click="showText(index)">
                            <i class="iconfont icon-huifu"></i>
                        </span>
                    </div>
                    <div v-show="repliesItem.showText">
                        <textarea minlength="8" class="ant-input" style="height: 60px;" :placeholder="'@'+repliesItem.author.loginname" v-model="repliesItem.textContent"> </textarea>
                        <div style="margin:5px">
                            <mt-button type="primary" size="small" @click.native="saveReplies(repliesItem.author.loginname,repliesItem.id,index)">回复</mt-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import request from "@/js/request.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      item: {},
      imgUrl: "",
      loginname: "",
      replies: [],
      floor: 0,
      loading: false,
      content:''
    };
  },
  computed: {
    ...mapState(["isLogin", "profile","accesstoken"]),
    showHtml() {
      return this.item.content ? this.item.content
        .replace(this.item.content ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "\'") : this.item.content
    }
  },
  methods: {
    ...mapMutations(["setLogin", "setProfile", "exitUser","setAccesstoken"]),
    loadMore() {
      this.loading = true;
      this.floor += 10;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    collect(is_collect){
        if(!this.isLogin){
            this.goLogin();
            return;
        }
        if(!is_collect){
            request.collect(this.accesstoken,this.item.id).then(res=>{
                this.item.is_collect = true;
                Toast({
                    message: "收藏成功"
                });
            })
        }else{
            request.deCollect(this.accesstoken,this.item.id).then(res=>{
                this.item.is_collect = false;
                Toast({
                    message: "取消收藏成功"
                });
            })
        }
    },
    showText(index) {
        if(!this.isLogin){
            this.goLogin();
        }
      let arr = this.replies[index];
      arr.showText = !arr.showText;
      this.$set(this.replies, index, arr);
    },
    thumbUp(index,id){
        if(!this.isLogin){
            this.goLogin();
            return;
        }
        if(this.replies[index].author.loginname == this.profile.loginname){
            Toast({
              message: "不能帮自己点赞"
            });
            return;
        }
        request.thumbUp(this.accesstoken,id).then((res)=>{
            let action = res.data.action;
            let arr = this.replies[index];
            arr.action = action;
            if(action == 'up'){
                arr.ups.push(this.item.author_id);
            }else{
                arr.ups.pop();
            }
            this.$set(this.replies, index, arr);
        })
    },
    goLogin(){
        this.$router.push({name:'login'})
    },
    save(){
        if(!this.isLogin){
            this.goLogin();
            return;
        }
        if(!this.content){
            Toast({
              message: "请输入评论内容"
            });
            return;
        }
        request.replies(this.item.id,this.accesstoken,this.content).then((res)=>{
            this.content = '';
            Toast({
              message: "评论成功"
            });
            this.doQuery();
        })
    },
    saveReplies(name,id,index){
        if(!this.replies[index].textContent){
            Toast({
              message: "请输入评论内容"
            });
            return;
        }
        let content = '@' + name + ' ' + this.replies[index].textContent
        request.replies(this.item.id,this.accesstoken,content,id).then(()=>{
            let arr = this.replies[index];
            arr.showText = !arr.showText;
            arr.textContent = '';
            this.$set(this.replies, index, arr);
            Toast({
              message: "评论成功"
            });
            let id = this.$route.params.id;
            this.doQuery();
        });   
    },
    doQuery(){
        let id = this.$route.params.id;
        request.getDetail(id).then(res => {
            this.item = res.data.data;
            this.imgUrl = this.item.author.avatar_url;
            this.loginname = this.item.author.loginname;
            this.replies = this.item.replies;
            console.log(this.item)
            if(this.isLogin){
                for (let i = 0; i < this.replies.length; i++) {
                    this.replies[i].showText = false;
                    this.replies[i].textContent = '';
                    for(let z = 0;z < this.replies[i].ups.length;z++){
                        if(this.replies[i].ups[z] == this.profile.id){
                            this.replies[i].action = 'up';
                        }else{
                            this.replies[i].action = 'down';
                        }
                    }
                }
                request.getCollect(this.profile.loginname).then(res=>{
                    let arr = res.data.data;
                    for(let i = 0;i<arr.length;i++){
                        if(arr[i].id == this.item.id){
                            this.item.is_collect = true;
                            return;
                        }
                    }
                })
            }
            
        });
    }
  },
  created() {
    let isLogin = sessionStorage.getItem("isLogin");
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    if (!this.isLogin && isLogin) {
        this.setLogin();
        this.setProfile(profile);
        this.setAccesstoken(sessionStorage.getItem("accesstoken"));
    }
    this.doQuery();
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.topic-content {
    border-bottom: 1px #ccc dashed;
    margin-top: 55px;
    padding-bottom: 10px;
    display: inline-block;
    width: 100%;

    .goLogin{
        text-align:center;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 10px;
        padding-bottom: 10px;
    }

}

.avator {
    width: 45px;
    float: left;
    border: 1px #eee solid;
    border-radius: 10%;
    margin-left 5px
}

.last_reply_at {
    float: right;
    margin-right: 10px;
    font-size: 1.2rem;
}

.loginname {
    color: #7ab005;
    cursor: pointer;
    margin: 0 10px;
}

.visted-count {
    float: right;
    margin-right: 10px;
}

.topic-title {
    padding: 10px;
    font-weight: bolder;
    color: #000000;
    background: #eee;
}

.topic-reply-count {
    background: #eee;
    height: 20px;
    padding: 10px;
    font-size: 1.4rem;
}

.icon-dianzan-num {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
}

.icon-huifu {
    margin-right: 8px;
    cursor: pointer;
}

.ant-input {
    position: relative;
    display: inline-block;
    padding: 4px 7px;
    width: 100%;
    height: 28px;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}

textarea.ant-input {
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
    -webkit-transition: all 0.3s, height 0s;
    -o-transition: all 0.3s, height 0s;
    transition: all 0.3s, height 0s;
}
textarea{
    box-sizing:border-box
}
.height20{
    height:20px;
    background :#eee;
    width :100%;
}
.up,.up span {
    color:#ff1c1c
}

.collect
    text-align center
    margin 10px 0
</style>
