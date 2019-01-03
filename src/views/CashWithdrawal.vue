<template>
  <div>
    <div class="title">
      <img class="icon" src="~@/assets/image/icon_trx.png" alt>
      <span class="name">TRX</span>
    </div>
    <div class="address_view">
      <div class="address_title">
        <div class="text1">提现地址</div>
        <div class="text2" @click="addManager()">管理提现地址</div>
      </div>
      <div class="content">
        <div>
          <span>备注</span>
          <span>{{userWithDrawAddress.remark}}</span>
        </div>
        <div class="address">{{userWithDrawAddress.withdrawAddress}}</div>
      </div>
    </div>
    <div class="amount">
      <div class="amount_title">
        <div class="text1">提现金额</div>
        <div class="price">
          <span>￥</span>
          <input type="text" placeholder="最小提现金额为100TRX" v-model="price">
        </div>
      </div>
      <div class="desc">
        <div class="text1">可提现金额：{{balance}}TRX</div>
        <div class="text1">手续费：1TRX,以实际交易为准</div>
        <div class="text3">实际到账金额：{{price>0?price-1:0}}</div>
      </div>
    </div>
    <mt-button class="button" @click="withdraw()">确认提现</mt-button>
    <div class="tip">收到提现申请并审核后实时提现，具体到账时间以区块为准</div>
  </div>
</template>
<script>
export default {
  name: "CashWithdrawal",
  data() {
    return {
      coinName: this.$route.query.coinName,
      price: "",
      balance: 0,
      userWithDrawAddress: {
        id: 0,
        withdrawAddress: "",
        remark: ""
      }
    };
  },
  mounted() {
    this.queryProfile();
  },
  methods: {
    /**
     * 查询
     */
    queryProfile() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wxpay/getWithdrawInfo",
        data: {
          coinName: this.coinName
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.balance = response.data.data.balance;
            this.userWithDrawAddress = response.data.data.userWithDrawAddress;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 提现
     */
    withdraw() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/wxpay/withdraw",
        data: {
          toAddress: this.userWithDrawAddress.withdrawAddress,
          tokenAmount: this.price
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("提现成功");
            this.$router.go(-1);
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    addManager() {
      this.$router.push({
        path: "/CashAddressManager"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  background-color: white;
  .icon {
    margin-left: 30px;
    width: 60px;
    height: 60px;
  }
  .name {
    flex: 1;
    margin-left: 15px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #2a2e3f;
  }
}
.address_view {
  margin-top: 20px;
  width: 100%;
  background: #ffffff;
  .address_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
    height: 110px;
    border-bottom: 2px solid #dedede;
    .text1 {
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #333333;
    }
    .text2 {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #a1a1a1;
    }
  }
  .content {
    padding: 30px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #051426;
    line-height: 40px;
    .address {
      margin-top: 10px;
    }
  }
}
.amount {
  margin-top: 20px;
  width: 100%;
  height: 327px;
  background: #ffffff;
  .amount_title {
    width: 100%;
    height: 150px;
    border-bottom: 2px solid #dedede;
    padding-top: 40px;
    .text1 {
      margin-left: 30px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #a1a1a1;
    }
    .price {
      margin-left: 30px;
      line-height: 60px;
      span {
        font-size: 42px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #333333;
      }
      input {
        margin-left: 20px;
        border: 0;
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
      }
    }
  }
  .desc {
    width: 100%;
    height: 175px;
    padding: 30px;
    .text3 {
      color: #ff6700;
    }
  }
}
.button {
  position: fixed;
  left: 50px;
  right: 50px;
  bottom: 150px;
  width: 650px;
  height: 98px;
  background-color: #ff6700;
  line-height: 98px;
  text-align: center;
  font-size: 36px;
  color: #fff;
  border-radius: 0;
}
.tip {
  position: fixed;
  bottom: 80px;
  width: 100%;
  text-align: center;
  font-size: 22px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #4a4a4a;
}
</style>