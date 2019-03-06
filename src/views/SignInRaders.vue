<template>
  <div class="SignInRaders">
    <div class="top">
      <div class="card">
        <img src="~@/assets/image/icon_raders_signin.png" class="card_img" mode="aspectFit">
        <div class="card_text">签到</div>
      </div>
      <div class="card">
        <img src="~@/assets/image/icon_raders_reward.png" class="card_img" mode="aspectFit">
        <div class="card_text">得奖励</div>
      </div>
      <div class="card">
        <img src="~@/assets/image/icon_raders_box.png" class="card_img" mode="aspectFit">
        <div class="card_text">开宝箱</div>
      </div>
      <div class="dian1"></div>
      <div class="dian2"></div>
    </div>
    <div class="content">
      <div class="title">一、签到</div>
      <div class="line1 colorDD67DA"></div>
      <div class="text">
        来大鱼快报，每日签到，参与奖励
      </div>
      <div class="title">二、得奖励</div>
      <div class="line1 colorFF645D"></div>
      <div class="text">
        当前签到份数达到一定份数之后，你将获得20%奖 励，退出签到；当前签到份数=新增签到份数-退出 签到份数；退出签到后，可重新进行签到
      </div>
      <div class="title">三、开宝箱</div>
      <div class="line1 colorFEAE53"></div>
      <div class="text mr78">
        每日上午10:00开宝箱，10:00签到的人获得宝箱，若无10:00的签到，则取距10:00最近的签到，以支付时间为准。签到份数越多，宝箱金额越大。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SignInRaders",
  data() {
    return {
      
    };
  },
  created() {

  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.SignInRaders {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/image/bg_sign_raders.png);
  background-size:100% 100%;
}
.top {
  position: relative;
  margin-left: 100px;
  margin-right: 100px;
  padding-top: 88px;
  display: flex;
  justify-content: space-between;
  .card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    .card_img {
      width: 70px;
      height: 70px;
    }
    .card_text {
      margin-top: 21px;
      font-family:PingFangSC-Regular;
      font-weight:400; 
      font-size: 32px;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .dian1 {
    position: absolute;
    width:70px;
    height:2px;
    background-color: #FFFFFF;
    opacity: 0.5;
    margin-top: 36px;
    margin-left: 150px;
  }
  .dian2 {
    position: absolute;
    width:70px;
    height:2px;
    background-color: #FFFFFF;
    opacity: 0.5;
    margin-top: 36px;
    margin-left: 330px;
  }
}
.content{
  margin-top: 66px;
  width: 100%;
  padding-left: 50px;
  padding-right: 78px;
  .title{
    font-size:32px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#FFFFFF;
    line-height:45px;
  }
  .line1{
    width:48px;
    height:6px;
    border-radius:4px;
  }
  .colorDD67DA{
    background:#DD67DA;
  }
  .colorFF645D{
    background:#FF645D;
  }
  .colorFEAE53{
    background:#FEAE53;
  }
  .text{
    margin-top: 12px;
    margin-bottom: 40px;
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:40px;
    opacity: 0.7;
  }
  .mr78{
    margin-right: 78px;
  }
}
</style>