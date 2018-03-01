<template>
    <div class="page-navbar">   
        <mt-header title="CnodeJS" fixed>
          <mt-button slot="left" ><i class="iconfont icon-dingwei"></i>{{position}}</mt-button>
            <mt-button slot="right" @click="goLogin()" v-if="!isLogin">登录</mt-button>
            <mt-button slot="right" v-if="isLogin" @click="popupVisible = true"><i class="icon-wode iconfont"></i></mt-button>
        </mt-header>
    <!-- navbar -->  
    <div class="page-part">
        <mt-navbar v-model="selected">  
        <mt-tab-item id="1">全部</mt-tab-item>  
        <mt-tab-item id="2">精华</mt-tab-item>  
        <mt-tab-item id="3">分享</mt-tab-item>  
        <mt-tab-item id="4">问答</mt-tab-item>
        <mt-tab-item id="5">招聘</mt-tab-item>
        </mt-navbar>  
    </div>
  
    <!-- tabcontainer -->  
    <div class="container-padding"></div>
    <mt-tab-container v-model="selected" swipeable>  
        
            <mt-tab-container-item id="1">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                  <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"  infinite-scroll-distance="10" style="width:100%">
                    <article-list :listItem="allItem"/>  
                  </div>
                </div>  
            </mt-tab-container-item>  
            <mt-tab-container-item id="2">  
              <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="goodLoading"  infinite-scroll-distance="10" style="width:100%">
                    <article-list :listItem="goodItem"/>
                  </div>
              </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="3">  
              <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="shareLoading"  infinite-scroll-distance="10" style="width:100%">
                <article-list :listItem="shareItem"/>
                </div>
              </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="4">  
              <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="askloading"  infinite-scroll-distance="10" style="width:100%">
                <article-list :listItem="askItem"/>
                </div>
              </div>
            </mt-tab-container-item> 
            <mt-tab-container-item id="5">  
              <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="jobLoading"  infinite-scroll-distance="10" style="width:100%">
                <article-list :listItem="jobItem"/>
                </div>
              </div>
            </mt-tab-container-item> 
        
    </mt-tab-container>  
    <div class="profile-right">
        <mt-popup v-model="popupVisible" position="right">
            <div class="avatar-img">
                <img :src="profile.avatar_url" alt="">
            </div>
            <div class="avatar-name">
                {{profile.loginname}}
            </div>
            <div class="avatar-list">
                <ul>
                    <li @click="goMine()">个人中心</li>
                    <li @click="goEidt()">发表主题</li>
                    <li @click="goMessage()">消息  <mt-badge type="error" size="small" v-if="count > 0">{{count}}</mt-badge></li>
                    <li @click="goCollect()">我的收藏</li>
                    <li @click="exit()">退出帐号</li>
                </ul>
            </div>
        </mt-popup>
    </div>
  </div>
</template>

<script>
import artileList from "./article";
import request from "@/js/request.js";
import { mapState, mapMutations } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  name: "index",
  data() {
    return {
      selected: "1",
      allItem: {},
      goodItem: {},
      shareItem: {},
      askItem: {},
      jobItem: {},
      tabIndex: 1,
      wrapperHeight: 0,
      loading: true,
      shareLoading:true,
      goodLoading:true,
      askLoading:true,
      jobLoading:true,
      allPage: 2,
      goodPage: 2,
      sharePage: 2,
      askPage: 2,
      jobPage: 2,
      popupVisible: false,
      position:"广州市",
      count:0
    };
  },
  computed: {
    ...mapState(["isLogin", "profile","accesstoken"])
  },
  created() {
    let isLogin = sessionStorage.getItem("isLogin");
    if (!this.isLogin && isLogin) {
      this.setLogin();
      let profile = JSON.parse(sessionStorage.getItem("profile"));
      this.setProfile(profile);
      this.setAccesstoken(sessionStorage.getItem("accesstoken"));
    }
    request.getTopics("all").then(res => {
      this.allItem = res.data.data;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
    request.getPosition().then(res => {
      this.position = res.city
    })
    request.getCount(this.accesstoken).then(res=>{
      this.count = res.data.data;
    })
  },
  mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    ...mapMutations(["setLogin", "setProfile", "exitUser","setAccesstoken"]),
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goCollect(){
      this.$router.push( { name : 'collect' });
    },
    goMine(){
      this.$router.push({ name: 'mine'})
    },
    goMessage(){
      this.$router.push({name:"message"})
    },
    goEidt(){
      this.$router.push({name:"eidt"})
    },
    exit() {
      MessageBox.confirm("确定退出帐号?").then(action => {
        sessionStorage.clear();
        this.exitUser();
        location.reload();
      });
    },
    loadMore() {
      let index = this.tabIndex;
      if (index == 1) {
        this.loading = true;
        request.getTopics("all", this.allPage).then(res => {
          if(JSON.stringify(this.allItem) == "{}"){
            return;
          }
          this.allItem = this.allItem.concat(res.data.data);
          this.allPage++;
          this.loading = false;
        });
      } else if (index == 2) {
        this.goodLoading = true;
        request.getTopics("good", this.goodPage).then(res => {
          this.goodItem = this.goodItem.concat(res.data.data);
          this.goodPage++;
          this.goodLoading = false;
        });
      } else if (index == 3) {
        this.shareLoading = true;
        request.getTopics("share", this.sharePage).then(res => {
          this.shareItem = this.shareItem.concat(res.data.data);
          this.sharePage++;
          this.shareLoading = false;
        });
      } else if (index == 4) {
        this.askLoading = true;
        request.getTopics("ask", this.askPage).then(res => {
          this.askItem = this.askItem.concat(res.data.data);
          this.askPage++;
          this.askLoading = false;
        });
      } else if (index == 5) {
        this.jobLoading = true;
        request.getTopics("job", this.jobPage).then(res => {
          this.jobItem = this.jobItem.concat(res.data.data);
          this.jobPage++;
          this.jobLoading = false;
        });
      }
    }
  },
  watch: {
    selected: function(val, oldVal) {
      //val     切换后 id
      //oldVal  切换前 id
      this.tabIndex = val;
      if (val == 2 && JSON.stringify(this.goodItem) == "{}") {
        request.getTopics("good").then(res => {
          this.goodItem = res.data.data;
          this.goodLoading = false;
        });
      } else if (val == 3 && JSON.stringify(this.shareItem) == "{}") {
        request.getTopics("share").then(res => {
          this.shareItem = res.data.data;
          this.shareLoading = false;
        });
      } else if (val == 4 && JSON.stringify(this.askItem) == "{}") {
        request.getTopics("ask").then(res => {
          this.askItem = res.data.data;
          this.askLoading = false;
        });
      } else if (val == 5 && JSON.stringify(this.jobItem) == "{}") {
        request.getTopics("job").then(res => {
          this.jobItem = res.data.data;
          this.jobLoading = false;
        });
      }
    }
  },
  components: {
    "article-list": artileList
  }
};
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
.page-navbar {
    background: #efeff4;
}

.page-part {
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    z-index: 99;
}

.container-padding {
    padding-top: 90px;
}

.page-loadmore-wrapper {
    overflow: scroll;
}
</style>
