<template>
  <div>
    <div class="top">
      <img src="~@/assets/image/bg_sign_in.png" class="top_bg">
      <div class="top_content">
        <div class="top_content_menu">
          <swiper class="swiper" :options="swiperOption" v-if="carouselList.length>1">
            <swiper-slide v-for="(item, index) in carouselList" :key="index">
              <div class="slide">
                <img :src="item.photo">
                <span>{{item.nick}}签到{{item.checkInCount}}份</span>
              </div>
            </swiper-slide>
          </swiper>
          <div class="help" @click="onClick('raiders')">
            <div>攻略</div>
            <img src="~@/assets/image/icon_help_search.png">
          </div>
        </div>
        <div class="text1">明日上午10点开宝箱金额（元）</div>
        <div class="text2">{{boxMoney}}</div>
        <div class="text3">10:00签到的人获得宝箱</div>
        <div class="text4">当前签到份数{{currentSignCount}}</div>
        <div class="text5">当前签到份数达到200之后，你将获得20%奖励</div>
      </div>
    </div>
    <mt-button @click="SelectPopVisible=!SelectPopVisible" class="btn">立即签到</mt-button>
    <div class="tabs">
      <div class="tab">
        <div class="tab_l">
          <p class="text1">赚100元现金</p>
          <p class="text2">实时到账</p>
        </div>
        <img class="icon" src="~@/assets/image/icon_index_signin.png">
      </div>
      <div class="tab" @click="onClick('record')">
        <div class="tab_l">
          <p class="text1">我的战绩</p>
          <p class="text2">累计签到100份</p>
        </div>
        <img class="icon" src="~@/assets/image/icon_index_signin.png">
      </div>
    </div>
    <div v-if="boxWinnerNick" class="situation">
      <div class="title">今日签到战况</div>
      <div class="card">
        <img class="icon" :src="boxWinnerPhoto">
        <div class="text1">{{boxWinnerNick}}签到</div>
        <div class="text2">开宝箱得{{boxWinnerAmount}}元</div>
      </div>
    </div>
    <!-- 选择份数 -->
    <mt-popup class="selsect_num_dialog" v-model="SelectPopVisible" position="bottom">
      <div class="title_view">参与签到，赚20%奖励，更有机会得10倍大奖</div>
      <div class="card">
        <div class="item" :class="[count==1?'border':'border-none']" @click="count=1">1份</div>
        <div class="item" :class="[count==10?'border':'border-none']" @click="count=10">10份</div>
        <div class="item" :class="[count==100?'border':'border-none']" @click="count=100">100份</div>
        <div class="item" :class="[count==500?'border':'border-none']" @click="count=500">500份</div>
      </div>
      <mt-button @click="signIn()" class="sign">支付{{checkinPrePrice*count}}元参与签到</mt-button>
    </mt-popup>
    <!-- 确认支付弹框 -->
    <mt-popup class="dialog_box" v-model="popupPayVisible" position="bottom">
      <div class="title_view">
        <div class="left" @click="popupPayVisible=!popupPayVisible">取消</div>
        <div class="title">确认支付</div>
        <div class="right"></div>
      </div>
      <div class="line"></div>
      <div class="price_view">
        <div class="price">￥{{checkinPrePrice*count}}</div>
        <div class="tip">实时读取交易价格，以最终支付金额为准</div>
      </div>
      <div class="item">
        <div class="left">订单信息</div>
        <div class="right">参与签到</div>
      </div>
      <div class="item bordertb">
        <div class="left">支付方式</div>
        <div class="right">
          <img class="icon" src="~@/assets/image/icon_wx.png" alt>
          <span>微信支付</span>
        </div>
      </div>
      <mt-button class="pay" @click="doPay()">确认支付</mt-button>
    </mt-popup>
    <!-- 选择支付方式 -->
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "SignIn",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      SelectPopVisible: false,
      popupPayVisible: false,
      boxMoney: 0, //宝箱金额
      currentSignCount: 0, //当前签到数
      canLeaveCount: 0, //还有多少份可以离开
      boxWinnerPhoto: "", //中奖者头像
      boxWinnerNick: "", //中奖者昵称
      boxWinnerAmount: 0, //中奖金额
      checkinPrePrice: 1, //单价
      count: 1, //份数
      carouselList: [],//签到轮播
      swiperOption: {
        direction: "vertical",
        //设置自动播放速度
        autoplay: {
          delay: 3000
        },
        //开启无限循环
        loop: true
      }
    };
  },
  created() {
    this.requestData();
    this.requestCarouselList();
  },
  methods: {
    onClick(type) {
      switch (type) {
        case "record":
          this.$router.push({
            path: "/MyRecord"
          });
          break;
        case "raiders":
          this.$router.push({
            path: "/SignInRaders"
          });
          break;
        default:
          break;
      }
    },
    signIn() {
      this.SelectPopVisible = false;
      this.popupPayVisible = true;
    },
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/checkin/detail"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.boxMoney = response.data.data.boxMoney;
            this.checkinPrePrice = response.data.data.checkinPrePrice;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 签到轮播条
     */
    requestCarouselList(){
      this.$axios({
        method: "get",
        url: "/blockchain/v1/checkin/carouselList"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.carouselList = response.data.data;
          }
        })
        .catch(response => {});
    },
    /**
     * 微信支付
     */
    doPay(){
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wxpay/doPaySign",
        data: {
          count: this.count
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          this.popupPayVisible = false;
          if (response.data.status) {
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  ()=>{
                    this.onBridgeReady(response.data.data);
                  },
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
              }
            } else {
              this.onBridgeReady(response.data.data);
            }
          }
        })
        .catch(response => {
          this.popupPayVisible = false;
          this.$ui.Indicator.close();
        });
    },
    onBridgeReady(data) {
      var that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.package,
          signType: data.signType, //微信签名方式：
          paySign: data.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            that.$ui.Toast("签到成功");
            that.requestData();
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 422px;
  position: relative;
  .top_bg {
    position: absolute;
    width: 100%;
    height: 422px;
  }
  .top_content {
    position: absolute;
    width: 100%;
    height: 422px;
    .top_content_menu {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 20px;
      .swiper {
        margin-left: 30px;
        min-width: 200px;
        height: 60px;
        .slide {
          height: 60px;
          line-height: 60px;
          background: #00000070;
          border-radius: 30px;
          font-size: 28px;
          color: #fff;
          letter-spacing: 0;
          text-align: left;
          padding-left: 12px;
          padding-right: 22px;
          img {
            margin-right: 15px;
            width: 44px;
            height: 44px;
            border-radius: 22px;
            background: #f4f4f4;
          }
        }
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
          width: 31px;
          height: 26px;
        }
      }
    }
  }
  .text1 {
    margin-top: 40px;
    margin-left: 30px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
  .text2 {
    margin-top: 30px;
    margin-left: 30px;
    font-size: 72px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: #ffffff;
    line-height: 82px;
  }
  .text3 {
    margin-top: 5px;
    margin-left: 30px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 33px;
    opacity: 0.7;
  }
  .text4 {
    margin-top: 20px;
    margin-left: 30px;
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #ffffff;
    line-height: 33px;
  }
  .text5 {
    margin-left: 30px;
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #ffffff;
    line-height: 33px;
  }
}
.btn {
  margin-top: 69px;
  margin-left: 30px;
  margin-right: 30px;
  width: 690px;
  height: 98px;
  line-height: 98px;
  background: #fd5145;
  border-radius: 8px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #fff;
}
.tabs {
  width: 100%;
  height: 128px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  .tab {
    width: 335px;
    height: 100%;
    background: #ffffff;
    display: flex;
    align-items: center;
    .tab_l {
      flex: 1;
      margin-left: 30px;
      .text1 {
        font-size: 32px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(5, 20, 38, 1);
        line-height: 45px;
      }
      .text2 {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #a3aeba;
        line-height: 33px;
      }
    }
    .icon {
      margin-right: 13px;
      width: 76px;
      height: 76px;
    }
  }
}
.situation {
  margin-left: 30px;
  margin-top: 30px;
  .title {
    font-size: 34px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #051426;
    line-height: 48px;
  }
  .card {
    width: 330px;
    height: 186px;
    text-align: center;
    img {
      margin-top: 20px;
      width: 80px;
      height: 80px;
      border: 2px solid #f8d491;
      border-radius: 40px;
    }
    .text1 {
      margin-top: 10px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(5, 20, 38, 1);
      line-height: 33px;
    }
    .text2 {
      margin-top: 10px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(253, 81, 69, 1);
      line-height: 33px;
    }
  }
}
.selsect_num_dialog {
  width: 100%;
  background: #ffffff;
  .title_view {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #051426;
    text-align: center;
  }
  .card {
    margin-top: 20px;
    width: 100%;
    height: 108px;
    display: flex;
    padding-left: 10px;
    .border {
      background: #ffebea;
      border: 1px solid #fd5145;
    }
    .border-none {
      background: #ffffff;
      border: 1px solid #cfd0d0;
    }
    .item {
      margin-left: 20px;
      width: 158px;
      height: 108px;
      line-height: 108px;
      text-align: center;
      font-size: 32px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #1f2c3c;
    }
  }
  .sign {
    margin: 50px 30px 30px 30px;
    width: 690px;
    height: 98px;
    line-height: 98px;
    background: #fd5145;
    border-radius: 8px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #fff;
  }
}
.dialog_box {
  width: 100%;
  height: 667px;
  background: #ffffff;
  .title_view {
    width: 100%;
    height: 108px;
    display: flex;
    align-items: center;
    .left {
      width: 100px;
      margin-left: 30px;
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #2a2e3f;
      img {
        width: 21px;
        height: 31px;
      }
    }
    .title {
      flex: 1;
      float: center;
      font-size: 36px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #2a2e40;
      text-align: center;
    }
    .right {
      width: 100px;
    }
  }
  .line {
    width: 100%;
    height: 2px;
    background: #dedede;
  }
  .price_view {
    width: 100%;
    height: 180px;
    text-align: center;
    .price {
      margin-top: 30px;
      height: 90px;
      font-size: 64px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #2a2e3f;
      line-height: 90px;
      text-align: center;
    }
    .tip {
      margin-top: 10px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #a3aeba;
      line-height: 33px;
    }
  }
  .item {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dedede;
    align-items: center;
    .left {
      margin-left: 30px;
    }
    .right {
      margin-right: 30px;
      .icon {
        width: 60px;
        height: 60px;
        margin-right: 15px;
      }
      .arrow {
        width: 12px;
        height: 21px;
        margin-left: 12px;
      }
    }
  }
  .pay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: #0794fc;
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #ffffff;
    line-height: 100px;
  }
}
</style>