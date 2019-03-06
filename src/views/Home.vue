<template>
  <div class="home">
    <mt-swipe :auto="4000" class="swipe" :show-indicators="false">
      <mt-swipe-item v-for="(banners,index) in banner" :key="index">
        <img :src="$url(banners.cover,'@!large')" @click.stop="goSkip(banners.wxLink)">
      </mt-swipe-item>
    </mt-swipe>
    <div class="tabs">
      <div class="tab" @click="goSignIn()">
        <div class="tab_l">
          <p class="text1">大鱼签到</p>
          <p class="text2">赚20%奖励和10倍大奖</p>
        </div>
        <img class="icon" src="~@/assets/image/icon_index_signin.png">
      </div>
      <div class="line">
        <div></div>
      </div>
      <div class="tab" @click="goSendRedPack()">
        <div class="tab_l">
          <p class="text1">发红包</p>
          <p class="text2">微信收发TRX包</p>
        </div>
        <img class="icon" src="~@/assets/image/icon_index_redpack.png">
      </div>
    </div>
    <ul ref="feeds" class="ul_box">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="loadMore">
        <HomeFeedItem v-for="(item,index) in feeds" :key="index" :feed="item"></HomeFeedItem>
      </mu-load-more>
    </ul>
    <div class="menu">
      <img class="refresh" @click.stop="refresh()" src="~@/assets/image/icon_refresh.png">
      <img class="mining" @click.stop="goMining()" src="~@/assets/image/icon_index_mining.png">
    </div>
    <NewPointsDlg :show="showPointsPop" :pints="awardTokenAmount" @share="share"></NewPointsDlg>
    <SharePointsDlg :show="sharePointsPop" :pints="5"></SharePointsDlg>
    <mt-popup class="dialog_share_mode_box" v-model="isShowShareMode" position="top">
      <img @click="hiddenShareDialog()" src="~@/assets/image/share_mode_img.png">
    </mt-popup>
  </div>
</template>

<script>
import HomeFeedItem from "@/components/HomeFeedItem.vue";
import SharePointsDlg from "@/components/SharePointsDlg.vue";
import NewPointsDlg from "@/components/NewPointsDlg.vue";
import wx from 'weixin-js-sdk'
export default {
  name: "home",
  components: {
    HomeFeedItem,
    NewPointsDlg,
    SharePointsDlg
  },
  data() {
    return {
      isShowShareMode: false, //分享弹框
      showPointsPop: false, // 注册奖励弹框
      awardTokenAmount: 0, // 奖励金额
      sharePointsPop: false, //分享成功获得奖励弹框
      banner: [],
      next: 100,
      refreshing: false,
      loading: false,
      feeds: []
    };
  },
  mounted() {
    this.getBanner();
    this.requestData();
  },
  created() {
    this.setShareInfo();
    if (this.$store.state.awardTokenAmount) {
      this.showPointsPop = true;
      this.awardTokenAmount = this.$store.state.awardTokenAmount;
    }
  },
  methods: {
    getBanner() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/home/tips",
        data: {
          type: 3// 2-小程序 3-公众号
        }
      }).then(response => {
        if (response.data.status) {
          this.banner = response.data.data;
        }
      });
    },
    goMining() {
      this.$router.push({
        path: "/MyMining"
      });
    },
    goSignIn(){
      this.$router.push({
        path: "/SignIn"
      });
    },
    goSendRedPack(){
      this.$router.push({
        path: "/SendRedPack"
      });
    },
    //下拉刷新
    refresh() {
      console.log("下拉刷新");
      this.refreshing = true;
      // this.$refs.feeds.scrollIntoView();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        this.requestData(this.feeds[0].contentId);
      }, 2000);
    },
    //加载更多
    loadMore() {
      if (this.next == -1) return;
      this.requestData();
    },
    requestData(lastContentId) {
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/blockchain/v1/home/feedsV1",
        data: {
          next: this.next,
          limit: 20,
          lastContentId: lastContentId || 0
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            if (lastContentId) {
              //下拉刷新
              this.refreshing = false;
              this.feeds = response.data.data.data.concat(this.feeds);
              this.$ui.Toast(
                response.data.data.data.length
                  ? "成功为你推荐" + response.data.data.data.length + "条新内容"
                  : "暂无更多新内容哦"
              );
            } else {
              this.loading = false;
              this.next = response.data.data.next;
              this.feeds = this.feeds.concat(response.data.data.data);
            }
          }
        })
        .catch(response => {
          this.loading = false;
          this.$ui.Indicator.close();
        });
    },
    /**
     * banner跳转
     */
    goSkip(url) {
      window.location.href = url;
    },
    /**
     * 分享
     */
    share() {
      this.showPointsPop = false;
      this.isShowShareMode = true;
      this.setShareInfo(() => {
        this.isShowShareMode = false;
        this.setShareInfo();
        this.getShareGetDb()
      });
    },
    /**
     * 分享成功获取 分享db
     */
    getShareGetDb(){
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/shareGetDb"
      }).then(response => {
        if (response.data.status) {
          this.sharePointsPop = true;
        }
      });
    },
    /**
     * 隐藏分享蒙层
     */
    hiddenShareDialog() {
      this.isShowShareMode = false;
    },
    setShareInfo(success) {
      this.$weChat.init({
        link:
          window.location.href + "?inviter=" + this.$store.state.user.uid || "",
        title: "送你大鱼股份，天天有分红，快来领取！",
        desc: "来大鱼，看资讯、领股份、天天分红！",
        imgUrl:
          location.protocol +
          "//" +
          window.location.host +
          require("../assets/image/share_index_card.png"),
        success: success || function() {}
      });
    }
  }
};
</script>
<style scoped lang="less">
.Home {
  padding-bottom: 98px;
}
.swipe {
  width: 100%;
  height: 240px;
  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
  }
}
.family() {
  font-family: PingFangSC-Medium;
}
.tabs{
  width: 100%;
  height: 150px;
  background: #ffffff;
  display: flex;
  align-items: center;
  .tab{
    width: 49%;
    float: left;
    display: flex;
    .tab_l{
      flex: 1;
      margin-left: 30px;
      .text1{
        font-size:38px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,20,38,1);
        line-height:53px;
      }
      .text2{
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(163,174,186,1);
        line-height:33px;
      }
    }
    .icon{
      margin-right: 13px;
      width: 76px;
      height: 76px;
    }
  }
  .line{
    float: left;
    width: 1%;
    text-align: center;
    div{
      width: 2px;
      height:81px;
      background: #EDEDED;
    }
  }
}
.ul_box {
  margin-top: 10px;
  padding-bottom: 98px;
  -webkit-overflow-scrolling: touch;
}
.ui {
  height: 200px;
  background: #ffffff;
}
.menu {
  position: fixed;
  right: 30px;
  bottom: 180px;
  display: flex;
  flex-direction: column;
}
.menu .refresh {
  width: 100px;
  height: 100px;
  margin-bottom: 12px;
}
.menu .mining {
  width: 95px;
  height: 95px;
}
.dialog_share_mode_box {
  background: none;
  width: 705px;
  height: 1027px;
}
</style>

