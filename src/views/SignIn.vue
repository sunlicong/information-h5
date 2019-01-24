<template>
  <div>
    <div class="top">
      <img src="~@/assets/image/bg_sign_in.png" class="top_bg">
      <div class="top_content">
        <div class="top_content_menu">
          <div class="slide">
            <img src="~@/assets/image/icon_help_search.png">
            <span>王*签到14份</span>
          </div>
          <div class="help" @click="raiders()">
            <div>攻略</div>
            <img src="~@/assets/image/icon_help_search.png">
          </div>
        </div>
        <div class="text1">明日上午10点开宝箱金额（元）</div>
        <div class="text2">168.00</div>
        <div class="text3">10:00签到的人获得宝箱</div>
        <div class="text4">当前签到份数168</div>
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
      <div class="tab">
        <div class="tab_l">
          <p class="text1">我的战绩</p>
          <p class="text2">累计签到100份</p>
        </div>
        <img class="icon" src="~@/assets/image/icon_index_signin.png">
      </div>
    </div>
    <div class="situation">
      <div class="title">今日签到战况</div>
      <div class="card">
        <img class="icon" src="~@/assets/image/icon_index_signin.png">
        <div class="text1">一羞10:00签到</div>
        <div class="text2">开宝箱得617元</div>
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
      <mt-button @click="signIn()" class="sign">支付{{singlePrice*count}}元参与签到</mt-button>
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "SignIn",
  data() {
    return {
      SelectPopVisible: false,
      singlePrice: 1,//单价
      count: 1,//份数
    };
  },
  created() {},
  methods: {
    signIn(){

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
      .slide {
        margin-left: 30px;
        height: 60px;
        line-height: 60px;
        background: #000000;
        border-radius: 30px;
        opacity: 0.7;
        font-size: 28px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
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
    .border{
      background: #FFEBEA;
      border: 1px solid #FD5145;
    }
    .border-none{
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
</style>