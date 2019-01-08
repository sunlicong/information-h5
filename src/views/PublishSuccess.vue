<template>
  <div>
    <div class="succsee_box">
      <img src="~@/assets/image/publish_success.png">
      <div class="success_text">文章发布成功</div>
      <div class="share_text">文章阅读量越高，文章奖励越多，</div>
      <div class="share_text">快去分享，获得更高收益吧！~</div>
    </div>
    <div class="btn_box">
      <div @click="share()" class="share_friend">
        <img src="~@/assets/image/share_friend.png">
        <p>分享给朋友</p>
      </div>
      <div @click="share()">
        <img src="~@/assets/image/share_circle.png">
        <p>分享到朋友圈</p>
      </div>
      <div @click="goMine()">返回我的</div>
    </div>
    <mt-popup class="dialog_share_mode_box" v-model="isShowShareMode" position="top">
      <img @click="hiddenShareDialog()" src="~@/assets/image/share_mode_img.png">
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "PublishSuccess",
  data() {
    return {
      isShowShareMode: false,
      contentId: this.$route.query.contentId || "",
      title: this.$route.query.title || "",
      coverPid: this.$route.query.coverPid || ""
    };
  },
  mounted() {
    this.setShareInfo()
  },
  methods: {
    goMine() {
      this.$router.push({
        path: "/Mine"
      });
    },
    /**
     * 显示分享弹框
     */
    share() {
      this.isShowShareMode = true;

    },
    /**
     * 隐藏分享蒙层
     */
    hiddenShareDialog() {
      this.isShowShareMode = false;
    },
    setShareInfo() {
      var covers = this.coverPid.split(',')
      var link = location.protocol + "//" + window.location.host + "/dayu/FeedDetail?contentId="+this.contentId+"&inviter=" + this.$store.state.user.uid || ""
      this.$weChat.init({
        link: link,
        title: this.title,
        desc: '来大鱼，看资讯、领股份、天天分红！',
        imgUrl: covers[0] || location.protocol + "//" + window.location.host+require('../assets/image/share_card.png')
      });
    },
  }
};
</script>
<style lang="less" scoped>
.succsee_box {
  padding-top: 180px;
  padding-bottom: 110px;
  text-align: center;
  .success_text {
    font-size: 34px;
    color: #0794fc;
    margin-bottom: 10px;
    font-weight: 900;
  }
  .share_text {
    font-size: 30px;
    color: #999;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
.btn_box {
  padding: 0 30px;
  div {
    height: 90px;
    border-radius: 100px;
    background: #0794fc;
    margin-bottom: 30px;
    font-size: 34px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 36px;
    height: 35px;
    margin-right: 10px;
  }
  div:nth-child(2) {
    background: #fff;
    background: #ff6700;
    color: #fff;
  }
  div:nth-child(3) {
    background: #fff;
    border: 2px solid #0794fc;
    color: #0794fc;
  }
  .share_friend {
    position: relative;
    button {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
    }
  }
}
.dialog_share_mode_box {
  background: none;
  width: 705px;
  height: 1027px;
}
</style>