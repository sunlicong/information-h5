<template>
  <div>
    <div class="top">
      <div class="text1">开宝箱奖励（元）</div>
      <div class="text2">{{boxRewardAmount}}</div>
      <div class="text3">10:00签到</div>
    </div>
    <div class="message">
      <div class="title">区块信息</div>
      <div @click="copy()">
        <span class="key">交易ID：</span>
        <span class="value">{{txId}}</span>
        <img src="~@/assets/image/copy.png" class="copy">
      </div>
      <div>
        <span class="key">区块高度：</span>
        <span class="value">{{refBlock}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SignInBoxDetail",
  data() {
    return {
      logId: this.$route.query.logId,
      boxRewardAmount: 0,
      txId: "0xoa99…ff62d2",
      refBlock: "5602661"
    };
  },
  mounted() {},
  methods: {
    copy() {
      this.$copyText(this.txId);
      this.$ui.Toast("复制成功");
    },
    /**
     * 邀请奖励 type=33
     * 开宝箱奖励 type=34
     * 签到详情 type=35
     */
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/checkin/log/detail",
        data: {
          logId: this.logId,
          type: 34,
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.boxRewardAmount = response.data.data.boxRewardAmount;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
  }
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