<template>
  <div>
    <div class="top_card">
      <div class="text1">已获奖励（元）</div>
      <div class="text2">2345.00</div>
      <div class="text3">累计签到份数 198</div>
      <div class="top_card_b">
        <div class="item">
          <div class="item_text1">开宝箱奖励（元）</div>
          <div class="item_text2">7,973.00</div>
        </div>
        <div class="item">
          <div class="item_text1">邀请奖励（元）</div>
          <div class="item_text2">7,973.00</div>
        </div>
      </div>
    </div>
    <div>
      <div class="list_title">战绩明细</div>
      <div class="list" v-for="item in 4">
        <div class="left">
          <div>签到156份奖励</div>
          <div>17:54:50</div>
        </div>
        <div class="right">
          <div>+1.5TRX</div>
          <div>已领奖励1/16</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyRecord",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.top_card {
  position: relative;
  width: 100%;
  height: 390px;
  background-image: url(~@/assets/image/bg_myrecord_card.png);
  background-size: 100% 100%;
  text-align: center;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #eea6a4;
  line-height: 33px;
  padding-top: 57px;
  .text2 {
    margin-top: 10px;
    font-size: 64px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: #ffffff;
    line-height: 74px;
  }
  .text3 {
    margin-top: 10px;
  }
  .top_card_b {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    .item {
      width: 50%;
      text-align: center;
      .item_text1 {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #eea6a4;
        line-height: 33px;
      }
      .item_text2 {
        margin-top: 15px;
        font-size: 36px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #ffffff;
        line-height: 50px;
      }
    }
  }
}
.list_title{
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  padding-left: 30px;
  line-height: 80px;
  font-size:28px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#051426;
}
.list{
  margin-top: 2px;
  width: 100%;
  height: 120px;
  background: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left{
    margin-left: 30px;
    text-align: left;
    div:nth-child(1){
      font-size:32px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#051426;
      line-height:45px;
    }
    div:nth-child(2){
      font-size:24px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#A3AEBA;
      line-height:33px;
    }
  }
  .right{
    margin-right: 30px;
    text-align: right;
    div:nth-child(1){
      font-size:32px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#FE6503;
      line-height:45px;
    }
    div:nth-child(2){
      font-size:24px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#A3AEBA;
      line-height:33px;
    }
  }
}
</style>