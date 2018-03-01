<template>
  <div>
      <mt-header title="用户登录" fixed>
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="submit">
        <input type="password" id="submit-token" placeholder="请输入access_token" class="ant-input" value="0356a904-b9cf-4ab0-9a03-2cac15a9e1b" v-model="accesstoken">
        <br>
        <mt-button type="primary" size="normal" @click.native="login()">登录</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import request from "@/js/request.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      accesstoken: ""
    };
  },
  created() {
    this.accesstoken = "49672187-28e4-4f12-88e8-9f9407704464";
  },
  methods: {
    ...mapMutations(["setLogin", "setProfile", "setAccesstoken"]),
    login() {
      if (!this.accesstoken) {
        Toast({
          message: "请输入accesstoken"
        });
        return;
      } else {
        request.login(this.accesstoken).then(
          res => {
            Toast({
              message: "登录成功"
            });
            this.setLogin();
            this.setProfile(res.data);
            this.setAccesstoken(this.accesstoken);
            sessionStorage.setItem("accesstoken", this.accesstoken);
            sessionStorage.setItem("profile", JSON.stringify(res.data));
            sessionStorage.setItem("isLogin", true);
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.submit {
    width: 100%;
    text-align: center;
    padding-top: 200px;
    margin: auto;
}

#submit-token {
    margin: 5px 0;
    height: 40px;
    font-size: 1.6rem;
    padding: 0 10px;
    width: 50%;
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
</style>
