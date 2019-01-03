<template>
  <div class="PayCandyCard">
    <div class="top">
      <img class="top_bg" src="~@/assets/image/bg_candy_card.png">
      <div class="candy_banace">
        <div class="banace">糖果卡余额：{{candyCount}}糖果</div>
        <div class="right" @click="goBill()">
          <div>明细</div>
          <img class="arrow" src="~@/assets/image/arrows_right.png">
        </div>
      </div>
      <div class="card">
        <div class="name">糖果卡</div>
        <div class="candy">
          <div>{{selectContent.count+selectContent.giveCount}}</div>
          <div class="unit">糖果</div>
        </div>
      </div>
    </div>
    <div class="candy_list">
      <div class="title">选择糖果卡</div>
      <div class="list">
        <div
          class="list_card"
          :class="[selectCandy!=index?'border':'border-none']"
          v-for="(item,index) in candyList"
          @click="selectCandyClick(index)"
        >
          <img v-if="selectCandy==index" class="box_bg" src="~@/assets/image/icon_select_box.png">
          <div class="text1">
            <span>{{item.price}}</span>
            <span class="text2">糖果</span>
          </div>
          <!-- <div>赠送5糖果</div> -->
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <span>{{selectContent.price}}</span>
        <span class="yuan">元</span>
      </div>
      <mt-button class="buy_card" @click="buy()">购卡</mt-button>
    </div>
    <mt-popup class="dialog_box" v-model="popupPayVisible" position="bottom">
      <div class="title_view">
        <div class="left" @click="cancelPay()">取消</div>
        <div class="title">确认支付</div>
        <div class="right"></div>
      </div>
      <div class="line"></div>
      <div class="price_view">
        <div class="price">
          <div class="trx">{{trxNum}}TRX</div>
          <div class="rmb">≈ ￥{{selectContent.price}}</div>
        </div>
        <div class="tip">实时读取交易价格，以最终支付金额为准</div>
      </div>
      <div class="item">
        <div class="left">订单信息</div>
        <div class="right">购买糖果</div>
      </div>
      <div class="item" @click="selectPayList">
        <div class="left">支付方式</div>
        <div class="right">
          <img class="icon" src="~@/assets/image/icon_trx.png" alt>
          <span>波场TRON</span>
          <img class="arrow" src="~@/assets/image/arrows_right.png">
        </div>
      </div>
      <mt-button class="pay" @click="buyCardtoTrx()">确认支付</mt-button>
    </mt-popup>
    <mt-popup class="dialog_box" v-model="selectPayTypePop" position="bottom">
      <div class="title_view">
        <div class="left" @click="cancelSelect()">
          <img src="~@/assets/image/icon_back.png" alt="">
        </div>
        <div class="title">选择支付方式</div>
        <div class="right"></div>
      </div>
      <div class="line"></div>
      <div class="payItem" v-for="(item,index) in payChannelList" @click="cancelSelect()">
        <img class="icon" src="~@/assets/image/icon_trx.png" alt>
        <div class="info">
          <div class="name">波场TRON</div>
          <div class="balance">余额：{{item.balance}}TRX</div>
        </div>
        <div class="right">
          <img src="~@/assets/image/icon_duihao.png" alt="">
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "PayCandyCard",
  data() {
    return {
      candyCount: 0,
      selectContent: {
        count: 0,
        giveCount: 0,
        price: 0
      },
      trxNum: 0,
      selectCandy: 0,
      candyList: [],
      popupPayVisible: false, //购买弹框
      selectPayTypePop: false, //支付方式弹框
      payChannelList: [],//支付方式列表
    };
  },
  mounted() {
    this.getCandyList();
  },
  methods: {
    /**
     * 获取套餐列表
     */
    getCandyList() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/candy/getCandyList"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.candyCount = response.data.data.candyCount;
            this.candyList = response.data.data.candyList;
            this.selectContent = response.data.data.candyList[0];
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 进入账单
     */
    goBill() {
      this.$router.push({
        path: "/CandyBill"
      });
    },
    /**
     * 选择套餐
     */
    selectCandyClick(index) {
      this.selectCandy = index;
      this.selectContent = this.candyList[index];
    },
    /**
     * 购买
     */
    buy() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wxpay/getTRXPrice",
        data: {
          candyId: this.selectContent.id
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.trxNum = response.data.data.coinPrice;
            this.payChannelList = response.data.data.payChannelList;
            this.popupPayVisible = true;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 打开选择支付列表弹框
     */
    selectPayList(){
      this.selectPayTypePop = true
    },
    /**
     * 取消
     */
    cancelPay() {
      this.popupPayVisible = false;
    },
    /**
     * 选择框的返回
     */
    cancelSelect() {
      this.selectPayTypePop = false;
    },
    /**
     * 购买套餐 人民币
     */
    buyCard() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wxpay/doPayMock",
        data: {
          candyId: this.selectContent.id
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("购买成功");
            this.getCandyList();
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 用trx购买套餐
     */
    buyCardtoTrx() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wxpay/doTRXPay",
        data: {
          candyId: this.selectContent.id
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          this.popupPayVisible = false;
          if (response.data.status) {
            this.$ui.Toast("购买成功,糖果稍后到账");
            this.getCandyList();
          } else if (response.data.code == 30105) {
            this.$ui
              .MessageBox({
                title: "余额不足",
                message: "可用余额不足，马上充值TRX",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "去充值",
                cancelButtonText: "取消"
              })
              .then(action => {
                if (action == "confirm") {
                  this.$router.push({
                    path: "/Recharge"
                  });
                }
              });
          }
        })
        .catch(response => {
          this.popupPayVisible = false;
          this.$ui.Indicator.close();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.PayCandyCard{
  padding-bottom: 130px;
}
.top {
  width: 100%;
  height: 472px;
  background: #fff;
  .candy_banace {
    height: 100px;
    display: flex;
    align-items: center;
    .banace {
      flex: 1;
      margin-left: 30px;
      font-size: 34px;
      color: #051426;
    }
    .right {
      display: flex;
      align-items: center;
      margin-right: 30px;
      font-size: 28px;
      color: #a3aeba;
    }
  
    .arrow {
      width: 12px;
      height: 21px;
      margin-left: 12px;
    }
  }
  .top_bg {
    position: absolute;
    margin-top: 105px;
    margin-left: 30px;
    margin-right: 30px;
    width: 690px;
    height: 324px;
  }
  .card {
    margin-top: 5px;
    margin-left: 30px;
    margin-right: 30px;
    height: 324px;
    border-radius: 10px;
    position: relative;
    .name {
      position: absolute;
      margin-left: 35px;
      margin-top: 31px;
      font-size: 34px;
      color: #fff;
    }
    .candy {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 72px;
      color: #fff;
      justify-content: center;
    }
    .unit {
      font-size: 24px;
      margin-top: 20px;
      margin-left: 8px;
    }
  }
}
.candy_list {
  margin-top: 20px;
  padding-top: 36px;
  padding-bottom: 46px;
  background: #fff;
  .title {
    margin-left: 30px;
    font-size: 32px;
    color: #051426;
  }
  .list {
    width: 100%;
    display: inline-block;
    .list_card {
      display: inline-block;
      margin-left: 30px;
      margin-top: 30px;
      width: 210px;
      height: 120px;
      border-radius: 8px;
      text-align: center;
      font-size: 24px;
      color: #a3aeba;
      position: relative;
      .text1 {
        margin-top: 35px;
        height: 50px;
        font-size: 36px;
        color: #051426;
      }

      .text2 {
        font-size: 24px;
      }
    }
    .box_bg {
      position: absolute;
      display: block;
      width: 210px;
      height: 120px;
    }
    .border {
      border: 2px solid #a3aeba;
    }

    .border-none {
      border: 0;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120px;
  background: #fff;
  display: flex;
  align-items: center;
  .bottom_left {
    margin-left: 30px;
    flex: 1;
    text-align: left;
    font-size: 48px;
    color: #ff6700;
    font-weight:600;
    .yuan {
      font-size: 24px;
      color: #ff6700;
    }
  }

  .buy_card {
    margin-right: 30px;
    width: 260px;
    height: 88px;
    line-height: 88px;
    background: #0794fc;
    border-radius: 8px;
    font-size: 34px;
    color: #fff;
    text-align: center;
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
      img{
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
      white-space: nowrap;
      overflow: hidden;
      display: flex;
    }
    .trx {
      width: 70%;
      padding-right: 20px;
      text-align: right;
    }
    .rmb {
      text-align: left;
      width: 30%;
      height: 90px;
      line-height: 90px;
      font-size: 36px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #a3aeba;
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
  .payItem{
    width: 100%;
    height: 108px;
    border-bottom: 1px solid #dedede;
    display: flex;
    align-items: center;
    .icon{
      margin-left: 30px;
      width: 60px;
      height: 60px;
    }
    .info{
      margin-left: 15px;
      flex: 1;
      .name{
        margin-top: 13px;
        height: 40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#2A2E3F;
        line-height:40px;
      }
      .balance{
        margin-top: 10px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#A3AEBA;
        line-height:33px;
      }
    }
    .right{
      margin-right: 40px;
      img{
        width: 30px;
        height: 25px;
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