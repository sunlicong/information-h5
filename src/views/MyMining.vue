<template>
  <div class="MyMining">
    <div class="top">
      <img src="~@/assets/image/bg_my_mining.png" class="top_bg">
      <div class="top_content">
        <div class="top_content_menu">
          <div class="invite" @click="invite()">邀请好友</div>
          <div class="help" @click="raiders()">
            <div>攻略</div>
            <img src="~@/assets/image/icon_help_search.png">
          </div>
        </div>
        <div class="mining">
          <div v-if="mineList.length==0" class="mining_non">
            <img class="img_mining" src="~@/assets/image/icon_mining.png">
            <div class="ing">点钻正在产出</div>
            <div class="text-container">
              <div class="inner-container">
                <p class="text" v-for="(text, index) in notices" :key="index">{{text}}</p>
              </div>
            </div>
          </div>
          <!-- <transition-group tag="ul" v-bind:css="false"> -->
            <div
              v-if="item.isHidden!=1"
              class="mining_item"
              :style="{left: randomXY.length>index? randomXY[index].left+'px':'0px',top:randomXY.length>index?randomXY[index].top+'px':'0px'}"
              @click="getCoin(item.id,index)"
              v-for="(item,index) in mineList"
              :key="index"
            >
              <div>
                <img class="img_mining" src="~@/assets/image/icon_mining.png">
                <div class="num">{{item.tokenamount}}</div>
                <div class="coin">点钻</div>
              </div>
            </div>
          <!-- </transition-group> -->
        </div>
        <img src="~@/assets/image/icon_wallet.png" class="wallet" @click="goWallet()">
      </div>
    </div>
    <div class="height-130">
      <div class="left">
        <div class="margin-left-20" bindtap="showTip">累计分红</div>
        <img src="~@/assets/image/icon_tip.png" class="size-30" @click="showTip()">
      </div>
      <div class="right" @click="goRmb()">
        <div class="quan-total">
          <span v-if="incomeTrxToken>0">{{$formatMoney(incomeTrxToken,1)}}TRX</span>
          <span v-if="incomeTrxToken>0&&totalCommition>0">+</span>
          <span v-if="totalCommition>0">{{$formatMoney(totalCommition,1)}}元</span>
          <span v-if="incomeTrxToken==0&&totalCommition==0">0.00</span>
        </div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div class="divid_content">
      <div class="title">待领取分红</div>
      <div class="price">
        <span v-if="unReceiveTrx>0">{{$formatMoney(unReceiveTrx,1)}}TRX</span>
        <span v-if="unReceiveTrx>0&&unReceiveMoney>0">+</span>
        <span v-if="unReceiveMoney>0">{{$formatMoney(unReceiveMoney,1)}}元</span>
        <span v-if="unReceiveTrx==0&&unReceiveMoney==0">0.00</span>
      </div>
      <div class="coin">参与分红点钻：{{bonusDb}}</div>
      <mt-button
        :disabled="unReceiveMoney==0&&unReceiveTrx==0"
        class="get"
        :class="unReceiveMoney==0&&unReceiveTrx==0?'disabledBg':''"
        @click="getTrxAndRmb()"
      >领取</mt-button>
    </div>
    <mt-popup class="dialog_box" v-model="isShowTip">
      <div class="title">提示</div>
      <div class="text">1、每日24点按当前所有用户持有非冻结点钻比例结算当日分红</div>
      <div class="text">2、次日12点左右发放前一日分红</div>
      <div class="text">3、平台按照收入的80%进行分红，平台收入与实际经营相关，无收入则不分红</div>
      <div class="text">4、前一日分红的40%分配给前一日获得点钻并次日中午12点前领取的用户，60%分配给以往获得点钻并持有的用户</div>
      <div class="text">5、超过48小时未领取的分红，将不可领取</div>
      <div class="text">6、冻结部分，无法参与分红</div>
      <div class="text">7、当前日获得的点钻，无法参与前一日分红</div>
      <div class="confirm" @click="closeDialog()">知道了</div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "MyMining",
  data() {
    return {
      animation: false,
      isShowTip: false,
      animationIndex: 0,
      notices: [
        "点赞、分享、发布文章得点钻",
        "每日0点可领昨日点钻",
        "48小时内未领取的点钻，将不可领取"
      ],
      mineList: [],
      totalCommition: 0, //	分红数人民币
      incomeTrxToken: 0, // 分红 trx
      unReceiveMoney: 0, //待领取的人民币
      unReceiveTrx: 0, //待领取的trx
      bonusDb: 0, //参与分红币
      randomXY: []
    };
  },
  mounted() {
    this.createdBalls();
    this.queryUnReceiveAssets();
  },
  computed: {
    iconstyle: function() {
      //图标动态样式
      let arr = new Array();
      arr.push("animation-duration:5s;");
      arr.push("transform:"); //注意：先移动后旋转，实现原地旋转；先旋转后移动，位置按照旋转后的新坐标系确定
      arr.push("translateX(" + this.icontranslateX + "px) ");
      arr.push("translateY(" + this.icontranslateY + "px) ;");
      return arr.join("");
    }
  },
  methods: {
    /**
     * 邀请好友
     */
    invite() {
      this.$router.push({
        path: "/inviteFriend"
      });
    },
    /**
     * 攻略
     */
    raiders() {
      this.$router.push({
        path: "/Raiders"
      });
    },
    /**
     * 线包
     */
    goWallet() {
      this.$router.push({
        path: "/Wallet"
      });
    },
    /**
     * 累计收益
     */
    goRmb() {
      this.$router.push({
        path: "/Wallet"
      });
    },
    /**
     * 获取待领取点钻
     */
    requestData() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/unReceiveDbList"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.mineList = response.data.data.data;
            this.mineList.forEach((item, index) => {
              this.$set(item, "isHidden", 0);
            });
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 获取用户的未领取的资产
     */
    queryUnReceiveAssets() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/queryUnReceiveAssets"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.unReceiveMoney = response.data.data.unReceiveMoney;
            this.totalCommition = response.data.data.totalCommition;
            this.incomeTrxToken = response.data.data.incomeTrxToken;
            this.bonusDb = response.data.data.bonusDb;
            this.unReceiveTrx = response.data.data.unReceiveTrx || 0;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 随机生成点钻位置
     */
    createdBalls() {
      var randomArr = this.randomXY;
      const showHeight = 150; //限制钻石生成区域高度
      const showWidth = 300;
      for (var i = 0; i < 3000; i++) {
        const row = Math.floor(Math.random() * showHeight);
        const col = Math.floor(Math.random() * showWidth);
        if (randomArr.length === 0) {
          randomArr.push({
            left: col,
            top: row
          });
        } else {
          const noOverlap = randomArr.every(
            v => Math.hypot(v.left - col, v.top - row) > 50
          ); //这里的主要目的就是来保证每次随机生成的点确定的图片位置不会有重叠
          if (noOverlap) {
            randomArr.push({
              left: col,
              top: row
            });
          }
        }
      }
      this.randomXY = randomArr;
      this.requestData();
    },
    /**
     * 分红领取
     */
    getTrxAndRmb() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wallet/receiveRMB"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.queryUnReceiveAssets();
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 领取DB
     */
    getCoin(id, index) {
      this.randomXY.splice(index, 1)
      this.mineList.splice(index, 1)
      // return;
      this.$axios({
        method: "post",
        url: "/blockchain/v1/user/receiveDb",
        data: {
          id: id
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            var list = this.mineList;
            var isHaveDb = false;
            for (var i = 0; i < list.length; i++) {
              if (id == list[i].id) {
                list[i].isHidden = 1;
              }
              if (!list[i].isHidden) {
                isHaveDb = true;
              }
            }
            this.mineList = list;
            // this.randomXY.splice(index, 1)
            // this.mineList.splice(index, 1)
            if (this.next != -1 && !isHaveDb) {
              this.unReceiveDbList();
            }
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    showTip() {
      this.isShowTip = true;
    },
    closeDialog() {
      this.isShowTip = false;
    },
    /**
     * 动画-----------------------
     */
    beforeEnter(el) {
      // 开始动画之前，也就是起始状态
      // console.log("beforeEnter");
      // var xy = this.randomXY[this.animationIndex];
      // el.style.transform = "translate(" + xy.left + "px," + xy.top + "px)";
      // el.style.opacity = 1;
      // el.style.transition = "all 2s ease";
    },
    enter(el, done) {
      // 动画指定的过程
      console.log("enter");

      // 作用：告诉浏览器重绘或重排页面结构
      // offsetWidth 会通知浏览器重新计算元素的宽度，这样，会造成浏览器重绘
      // el.offsetWidth
      el.offsetHeight;

      // 设置动画要达到的目标状态
      el.style.transform = "translate(50px,150px)";
      el.style.opacity = 0.5;
      done();
    },
    afterEnter(el) {
      console.log("afterEnter");
      // 动画结束
      this.isShow = !this.isShow;
    },
    beforeLeave(el) {
      console.log("beforeLeave");
      var xy = this.randomXY[this.animationIndex];
      // el.style.transform = "translate(" + xy.left + "px," + xy.top + "px)";
      el.style.opacity = 1;
      el.style.transition = "all 2s ease";
    },
    leave(el, done){
      console.log("leave");
      // 设置动画要达到的目标状态
      el.style.transform = "translate(50px,150px)";
      el.style.opacity = 0.5;
      done();
    },
    afterLeave(el) {
      console.log("afterLeave");

    },
    /**
     * 动画-----------------------
     */
  }
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 600px;
  position: relative;
  .top_bg {
    position: absolute;
    width: 100%;
    height: 600px;
  }
  .top_content {
    position: absolute;
    width: 100%;
    height: 600px;
    .top_content_menu {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 30px;
      .invite {
        width: 145px;
        height: 66px;
        line-height: 66px;
        background: rgba(255, 255, 255, 0.1) none repeat scroll 0 0 !important;
        border-radius: 0 100px 100px 0;
        font-size: 28px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
      }
      .help {
        width: 145px;
        height: 66px;
        line-height: 66px;
        background: rgba(255, 255, 255, 0.1) none repeat scroll 0 0 !important;
        border-radius: 100px 0 0 100px;
        font-size: 28px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 5px;
          width: 30px;
          height: 30px;
        }
      }
    }
    .wallet {
      position: absolute;
      bottom: 20px;
      left: 30px;
      width: 90px;
      height: 90px;
    }
    .mining {
      margin-left: 40px;
      margin-right: 40px;
      height: 420px;
      position: relative;
      .mining_non {
        text-align: center;
        margin-top: 80px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #ffffff;
        line-height: 40px;
        .ing {
          margin-top: 10px;
        }
        .text-container {
          width: 100%;
          height: 40px;
          line-height: 40px;
          margin: 10px auto;
          overflow: hidden;
          .inner-container {
            animation: myMove 10s linear infinite;
            animation-fill-mode: forwards;
          }
          .text {
            margin: 0;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #ffca02;
          }
        }
      }
      .mining_item {
        position: absolute;
        display: flex;
        flex-direction: column;
      }
      .img_mining {
        width: 90px;
        height: 90px;
      }
      .num {
        width: 100%;
        height: 30px;
        text-align: center;
        color: #fff;
        font-size: 28px;
      }
      .coin {
        width: 100%;
        height: 12px;
        text-align: center;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
.height-130 {
  width: 100%;
  height: 120px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    margin-left: 30px;
    .margin-left-20 {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #051426;
    }
    .size-30 {
      margin-left: 15px;
      width: 30px;
      height: 30px;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
    .quan-total {
      font-size: 32px;
      color: #fe6503;
    }

    .arrow {
      width: 12px;
      height: 21px;
      margin-left: 12px;
    }
  }
}
.divid_content {
  margin-top: 1px;
  width: 100%;
  background: #fff;
  display: inline-block;
  flex-direction: column;
  text-align: center;
  .title {
    margin-top: 38px;
    font-size: 28px;
    color: #051426;
  }
  .price {
    margin-top: 26px;
    font-size: 32px;
    color: #fe6503;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .coin {
    margin-top: 22px;
    font-size: 24px;
    color: #a3aeba;
  }
  .get {
    margin-top: 20px;
    margin-bottom: 38px;
    width: 208px;
    height: 60px;
    line-height: 60px;
    border-radius: 8px;
    background: #0794fc;
    font-size: 34px;
    color: #fff;
    border: 0;
  }
  .disabledBg {
    background: #a1a1a1;
    opacity: 1;
  }
}
.dialog_box {
  width: 619px;
  height: 780px;
  border-radius: 20px;
  background: #fff;
  .title {
    margin-top: 20px;
    line-height: 90px;
    font-family: PingFangSC-Medium;
    font-size: 34px;
    color: #2d3232;
    text-align: center;
  }
  .text {
    margin-left: 28px;
    margin-right: 28px;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #2d3232;
    line-height: 42px;
  }
  .confirm {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98px;
    line-height: 98px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 34px;
    color: #29a3fd;
    border-top: 2px solid #999999;
  }
}
/*文字停顿滚动*/
@keyframes myMove {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(0px);
  }
  30% {
    transform: translateY(0px);
  }
  33% {
    transform: translateY(-40px);
  }
  40% {
    transform: translateY(-40px);
  }
  50% {
    transform: translateY(-40px);
  }
  60% {
    transform: translateY(-40px);
  }
  66% {
    transform: translateY(-80px);
  }
  70% {
    transform: translateY(-80px);
  }
  80% {
    transform: translateY(-80px);
  }
  90% {
    transform: translateY(-80px);
  }
  100% {
    transform: translateY(-120px);
  }
}
.moveAni {
  animation: move 2s normal;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  90% {
    transform: translate(-600px, 400px);
  }
  100% {
    transform: translate(-600px, 450px);
    transform: scale(0);
  }
}
// .list-enter-active, .list-leave-active {
//   transition: all 1s;
// }
// .list-enter, .list-leave-to
// /* .list-leave-active for below version 2.1.8 */ {
//   opacity: 0;
//   transform: translate(-200px, 200px);
// }
</style>
