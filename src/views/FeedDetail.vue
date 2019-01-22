<template>
  <div class="FeedDetail">
    <div v-if="show" class="placeholder">
      <img src="~@/assets/image/body-placeholder.png" alt>
    </div>
    <div v-else-if="showNo">
      <div class="non">
        <img src="~@/assets/image/img_non.png">
        <div>文章不存在或已被删除</div>
        <div @click="goPage('home')" class="goMore">去看更多内容</div>
      </div>
    </div>
    <div v-else>
      <div class="detail">
        <div class="title">{{detailData.content.title}}</div>
        <div class="author">
          <img :src="detailData.authorInfo.photo" alt>
          <div class="info" @click="goProfile(detailData.authorInfo.uid)">
            <div class="nick">{{detailData.authorInfo.nick}}</div>
            <div class="time">{{$formatDate(detailData.content.createTime/1000, 9)}}</div>
          </div>
          <mt-button
            v-if="!detailData.attentionStatus"
            @click.stop="relation(detailData.authorInfo.uid)"
            class="attitude"
          >关注</mt-button>
          <mt-button
            v-if="detailData.attentionStatus"
            @click.stop="deleteRelation(detailData.authorInfo.uid)"
            class="attitude_n"
          >已关注</mt-button>
        </div>
        <div class="content" v-html="detailData.content.content"></div>
        <div class="tip">本文和配图均为用户自主上传，不代表平台观点。如有任何问题请与我们联系，我们将及时处理。</div>
        <div class="browser">阅读 {{detailData.browserCount}}</div>
      </div>
      <div class="praise">
        <img class="praise_cover" :src="detailData.authorInfo.photo">
        <div class="praise_text">喜欢就给我赞赏吧</div>
        <mt-button class="praise_push" @click="pay()">赞赏</mt-button>
        <div class="praise_count">{{detailData.investTotalCount}} 人赞赏</div>
        <div class="likeList one_line">
          <div class="likeItme" v-for="item in detailData.investUserProfiles">
            <img class="like_cover" :src="item.photo">
          </div>
        </div>
      </div>
      <div class="opt">
        <div class="opt_item" @click="like(detailData.attitudeStatus?0:1)">
          <div class="relative_view">
            <div
              v-if="detailData.attitudeOptCount"
              class="attitudeCount"
            >{{detailData.attitudeOptCount}}</div>
            <img
              v-if="detailData.attitudeStatus"
              src="~@/assets/image/icon_praise_seleced.png"
              class="icon_opt"
            >
            <img v-else src="~@/assets/image/icon_praise_non.png" class="icon_opt">
          </div>
          <div :class="detailData.attitudeStatus?'color0794FC':''">{{detailData.attitudeLikeCount}}</div>
        </div>
        <button class="opt_item opt_item_share" @click="showShare()">
          <img src="~@/assets/image/icon_share.png" class="icon_opt">
          <div>分享</div>
        </button>
      </div>
    </div>
    <div v-if="!showNo" class="bottom">
      <div @click="goPage('home')">
        <img src="~@/assets/image/icon_back_home.png">
        <span>回首页</span>
      </div>
      <div class="icon_like" @click="like(detailData.attitudeStatus?0:1)">
        <!-- <div class="count_view"> -->
        <div
          v-if="detailData.attitudeOptCount"
          class="attitudeCount"
        >{{detailData.attitudeOptCount}}</div>
        <!-- </div> -->
        <img v-if="detailData.attitudeStatus" src="~@/assets/image/icon_praise_seleced.png">
        <img v-else src="~@/assets/image/icon_praise_non.png">
        <span>{{detailData.attitudeLikeCount}}</span>
      </div>
      <div @click="showShare">
        <img src="~@/assets/image/icon_share.png">
        <span>分享</span>
      </div>
    </div>
    <div class="menu">
      <img
        class="refresh"
        :class="startShake?'swing':'swing_end'"
        @click="goPage('MyMining')"
        src="~@/assets/image/icon_index_mining.png"
      >
      <img class="mining" @click="pay()" src="~@/assets/image/icon_send_pay.png">
    </div>
    <mt-popup class="dialog_box" v-model="popupVisible" position="bottom">
      <div class="top_tip">赞赏者得产出点钻的60%，更有机会获得每周奖励池</div>
      <div class="box_list">
        <div class="card" v-for="(item,index) in candyList" @click="selectCandy(index)">
          <div class="card_view">
            <img class="bg" :class="selectCandyIndex==index?'select':''" :src="getCandyUrl(index)">
          </div>
          <div class="candyCount">{{item.candyCount}}糖果</div>
        </div>
      </div>
      <div class="share_bottom">
        <div class="left">
          <div class="balance" @click="goBuyCandy()">糖果{{candyCount}}</div>
          <div class="buy" @click="goBuyCandy()">
            <div class>购买</div>
            <img class="arrow" src="../assets/image/arrows_right.png">
          </div>
        </div>
        <mt-button class="send" @click="sendCandy()">赠送</mt-button>
      </div>
    </mt-popup>
    <NewPointsDlg :show="showPointsPop" :pints="awardTokenAmount" @share="share"></NewPointsDlg>
    <SharePointsDlg :show="sharePointsPop" :pints="5"></SharePointsDlg>
    <mt-popup class="dialog_share_mode_box" v-model="isShowShareMode" position="top">
      <img @click="hiddenShareDialog()" src="~@/assets/image/share_mode_img.png">
    </mt-popup>
  </div>
