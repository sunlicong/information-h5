<template>
  <div>
    <div class="top">
      <div class="text1">邀请奖励（元）</div>
      <div class="text2">0.77</div>
      <div class="text3">xxx邀请份数 198</div>
    </div>
    <div class="message">
      <div class="title">区块信息</div>
      <div @click="copy()">
        <span class="key">交易ID：</span>
        <span class="value">0xoa99…ff62d2</span>
        <img src="~@/assets/image/copy.png" class="copy">
      </div>
      <div>
        <span class="key">区块高度：</span>
        <span class="value">5602661</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SignInInviteDetail",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  background: #ffffff;
  text-align: center;
  padding-top: 57px;
  padding-bottom: 58px;
  .text1 {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #162435;
    line-height: 40px;
  }
  .text2 {
    margin-top: 10px;
    font-size: 64px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: #cc322d;
    line-height: 74px;
  }
  .text3 {
    margin-top: 10px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #e83831;
    line-height: 40px;
  }
}
.message {
  font-size: 28px;
  padding: 20px 30px;
}
.title {
  color: #101f30;
}
.message .key {
  color: #a3aeba;
}
.message .value {
  color: #051426;
}
.copy {
  width: 25px;
  height: 25px;
  margin-left: 10px;
}
</style>