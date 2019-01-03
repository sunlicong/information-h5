<template>
  <div>
    <div class="content">
      <div class="box1 mt-50">
        <div class="w_50">
          <div class="text1">今日赞赏挖矿释放点钻</div>
          <div class="text2">{{$formatMoney(topLimition,1)}}</div>
        </div>
        <div class="w_50">
          <div class="text3">昨日赞赏挖矿产出点钻</div>
          <div class="text4">{{$formatMoney(yesterdayInviteDb,1)}}</div>
        </div>
      </div>
      <div class="box1 mt-30">
        <div class="w_50">
          <div class="text1">本周奖励池</div>
          <div class="text2">{{$formatMoney(weekBonusTotal,1)}}</div>
        </div>
        <div class="w_50">
          <div class="text3">上周奖励池获得者</div>
          <div class="text4 one_line">{{bonusLastweekWinner||'--'}}</div>
        </div>
      </div>
      <div class="box2 mt-20 b_color_D1D7FF">
        <div class="text5">昨日收入分红：</div>
        <div class="text6">
          <span v-if="yesterdayShareTrxAmount">{{$formatMoney(yesterdayShareTrxAmount,1)}}TRX</span>
          <span v-if="yesterdayShareTrxAmount&&yesterdayShareMoneyAmount">+</span>
          <span v-if="yesterdayShareMoneyAmount">{{$formatMoney(yesterdayShareMoneyAmount,1)}}元</span>
          <span v-if="yesterdayShareTrxAmount==0&&yesterdayShareMoneyAmount==0">0.00</span>
        </div>
      </div>
      <div class="box2">
        <div class="text5">点钻总流通量：</div>
        <div class="text6">{{$formatMoney(tokenTotalCirculating,1)}}</div>
      </div>
      <div class="box2 b_color_D1D7FF">
        <div class="text5">昨日挖矿产生点钻总量：</div>
        <div class="text6">{{$formatMoney(yesterdayTotalToken,1)}}</div>
      </div>
      <div class="box2 radius one_line">
        <div class="text5">生态和团队同步释放点钻总量：</div>
        <div class="text6">{{$formatMoney(unfrozenTotalToken,1)}}</div>
      </div>
    </div>
    <img class="bg" src="~@/assets/image/img_raiders.png">
  </div>
</template>
<script>
export default {
  name: "Raiders",
  data() {
    return {
      topLimition: 0,//今日赞赏挖矿释放点钻
      yesterdayInviteDb:0,//昨日赞赏挖矿产出点钻
      weekBonusTotal:0,//本周奖励池
      bonusLastweekWinner:"",//上周奖励池获得者
      yesterdayShareMoneyAmount: 0,//昨日收入人民币分红
      yesterdayShareTrxAmount: 0,//昨日收入TRX分红
      yesterdayLikeTotalToken: 0, //昨日点赞挖矿数
      unfrozenTotalToken: 0, //团队释放数量
      yesterdayTotalToken: 0, //昨日挖矿总数
      tokenTotalCirculating: 0, //总流通数量
      yesterdayDividend: 0 //昨日收入分红
    };
  },
  mounted() {
    this.requestData()
  },
  methods: {
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/home/queryGuideStatisticData"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.topLimition = response.data.data.topLimition;
            this.yesterdayInviteDb = response.data.data.yesterdayInviteDb;
            this.weekBonusTotal = response.data.data.weekBonusTotal;
            this.bonusLastweekWinner = response.data.data.bonusLastweekWinner;
            this.yesterdayShareMoneyAmount = response.data.data.yesterdayShareMoneyAmount;
            this.yesterdayShareTrxAmount = response.data.data.yesterdayShareTrxAmount;
            this.yesterdayLikeTotalToken = response.data.data.yesterdayLikeTotalToken;
            this.unfrozenTotalToken = response.data.data.unfrozenTotalToken;
            this.yesterdayTotalToken = response.data.data.yesterdayTotalToken;
            this.tokenTotalCirculating = response.data.data.tokenTotalCirculating;
            this.yesterdayDividend = response.data.data.yesterdayDividend;
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
.bg {
  width: 750px;
}
.content {
  position: absolute;
  margin-top: 468px;
  margin-left: 28px;
  width: 690px;
  height: 467px;
  border-radius: 0 0 8px 8px;
}
.mt-20 {
  margin-top: 20px;
}
.mt-30 {
  margin-top: 30px;
}
.mt-50 {
  margin-top: 50px;
}
.box1 {
  width: 100%;
  height: 110px;
  display: flex;
}
.w_50 {
  width: 50%;
}
.text1 {
  margin-left: 20px;
  opacity: 0.7;
  font-family: PingFangSC-Regular;
  font-weight:400;
  font-size: 28px;
  color: #4d72fe;
}
.text2 {
  margin-top: 10px;
  margin-left: 20px;
  font-family: PingFangSC-Semibold;
  font-weight:600;
  font-size: 44px;
  color: #4d72fe;
}
.text3 {
  margin-left: 20px;
  opacity: 0.7;
  font-family: PingFangSC-Regular;
  font-weight:400;
  font-size: 28px;
  color: #4d72fe;
}
.text4 {
  margin-top: 10px;
  margin-left: 20px;
  font-family: PingFangSC-Semibold;
  font-weight:600;
  font-size: 44px;
  color: #4d72fe;
}
.box2 {
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
}
.text5 {
  margin-left: 20px;
  opacity: 0.7;
  font-family: PingFangSC-Regular;
  font-weight:400;
  font-size: 28px;
  color: #829cfe;
}
.text6 {
  margin-left: 5px;
  font-family: PingFangSC-Semibold;
  font-weight:600;
  font-size: 36px;
  color: #4d72fe;
}
.b_color_D1D7FF {
  background: #d1d7ff;
}
.radius {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
