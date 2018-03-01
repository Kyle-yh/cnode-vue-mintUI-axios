<template>
    <div>
        <mt-header title="消息" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            <mt-button slot="right" v-show="isShow" @click="setAllReaded()">全部设为已读</mt-button>
        </mt-header>
        <div style="margin-top:40px">
            <div>
                <mt-navbar v-model="selected">  
                    <mt-tab-item id="1">已读消息</mt-tab-item> 
                    <mt-tab-item id="2">未读消息 <mt-badge type="error" size="small" v-if="count > 0">{{count}}</mt-badge></mt-tab-item>  
                </mt-navbar>  
            </div>
            <mt-tab-container v-model="selected" swipeable>  
                <mt-tab-container-item id="1">
                    <message-cell :messageItem="hasReadItem" :accesstoken="accesstoken"></message-cell>
                </mt-tab-container-item>  
                <mt-tab-container-item id="2"> 
                    <message-cell @doQuery="doQuery" :messageItem="notReadItem" :accesstoken="accesstoken"></message-cell>
                </mt-tab-container-item>  
            </mt-tab-container>  
        </div>
    </div>
</template>
<script>
import request from "@/js/request.js";
import messageCell from './messageCell'
import { MessageBox,Toast } from "mint-ui";
import { mapState, mapMutations } from "vuex";
export default {
  data(){
      return{
          selected:"1",
          hasReadItem:[],
          notReadItem:[],
          count:0,
          isShow:false,
      }
  },
  computed: {
    ...mapState(["accesstoken"])
  },
  methods:{
    ...mapMutations(["setAccesstoken"]),
    setAllReaded(){
        MessageBox.confirm("确定全部设为已读吗?").then(action => {
            request.setAllReaded(this.accesstoken).then(res=>{
                Toast({
                    message: "设置成功"
                });
                this.doQuery();
            });
        })
    },
    doQuery(){
        let accesstoken = sessionStorage.getItem("accesstoken");
        this.setAccesstoken(sessionStorage.getItem("accesstoken"));
        request.getMessage(accesstoken).then(res=>{
            this.hasReadItem = res.data.data.has_read_messages;
            this.notReadItem = res.data.data.hasnot_read_messages;
            console.log(res.data.data)
        })
        request.getCount(accesstoken).then(res=>{
            this.count = res.data.data;
        })
    }
  },
  created(){
      this.doQuery()
  },
  watch: {
      selected:function(val,oldVal){
          if(val == 2){
              this.isShow = true;
          }else{
              this.isShow = false;
          }
      }
  },
  components:{
      "message-cell":messageCell
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">  
</style>
