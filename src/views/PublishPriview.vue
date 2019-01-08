<template>
  <div class="FeedDetail">
    <div class="title">{{title}}</div>
    <div class="author">
      <img :src="photo" alt>
      <div class="info">
        <div class="nick">{{nick}}</div>
        <div class="time">{{$formatDate(createTime/1000,9)}}</div>
      </div>
    </div>
    <div class="content" v-html="content"></div>
    <div class="tip">本文和配图均为用户自主上传，不代表平台观点。如有任何问题请与我们联系，我们将及时处理。</div>
    <mt-button class="button" @click.native="publish()">发布</mt-button>
  </div>
</template>
<script>
import getCookie from "../utils/common.js";
export default {
  name: "PublishPriview",
  data() {
    return {
      title: this.$route.query.title || "",
      url: this.$route.query.url || "",
      tags: this.$route.query.tags || [],
      content: "",
      photo: "",
      nick: "",
      createTime: this.$route.query.createTime || ""
    };
  },
  mounted() {
    if (this.$store.state.user.uid) {
      this.photo = this.$store.state.user.photo || "";
      this.nick = this.$store.state.user.nick || "";
    }
    this.requestData()
  },
  methods: {
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/content/preview",
        data: {
          url: this.$route.query.url,
          title: this.$route.query.title
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.data = response.data.data;
            this.content = response.data.data.content;
            this.createTime = response.data.data.createTime
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    publish() {
      var tag = "";
      for (var i = 0; i < this.tags.length; i++) {
        if (i == this.tags.length - 1) {
          tag = tag + this.tags[i].name;
        } else {
          tag = tag + this.tags[i].name + ",";
        }
      }
      this.$axios({
        method: "post",
        url: "/blockchain/v1/content/release",
        data: {
          url: this.url,
          title: this.title,
          tags: tag
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.data = response.data.data;
            this.$router.replace({
              path: "/PublishSuccess",
              query: {
                contentId: response.data.data.contentId,
                title: response.data.data.title,
                coverPid: response.data.data.coverPid
              }
            });
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.FeedDetail {
  background: #ffffff;
  padding-bottom: 30px;
  margin-bottom: 100px;
}
.title {
  padding-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  font-size: 46px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: #051426;
  line-height: 65px;
}
.author {
  margin: 40px 30px 40px 30px;
  display: flex;
  img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: #f4f4f4;
  }
  .info {
    margin-left: 20px;
    .nick {
      font-size: 26px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #051426;
      line-height: 37px;
    }
    .time {
      font-size: 22px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: #a3aeba;
      line-height: 30px;
    }
  }
}
.content {
  margin-left: 30px;
  margin-right: 30px;
  font-size: 34px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #051426;
  line-height: 50px;
}
.tip {
  margin-top: 56px;
  margin-left: 30px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #a3aeba;
  line-height: 40px;
}
.button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #0794fc;
  line-height: 98px;
  text-align: center;
  font-size: 36px;
  color: #fff;
  border-radius: 0;
}
</style>
