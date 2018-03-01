<template>
    <div>
        <mt-header title="消息" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div style="margin-top:40px">
            <div>
                <mt-navbar v-model="selected">  
                    <mt-tab-item id="1">已读消息</mt-tab-item> 
                    <mt-tab-item id="2">未读消息</mt-tab-item>  
                </mt-navbar>  
            </div>
            <mt-tab-container v-model="selected" swipeable>  
                <mt-tab-container-item id="1">
                    <message-cell :messageItem="hasReadItem"></message-cell>
                </mt-tab-container-item>  
                <mt-tab-container-item id="2"> 
                    <message-cell :messageItem="notReadItem"></message-cell>
                </mt-tab-container-item>  
            </mt-tab-container>  
        </div>
    </div>
</template>
<script>
import request from "@/js/request.js";
import messageCell from './messageCell'
export default {
  data(){
      return{
          selected:"1",
          hasReadItem:[],
          notReadItem:[]
      }
  },
  created(){
      let accesstoken = sessionStorage.getItem("accesstoken")
      request.getMessage(accesstoken).then(res=>{
          this.hasReadItem = res.data.data.has_read_messages;
          this.notReadItem = res.data.data.hasnot_read_messages;
          console.log(res.data.data)
      })
  },
  components:{
      "message-cell":messageCell
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">  
</style>
