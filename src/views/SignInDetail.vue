<template>
  <div>
    <div class="top">
      <div class="text1">已获奖励（元）</div>
      <div class="text2">{{alreadyRewardAmount}}</div>
      <div class="text3">签到份数 {{checkinCount}}，已奖励{{alreadyRewardCount}}/{{checkinCount}}</div>
    </div>
    <div class="records">
      <div class="item height80">
        <div>签到号码</div>
        <div>奖励状态</div>
      </div>
      <div class="item height120"  v-for="(item,index) in logCheckinRecords">
        <div class="color5A89F8">{{index+1}}</div>
        <div v-if="item.lotteryStatus==0" class="colorA6B1BC">未奖励</div>
        <div v-if="item.lotteryStatus==1" class="colorFE6503">已获得奖励{{item.lotteryAmount}}元</div>
      </div>
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
  name: "SignInDetail",
  data() {
    return {
      logId: this.$route.query.logId,
      alreadyRewardAmount: 0,
      checkinCount: 0,//签到份数
      alreadyRewardCount: 0,//已奖励份数
      logCheckinRecords: [],//签到列表
      txId: "0xoa99…ff62d2",
      refBlock: "5602661"
    };
  },
  created() {
    this.requestData()
  },
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
          type: 35,
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.alreadyRewardAmount = response.data.data.alreadyRewardAmount;
            this.checkinCount = response.data.data.checkinCount;
            this.alreadyRewardCount	 = response.data.data.alreadyRewardCount;
            this.logCheckinRecords = response.data.data.logCheckinRecords;
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
.records{
  margin-top: 20px;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }
  .height80{
    height: 80px;
    background: #ffffff;
  }
  .height120{
    margin-top: 1px;
    height: 120px;
    background: #ffffff;
    .color5A89F8{
      font-size:32px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#5A89F8;
    }
    .colorFE6503{
      font-size:32px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#FE6503;
      line-height:45px;
    }
    .colorA6B1BC{
      font-size:32px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#A6B1BC;
      line-height:45px;
    }
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