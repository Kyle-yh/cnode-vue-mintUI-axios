<template>
    <div>
        <div class="contant fadeInUp animated" v-for="item in listItem" :key="item.id">
            <a class="title" @click="goDetail(item.id)">
                <i class="iconfont icon-top mark" v-show="item.top"></i>
                <i class="iconfont icon-good mark" v-show="item.good"></i>
                <i class="iconfont icon-share mark" v-show="item.tab == 'share'"></i>
                <i class="iconfont icon-ask mark" v-show="item.tab=='ask'"></i>
                <i class="iconfont icon-job mark" v-show="item.tab=='job'"></i>
                {{item.title}}
            </a>
            <br>
            <div>
                <a href="/user/atian25">
                    <img :src="item.author.avatar_url" class="avator" :alt="item.author.loginname"/>
                </a>
                <div>
                    <p style="margin-bottom: 13px;">
                        <span class="loginname">{{item.author.loginname}}</span>
                        <span class="visted-count">{{item.reply_count}}/{{item.visit_count}}</span>
                    </p>
                    <span class="create_at">{{item.create_at|simpleTime}}</span>
                    <span class="last_reply_at">{{item.last_reply_at|simpleTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "article-list",
  data() {
    return {};
  },
  created() {},
  methods: {
    goDetail(id) {
      this.$router.push({
        path: `/detail/${id}`
      });
    }
  },
  props: ["listItem"],
  watch: {}
};
</script>
<style scoped  lang="stylus" rel="stylesheet/stylus">
.contant {
    width: 100%;
    display: inline-block;
    padding: 4px 0px;
    background: #fff;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin: 4px 0;

    .title {
        float: left;
        margin-left: 5px;
        margin-bottom: 5px;
        color: #000000;
        font-size: 1.6rem;
        overflow: hidden;
        width: 100%;
        font-weight: bold;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;

        .mark {
            padding: 2px;
            color: #fff;
            text-align: center;
            border-radius: 5px;
        }

        .icon-top {
            background: red;
            margin-right: 3px;
        }

        .icon-good {
            background: green;
            margin-right: 3px;
        }

        .icon-share {
            background: #ff66ff;
            margin-right: 3px;
        }

        .icon-ask {
            background: blue;
            margin-right: 3px;
        }

        .icon-job {
            background: #00b38a;
            margin-right: 3px;
            font-weight: 500;
        }
    }

    .avator {
        width: 45px;
        float: left;
        border: 1px #eee solid;
        border-radius: 10%;
    }
}

.create_at {
    margin-left: 10px;
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
</style>
