<template>
  <div class="InviteFriend">
    <img class="bg" src="~@/assets/image/invite_bg.png">
    <div class="mt-90"></div>
    <div class="card">
      <div class="card1_view">
        <img class="card_img1" src="~@/assets/image/invite_card_img1.png">
        <div class="card1_text">
          <div class="view1">每邀请1位好友</div>
          <div class="view2">
            <span>立得</span>
            <span class="text3">{{invitingWard}}</span>
            <span class="text2">点钻</span>
          </div>
          <div class="view3">后续还有更多关联收益</div>
        </div>
      </div>
      <div class="card2_view">
        <img class="card_img2" src="~@/assets/image/invite_card_img2.png">
        <div class="card2_text">
          <div class="card2_text1">好友可得</div>
          <div class="card2_text2">
            <div class="card2_text3">
              <span>好友可得额外</span>
              <span class="card2_text4">{{invitedWard}}</span>
              <span>点钻</span>
            </div>
            <div class="card2_text5">未邀请用户{{registerWard}}点钻</div>
          </div>
        </div>
      </div>
      <mt-button @click="share()" class="btn">立即邀请</mt-button>
    </div>
    <div class="tip_title">发个朋友圈 躺着把钱赚</div>
    <div class="tip_view">
      <div class="tip1">
        <img src="~@/assets/image/invite_img_1.png" class="tip_img" mode="aspectFit">
        <div class="tip_text">分享邀请链接或任意文章</div>
      </div>
      <div class="tip1">
        <img src="~@/assets/image/invite_img_2.png" class="tip_img" mode="aspectFit">
        <div class="tip_text">好友获得{{invitedWard}}点钻</div>
      </div>
      <div class="tip1">
        <img src="~@/assets/image/invite_img_3.png" class="tip_img" mode="aspectFit">
        <div class="tip_text">奖励到账</div>
      </div>
      <img src="~@/assets/image/icon_dian.png" class="dian1" mode="aspectFit">
      <img src="~@/assets/image/icon_dian.png" class="dian2" mode="aspectFit">
    </div>
    <mt-popup class="dialog_share_mode_box" v-model="isShowShareMode" position="top">
      <img @click="hiddenShareDialog()" src="~@/assets/image/share_mode_img.png">
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "InviteFriend",
  data() {
    return {
      isShowShareMode: false,
      invitingWard: 0,
      invitedWard: 0,
      registerWard: 0
    };
  },
  created() {
    this.requestData();
    this.share();
  },
  methods: {
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/settings/queryRegisterSettings"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.invitingWard = response.data.data.invitingWard;
            this.invitedWard = response.data.data.invitedWard;
            this.registerWard = response.data.data.registerWard;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    share() {
      this.isShowShareMode = true;
      var link =
        location.protocol +
          "//" +
          window.location.host +
          "/dayu/Home?inviter=" +
          this.$store.state.user.uid || "";
      this.$weChat.init({
        link: link,
        title: "送你大鱼股份，天天有分红，快来领取！",
        desc: "来大鱼，看资讯、领股份、天天分红！",
        imgUrl:
          location.protocol +
          "//" +
          window.location.host +
          require("../assets/image/share_index_card.png")
      });
    },
    hiddenShareDialog() {
      this.isShowShareMode = false;
    }
  }
};
</script>
<style lang="less" scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.mt-90 {
  height: 90px;
}
.card {
  position: relative;
  padding-top: 50px;
  margin-left: 30px;
  margin-right: 30px;
  height: 710px;
  background: #fff;
  z-index: 10;
  .card1_view {
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 30px;
    width: 600px;
    height: 327px;
    .card_img1 {
      position: absolute;
      width: 600px;
      height: 327px;
    }
    .card1_text {
      position: absolute;
      width: 597px;
      height: 327px;
      text-align: center;
      .view1 {
        margin-top: 43px;
        font-family: PingFangSC-Regular;
        font-size: 50px;
        color: #fff;
        text-align: center;
      }

      .view2 {
        margin-top: 10px;
        font-size: 80px;
        font-family: PingFangSC-Semibold;
        color: #fff;
        .text2 {
          font-size: 48px;
        }

        .text3 {
          margin-left: 18px;
          margin-right: 5px;
          color: yellow;
        }
      }

      .view3 {
        margin-top: 28px;
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #fff;
        letter-spacing: 2.09px;
      }
    }
  }
  .card2_view {
    margin-left: 48px;
    margin-right: 47px;
    height: 107px;
    .card_img2 {
      position: absolute;
      width: 597px;
      height: 107px;
    }

    .card2_text {
      position: absolute;
      width: 597px;
      height: 107px;
      display: flex;
    }
    .card2_text1 {
      margin-left: 40px;
      margin-top: 15px;
      width: 70px;
      height: 107px;
      font-size: 30px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #fff;
      line-height: 42px;
    }

    .card2_text2 {
      flex: 1;
      margin-left: 30px;
      text-align: center;
    }

    .card2_text3 {
      margin-top: 15px;
      font-size: 30px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #ac8561;
      line-height: 42px;
    }

    .card2_text4 {
      color: #fe6503;
    }

    .card2_text5 {
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ac8561;
      line-height: 37px;
    }
  }
  .btn {
    margin-top: 50px;
    margin-left: 50px;
    margin-right: 50px;
    width: 600px;
    height: 90px;
    background: #ff5130;
    border-radius: 45px;
    font-family: PingFangSC-Regular;
    font-size: 34px;
    color: #fff;
  }
}
.tip_title {
  position: relative;
  height: 106px;
  line-height: 106px;
  text-align: center;
  font-size: 26px;
  color: #b97937;
}
.tip_view {
  position: relative;
  background: #fff;
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 36px;
  padding-bottom: 45px;
  display: flex;
  justify-content: space-between;
  .tip1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    .tip_img {
      width: 84px;
      height: 84px;
    }
    .tip_text {
      margin-top: 36px;
      width: 150px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ac8561;
      text-align: center;
    }
  }
  .dian1 {
    position: absolute;
    width: 53px;
    height: 11px;
    margin-top: 36px;
    margin-left: 200px;
  }
  .dian2 {
    position: absolute;
    width: 53px;
    height: 11px;
    margin-top: 36px;
    margin-left: 445px;
  }
}
.dialog_share_mode_box {
  background: none;
  width: 705px;
  height: 1027px;
}
</style>