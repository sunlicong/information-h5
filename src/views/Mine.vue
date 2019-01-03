<template>
  <div class="mine">
    <div class="top">
      <img class="top_bg" src="~@/assets/image/bg_mine.png" alt>
      <div class="info">
        <img :src="data.profile.photo" @click="onClick('editInfo')" alt>
        <div class="nick">{{data.profile.nick}}</div>
        <p class="count">
          <span @click="onClick('profile')">动态：{{data.dynamicsCount}}</span>
          <span @click="onClick('follow')">关注：{{data.followedCount}}</span>
          <span @click="onClick('fans')">粉丝：{{data.fansCount}}</span>
        </p>
      </div>
      <div class="card">
        <img class="top_bg" src="~@/assets/image/bg_assets.png" alt>
        <div class="card_info">
          <div @click="onClick('wallet')">
            <p>我的钱包</p>
            <p>
              <span>{{$formatMoney(data.totalToken,1)}}</span>
              <span>点钻</span>
            </p>
          </div>
          <div class="line"></div>
          <div @click="onClick('wallet')">
            <p>累计分红</p>
            <p>
              <span v-if="data.incomeTrxToken>0">{{$formatMoney(data.incomeTrxToken,1)}}TRX</span>
              <span v-if="data.incomeTrxToken>0&&data.totalCommition>0">+</span>
              <span v-if="data.totalCommition>0">{{$formatMoney(data.totalCommition,1)}}元</span>
              <span v-if="data.incomeTrxToken==0&&data.totalCommition==0">0.00</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="item mt_20" @click="onClick('invite')">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_invite.png" alt>
        <div class="margin-left-20">邀请好友得点钻</div>
      </div>
      <div class="right">
        <div class="quan-total color_FF7821">立即邀请</div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div class="inviteView" @click="onClick('inviteList')">
      <div class="inviteItem">
        <p class="inviteText1">邀请奖励</p>
        <p class="inviteText2">{{data.invitation.award}}点钻</p>
      </div>
      <div class="inviteItem inviteLine">
        <p class="inviteText1">我的邀请</p>
        <p class="inviteText2">{{data.invitation.count}}人</p>
      </div>
    </div>
    <div class="item mt_20" @click="onClick('publish')">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_publish.png" alt>
        <div class="margin-left-20">发布作品</div>
      </div>
      <div class="right">
        <div class="quan-total color_FF7821">复制文章链接，一键发布</div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div class="item mt_1" @click="onClick('works')">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_works_manager.png" alt>
        <div class="margin-left-20">作品管理</div>
      </div>
      <div class="right">
        <div class="quan-total color_FF7821"></div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div class="item mt_20" @click="onClick('addressManager')">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_deposit.png" alt>
        <div class="margin-left-20">提现地址管理</div>
      </div>
      <div class="right">
        <div class="quan-total color_FF7821"></div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mine",
  data() {
    return {
      data: {
        dynamicsCount: 0,
        fansCount: 0,
        followedCount: 1,
        invitation: {
          award: 0,
          count: 0
        },
        award: 0,
        count: 0,
        profile: {
          nick: "",
          photo: "",
          desc: ""
        },
        totalCommition: 0,//累计分红 人民币
        incomeTrxToken: 0,//累计分红 TRX
        totalToken: 0,
      }
    };
  },
  created() {
    this.requestData();
  },
  methods: {
    onClick(type) {
      switch (type) {
        case "publish":
          this.$router.push({
            path: "/Publish"
          });
          break;
        case "wallet":
          this.$router.push({
            path: "/Wallet"
          });
          break;
        case "rmb":
          this.$router.push({
            path: "/WalletItemDetail",
            query: {
              formType: 2
            }
          });
          break;
        case "editInfo":
          this.$router.push({
            path: "/EditProfile",
            query: {
              photo: this.data.profile.photo,
              nick: this.data.profile.nick,
              desc: this.data.profile.desc
            }
          });
          break;
        case "profile":
          this.$router.push({
            path: "/Profile",
            query: {
              uid: this.$store.state.user.uid
            }
          });
          break;
        case "fans":
          this.$router.push({
            path: "/MyFans"
          });
          break;
        case "follow":
          this.$router.push({
            path: "/MyAttention"
          });
          break;
        case "works":
          this.$router.push({
            path: "/MyWorks"
          });
          break;
        case "invite":
          this.$router.push({
            path: "/InviteFriend"
          });
          break;
        case "inviteList":
          this.$router.push({
            path: "/inviteList"
          });
          break;
        case "addressManager":
          this.$router.push({
            path: "/CashAddressManager"
          });
          break;
        default:
          break;
      }
    },
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/queryProfileCounts"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.data = response.data.data;
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
.mine {
  padding-bottom: 98px;
}
.top {
  position: relative;
  width: 100%;
  height: 500px;
  .top_bg {
    position: absolute;
    width: 100%;
    height: 430px;
  }
  .info {
    position: absolute;
    width: 100%;
    text-align: center;
    img {
      margin-top: 35px;
      width: 120px;
      height: 120px;
      border-radius: 120px;
      background: #f4f4f4;
    }
    .nick {
      margin-top: 20px;
      font-size: 32px;
      color: #ffffff;
    }
    .count {
      margin-top: 20rpx;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      opacity: 0.6;
      span:first-child {
        margin-right: 40px;
      }
      span:last-child {
        margin-left: 40px;
      }
    }
  }
  .card {
    position: absolute;
    bottom: 0;
    left: 30px;
    right: 30px;
    height: 180px;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .card_info {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      text-align: center;
      div:first-child {
        width: 49%;
        padding-top: 42px;
      }
      div:last-child {
        width: 49%;
        padding-top: 42px;
      }
      p {
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #051426;
        line-height: 40px;
        span:first-child {
          font-size: 32px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          line-height: 56px;
          margin-right: 10px;
        }
      }
      .line {
        margin-top: 30px;
        margin-bottom: 30px;
        width: 2px;
        background: #cddbec;
      }
    }
  }
}
.mt_1 {
  margin-top: 1px;
}
.mt_20 {
  margin-top: 20px;
}
.item {
  width: 100%;
  height: 120px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
  margin-left: 30px;
  .icon {
    width: 33px;
    height: 33px;
  }
  .margin-left-20 {
    margin-left: 20px;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #333;
  }
}
.right {
  display: flex;
  align-items: center;
  margin-right: 30px;
  .quan-total {
    font-size: 28px;
    color: #a3aeba;
  }
  .arrow {
    width: 12px;
    height: 21px;
    margin-left: 12px;
  }
}
.inviteView {
  margin-top: 1px;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  .inviteItem {
    width: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    .inviteText1 {
      margin-top: 12px;
      height: 45px;
      line-height: 45px;
      font-size: 32px;
      color: #051426;
    }
    .inviteText2 {
      margin-top: 5px;
      height: 45px;
      line-height: 45px;
      font-size: 32px;
      color: #fe6503;
    }
  }
  .inviteLine {
    border-left: 1px solid #f4f4f4;
  }
}
</style>