</template>
<script>
import SharePointsDlg from "@/components/SharePointsDlg.vue";
import NewPointsDlg from "@/components/NewPointsDlg.vue";
export default {
  name: "FeedDetail",
  components: {
    NewPointsDlg,
    SharePointsDlg
  },
  data() {
    return {
      contentId: this.$route.query.contentId,
      awardTokenAmount: 0, // 奖励金额
      showPointsPop: false, // 注册奖励弹框
      sharePointsPop: false, //分享成功获得奖励弹框
      show: true, //页面正文过渡的显示
      showNo: false, //文章被删除或不存在
      isShowShareMode: false,
      detailData: {
        authorInfo: {
          photo: "",
          nick: ""
        },
        content: {
          title: "",
          createTime: ""
        }
      },
      startShake: false, //设置晃动小动画
      candyList: [], //糖果列表
      candyCount: 0, //糖果数量
      selectCandyIndex: 0, //当前选中糖果卡片
      popupVisible: false, //赞赏弹框
      model: false
    };
  },
  created() {
    this.awardTokenAmount = this.$store.state.awardTokenAmount;
    this.requestData();
  },
  methods: {
    /**
     * 页面跳
     */
    goPage(type) {
      switch (type) {
        case "home":
          this.$router.push({
            path: "/Home"
          });
          break;
        case "MyMining":
          this.$router.push({
            path: "/MyMining"
          });
          break;
        default:
          break;
      }
    },
    /**
     * 个人页
     */
    goProfile(uid) {
      this.$router.push({
        path: "/Profile",
        query: {
          uid: uid
        }
      });
    },
    /**
     * 去购买糖果
     */
    goBuyCandy() {
      this.$router.push({
        path: "/PayCandyCard"
      });
    },
    /**
     * 显示分享弹框
     */
    showShare() {
      this.isShowShareMode = true;
    },
    /**
     * 注册奖励弹完之后 回调这个分享
     */
    share() {
      this.showPointsPop = false;
      this.isShowShareMode = true;
      this.setShareInfo(() => {
        this.isShowShareMode = false;
        this.getShareGetDb();
        var that = this;
        this.setShareInfo(function() {
          that.shareSuccess();
        });
      });
    },
    /**
     * 分享成功获取 分享db
     */
    getShareGetDb() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/shareGetDb"
      }).then(response => {
        if (response.data.status) {
          this.sharePointsPop = true;
        }
      });
    },
    setShareInfo(success) {
      var covers = this.detailData.content.coverPid.split(",");
      this.$weChat.init({
        link: window.location.href + "&inviter=" + this.$store.state.user.uid,
        title: this.detailData.content.title,
        desc: "来大鱼，看资讯、领股份、天天分红！",
        imgUrl:
          covers[0] ||
          location.protocol +
            "//" +
            window.location.host +
            require("../assets/image/share_card.png"),
        success: success || function() {}
      });
    },
    shareSuccess() {
      this.$axios({
        method: "post",
        url: "/blockchain/v1/content/share",
        data: {
          contentId: this.contentId
        }
      }).then(response => {
        if (response.data.status) {
          this.$ui.Toast("分享成功");
          this.detailData.attitudeOptCount = response.data.data.remainedCount;
        }
      });
    },
    /**
     * 隐藏分享蒙层
     */
    hiddenShareDialog() {
      this.isShowShareMode = false;
    },
    /**
     * 获取详情信息
     */
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/content/detail",
        data: {
          contentId: this.contentId,
          forwardUid: ""
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.show = false;
            this.detailData = response.data.data;
            if (this.awardTokenAmount) {
              this.showPointsPop = true;
            }
            var that = this;
            this.setShareInfo(function() {
              that.shareSuccess();
            });
          } else if (response.data.code == 50003) {
            this.show = false;
            this.showNo = true;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 点赞
     */
    like(opt) {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/content/like",
        data: {
          contentId: this.contentId,
          opt: opt
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            if (opt == 1) {
              this.$ui.Toast(
                "点赞成功，还剩" + response.data.data.remainedCount + "次点赞"
              );
              this.detailData.attitudeStatus = 1;
              this.detailData.attitudeLikeCount =
                this.detailData.attitudeLikeCount + 1;
              this.detailData.attitudeOptCount =
                response.data.data.remainedCount;
              this.startShake = true;
              setTimeout(response => {
                this.startShake = false;
              }, 1000);
            } else {
              this.detailData.attitudeStatus = 0;
              this.detailData.attitudeLikeCount =
                this.detailData.attitudeLikeCount - 1;
              this.detailData.attitudeOptCount =
                response.data.data.remainedCount;
            }
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 获取可选赞赏列表
     */
    pay() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/candy/payCandyList"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.popupVisible = true;
            this.candyCount = response.data.data.candyCount;
            this.candyList = response.data.data.candyPayList;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 获取
     */
    getCandyUrl(index) {
      var src = "";
      if (index < 3) {
        src = require("../assets/image/" + (index + 1) + "_candy.png");
      } else {
        src = require("../assets/image/4_candy.png");
      }
      return src;
    },
    /**
     * 选择赞赏金额
     */
    selectCandy(index) {
      this.selectCandyIndex = index;
    },
    /**
     * 赠送
     */
    sendCandy() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      var candyCount = this.candyList[this.selectCandyIndex].candyCount || 0;
      this.$axios({
        method: "post",
        url: "/blockchain/v1/invest/rewardCandy",
        data: {
          contentId: this.contentId,
          candyCount: candyCount
        }
      })
        .then(response => {
          this.popupVisible = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("赞赏成功");
            var ishaveMe = false; //判断当前列表是当前用户是否赞赏过。如果赞赏过就不往列表里手动添加了
            var investUserProfiles = this.detailData.investUserProfiles || [];
            for (var i = 0; i < investUserProfiles.length; i++) {
              if (investUserProfiles[i].uid == app.globalData.userInfo.uid) {
                ishaveMe = true;
              }
            }
            if (!ishaveMe) {
              this.detailData.investTotalCount += 1;
              var uid = this.$store.state.user.uid || 0;
              var photo = this.$store.state.user.photo || 0;
              this.detailData.investUserProfiles = investUserProfiles
                ? investUserProfiles.concat([
                    {
                      photo: photo,
                      uid: uid
                    }
                  ])
                : [
                    {
                      photo: photo,
                      uid: auid
                    }
                  ];
            }
          } else if (response.data.code == 30101) {
            this.showToPayDialog();
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 糖果不足弹框
     */
    showToPayDialog() {
      this.$ui
        .MessageBox({
          title: "提示",
          message: "糖果不足，去购买糖果卡？",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "去购买",
          cancelButtonText: "取消"
        })
        .then(action => {
          if (action == "confirm") {
            this.goBuyCandy();
          }
        });
    },
    /**
     * 关注
     */
    relation(uid) {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/user/relation/add",
        data: {
          mainUserId: uid
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("已关注");
            this.detailData.attentionStatus = 1;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 取消关注
     */
    deleteRelation(uid) {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/user/relation/delete",
        data: {
          mainUserId: uid
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("已取消关注");
            this.detailData.attentionStatus = 0;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    }
  }
};
</script>
<style lang="less">
.placeholder {
  width: 100%;
  height: 1024px;
}
.FeedDetail {
  padding-bottom: 30px;
  margin-bottom: 100px;
}
.detail {
  background: #ffffff;
  padding-bottom: 40px;
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
    flex: 1;
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
  .attitude {
    width: 100px;
    height: 50px;
    line-height: 50px;
    background: #0794fc;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #fff;
    text-align: center;
    padding: 0;
  }
  .attitude_n {
    width: 100px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #a3aeba;
    border-radius: 4px;
    background: #fff;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #a3aeba;
    text-align: center;
    padding: 0;
  }
}
.content {
  margin-left: 30px;
  margin-right: 30px;
  font-size: 38px;
  line-height: 53px;
  color: #051426;
  overflow: hidden;
  strong {
    font-size: 38px;
  }
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
.browser {
  margin-top: 40px;
  margin-left: 30px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #a3aeba;
  line-height: 40px;
}
.bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: #ffffff;
  display: flex;
  align-items: center;
}
.bottom div {
  flex: 1;
  text-align: center;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #a3aeba;
  line-height: 40px;
  img {
    width: 32px;
    height: 32px;
  }
  span{
    margin-left: 10px;
  }
}
.bottom .icon_like{
  // margin-top: -20px;
  height: 100px;
  align-items: center;
}
.bottom .attitudeCount {
  margin-left: 70px;
  margin-top: 5px;
  width: 43px;
  height: 26px;
  background: #0794fc;
  border-radius: 15px 0px 15px 0px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  line-height: 26px;
}
.praise {
  margin-top: 20px;
  background: #fff;
  text-align: center;
  padding-bottom: 50px;
  .praise_cover {
    margin-top: 30px;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: #f4f4f4;
  }
  .praise_text {
    margin-top: 20px;
    font-size: 24px;
  }
  .praise_push {
    margin-top: 30px;
    width: 260px;
    height: 88px;
    background: #0794fc;
    border-radius: 8px;
    font-size: 36px;
    color: #fff;
  }
  .praise_count {
    margin-top: 20px;
    font-size: 24px;
    color: #a3aeba;
  }
  .likeList {
    margin-top: 10px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    .likeItme {
      margin-left: 10px;
      margin-right: 10px;
    }
    .like_cover {
      width: 60px;
      height: 60px;
      border-radius: 60px;
      background: #f4f4f4;
    }
  }
}
.opt {
  margin-top: 20px;
  width: 100%;
  height: 120px;
  display: flex;
  background: #fff;
  align-items: center;
  .opt_item {
    width: 50%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #a3aeba;
  }
  .relative_view {
    height: 56px;
    margin-top: -28px;
    padding-top: 10px;
    .attitudeCount {
      position: absolute;
      margin-top: -20px;
      margin-left: -20px;
      width: 43px;
      height: 26px;
      background: #0794fc;
      border-radius: 15px 0px 15px 0px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      line-height: 26px;
    }
  }
  .icon_opt {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .opt_item_share {
    background: #fff;
    border: 0;
  }

  .opt_item_share::after {
    border: 0;
  }
}
.menu {
  position: fixed;
  right: 30px;
  bottom: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.menu .refresh {
  width: 95px;
  height: 95px;
  margin-bottom: 12px;
}
.menu .mining {
  width: 95px;
  height: 95px;
}
.dialog_box {
  width: 100%;
  height: 430px;
  background: #ffffff;
  .top_tip{
    margin-top: 30px;
    margin-left: 30px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#2D3232;
    line-height:42px;
  }
  .box_list {
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: 20px;
    width: 100%;
    height: 192px;
    white-space: nowrap;
    .card {
      margin-left: 10px;
      width: 165px;
      height: 192px;
      display: inline-block;
      position: relative;
      .card_view {
        width: 165px;
        height: 192px;
        overflow: hidden;
      }
      .bg {
        width: 165px;
        height: 192px;
        position: absolute;
      }
      .select {
        border-radius: 8px;
        border: 2px solid red;
      }
      .candyCount {
        position: absolute;
        bottom: 0;
        width: 165px;
        text-align: center;
        color: #fff;
        font-size: 26px;
        line-height: 50px;
      }
    }
  }
  .share_bottom {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f4f4f4;
    .left {
      display: flex;
      align-items: center;
    }
    .balance {
      margin-left: 30px;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #2d3232;
    }

    .buy {
      margin-left: 30px;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #0794fc;
      display: flex;
      align-items: center;
    }

    .arrow {
      width: 12px;
      height: 21px;
      margin-left: 12px;
    }

    .send {
      float: right;
      margin-right: 30px;
      width: 171px;
      height: 60px;
      line-height: 60px;
      background: #0794fc;
      border-radius: 8px;
      font-family: PingFangSC-Regular;
      font-size: 34px;
      color: #fff;
    }
  }
}
.swing {
  animation: swing 0.5s linear infinite;
}
.swing_end {
  animation: none;
}
@keyframes swing {
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
.dialog_share_mode_box {
  background: none;
  width: 705px;
  height: 1027px;
}
.non {
  margin-top: 250px;
  text-align: center;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #9b9b9b;
  img {
    width: 290px;
    height: 396px;
  }
  .goMore {
    margin-left: 30px;
    margin-right: 30px;
    height: 90px;
    border-radius: 45px;
    border: 2px solid #0794fc;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #0794fc;
    line-height: 90px;
    text-align: center;
    margin-top: 121px;
  }
}
</style>
