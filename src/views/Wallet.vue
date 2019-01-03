<template>
  <div>
    <div class="top">
      <img src="~@/assets/image/bg_wallet.png" class="top_bg">
      <div class="top_content">
        <div class="balance">
          <span>{{total?total:'0.00'}}</span>
          <span class="yuan">元</span>
        </div>
        <div class="all">
          <div>总资产折合人民币</div>
        </div>
      </div>
    </div>
    <div @click="itemClick('db')" class="height-120">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_db.png" alt>
        <div class="margin-left-20">点钻</div>
      </div>
      <div class="right">
        <div class="right_text">
          <div class="balance_num">{{token}}</div>
        </div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div @click="itemClick('rmb')" class="height-120">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_rmb.png" alt>
        <div class="margin-left-20">人民币</div>
      </div>
      <div class="right">
        <div class="right_text">
          <div class="balance_num">{{rmb?rmb:'0.00'}}</div>
        </div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div @click="itemClick('candy')" class="height-120">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_candy.png" alt>
        <div class="margin-left-20">糖果卡</div>
      </div>
      <div class="right">
        <div class="right_text">
          <div class="balance_num">{{candy?candy:'0.00'}}</div>
        </div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div @click="itemClick('trx')" class="height-120">
      <div class="left">
        <img class="icon" src="~@/assets/image/icon_trx.png" alt>
        <div class="margin-left-20">TRX</div>
      </div>
      <div class="right">
        <div class="right_text">
          <div class="balance_num">{{trx?trx:'0.00'}}</div>
        </div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Wallet",
  data() {
    return {
      total: 0,
      token: 0,
      rmb: 0,
      candy: 0,
      trx: 0
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wallet/queryWalletOverview"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.data = response.data.data;
            this.total =  response.data.data.total;
            this.token =  response.data.data.token;
            this.rmb =  response.data.data.rmb;
            this.candy =  response.data.data.candy;
            this.trx =  response.data.data.trx;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    itemClick(type) {
      switch (type) {
        case "db":
          this.$router.push({
            path: "/WalletItemDetail",
            query: {
              formType: 1
            }
          });
          break;
        case "rmb":
          this.$router.push({
            path: "/WalletItemDetail",
            query: {
              formType: 2
            }
          });
          break;
        case "candy":
          this.$router.push({
            path: "/PayCandyCard"
          });
          break;
        case "trx":
          this.$router.push({
            path: "/WalletItemTrx"
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 374px;
  position: relative;
  .top_bg {
    position: absolute;
    width: 100%;
    height: 374px;
  }
  .top_content {
    position: absolute;
    width: 100%;
    height: 374px;
    .balance {
      height: 100px;
      line-height: 100px;
      margin-top: 100px;
      text-align: center;
      font-size: 100px;
      color: #fff;
    }
    .yuan {
      font-size: 50px;
    }
    .all {
      margin-top: 20px;
      text-align: center;
      font-size: 28px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.height-120 {
  margin-top: 1px;
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
    .icon{
      width: 60px;
      height: 60px;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
    .right_text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .balance_num {
      line-height: 45px;
      font-size: 32px;
      color: #051426;
    }
    .arrow {
      width: 12px;
      height: 21px;
      margin-left: 12px;
    }
  }
  .margin-left-20 {
    margin-left: 20px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #051426;
  }
}
</style>