<template>
  <div>
    <!-- 总资产 -->
    <div class="h-374">
      <img src="~@/assets/image/bg_wallet.png" class="h-374-abs">
      <div class="h-374-abs">
        <div class="fs-28 mt-46 ml-30">总资产折合（CNY）</div>
        <div class="h-72 mt-14">
          <div class="fs-28 ml-30">￥</div>
          <div class="fs-72 ml-12">{{ userTotal }}</div>
        </div>
        <div class="h-130 mt-33">
          <!-- 本地钱包 -->
          <div
            v-bind:class="[s_330_130, currentItem == 1 ? border_ff : border_00]"
            @click="onQianBaoClick(1)"
          >
            <div class="fs-28-r ml-20 mt-16">本地钱包</div>
            <div class="fs-28-r ml-20 mt-9">￥{{ localTotal }}</div>
          </div>
          <!-- 云钱包 -->
          <div
            v-bind:class="[s_330_130, currentItem == 2 ? border_ff : border_00]"
            @click="onQianBaoClick(2)"
          >
            <div class="fs-28-r ml-20 mt-16">云钱包</div>
            <div
              class="fs-28-r ml-20 mt-9"
            >{{ cloudTotal.rmbAmount }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 充值、提现、发红包、发送中的红包 -->
    <div class="h-152">
      <!-- 充值 -->
      <div class="s-25-152" @click="onFourTabClick(0)">
        <img src="~@/assets/image/icon_wallet_0.png" class="s-45-51">
        <div class="fs-28-05 mt-14">充值</div>
      </div>
      <!-- 提现 -->
      <div class="s-25-152" @click="onFourTabClick(1)">
        <img src="~@/assets/image/icon_wallet_1.png" class="s-43-42">
        <div class="fs-28-05 mt-14">提现</div>
      </div>
      <!-- 发红包 -->
      <div class="s-25-152" @click="onFourTabClick(2)">
        <img src="~@/assets/image/icon_wallet_2.png" class="s-41-48">
        <div class="fs-28-05 mt-14">发红包</div>
      </div>
      <!-- 发送中的红包 -->
      <div class="s-25-152" @click="onFourTabClick(3)">
        <img src="~@/assets/image/icon_wallet_3.png" class="s-47-51">
        <div class="fs-28-05 mt-14">发送中的红包</div>
      </div>
    </div>

    <!-- 资产 -->
    <div class="h-80 mt-20">
      <div class="fs-28-05 ml-30">资产</div>
    </div>

    <!-- TRX -->
    <div class="h-120 mt-1" @click="itemClick('trx')">
      <!-- 图标 -->
      <div class="s-200-120">
        <img src="~@/assets/image/icon_trx.png" class="s-50">
        <div class="fs-32 ml-20">TRX</div>
      </div>
      <!-- 钱 -->
      <div class="s-300-120">
        <div class="qian-box">
          <div class="fs-32">{{ currentItem == 1 ? Number(trx.amount) : Number(cloudTrx.amount) }}</div>
          <div class="fs-24">{{ currentItem == 1 ? trx.rmbAmount : cloudTrx.rmbAmount }}</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>

    <!-- Fcion 点钻 -->
    <div v-if="currentItem == 1" class="h-120 mt-1" @click="itemClick('db')">
      <!-- 图标 -->
      <div class="s-200-120">
        <img src="~@/assets/image/icon_db.png" class="s-50">
        <div class="fs-32 ml-20">Fcion</div>
      </div>
      <!-- 钱 -->
      <div class="s-300-120">
        <div class="qian-box-r">
          <div class="fs-32">{{ Number(token.amount) }}</div>
          <div class="fs-24">{{ token.rmbAmount }}</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>

    <!-- 人民币 -->
    <div v-if="currentItem == 1" class="h-120 mt-1" @click="itemClick('rmb')">
      <!-- 图标 -->
      <div class="s-200-120">
        <img src="~@/assets/image/icon_rmb.png" class="s-50">
        <div class="fs-32 ml-20">人民币</div>
      </div>
      <!-- 钱 -->
      <div class="s-300-120">
        <div class="qian-box">
          <div class="fs-32">{{ rmb.amount }}</div>
          <div class="fs-24">{{ rmb.rmbAmount }}</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>

    <!-- 糖果卡 -->
    <div v-if="currentItem == 1" class="h-120 mt-1" @click="itemClick('candy')">
      <!-- 图标 -->
      <div class="s-200-120">
        <img src="~@/assets/image/icon_candy.png" class="s-50">
        <div class="fs-32 ml-20">糖果卡</div>
      </div>
      <!-- 钱 -->
      <div class="s-300-120">
        <div class="qian-box-r">
          <div class="fs-32">{{ Number(candy.amount) }}</div>
          <div class="fs-24">~</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>

    <div class="h-120-no"></div>
  </div>
</template>

<script>
export default {
  name: "Wallet",

  data() {
    return {
      userTotal: "0.00", // 总资产
      localTotal: "0.00", // 本地钱包
      token: {}, // 代币
      rmb: {}, // 人民币
      candy: {}, // 糖果
      trx: {}, // trx 资产
      cloudTrx: {}, // trx 云资产
      cloudTotal: {"rmbAmount" : "￥0.00"}, // 云钱包     amount -- 数量    rmbAmount -- 对应人民币数量
      currentItem: 1, // 1-本地钱包  2-云钱包
      border_ff: "border-4-ff",
      border_00: "border-4-00",
      s_330_130: "s-330-130"
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
        url: "/blockchain/v1/wallet/queryWalletOverviewV2"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.data = response.data.data;
            this.userTotal = response.data.data.userTotal;
            this.localTotal = response.data.data.localTotal;
            this.token = response.data.data.token;
            this.rmb = response.data.data.rmb;
            this.candy = response.data.data.candy;
            this.trx = response.data.data.trx;
            this.cloudTrx = response.data.data.cloudTrx;
            this.cloudTotal = response.data.data.cloudTotal;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },

    /**
     * 本地钱包，云钱包 点击事件
     */
    onQianBaoClick(type) {
      if (this.currentItem == type) {
        return;
      }

      if (type == 1) {
        // 本地钱包
        this.currentItem = 1;
      } else if (type == 2) {
        // 云钱包
        this.currentItem = 2;
      }
    },

    onFourTabClick(tabType) {
      if (tabType == 0) {
        // 充值
        this.$router.push({
          path: "/Recharge"
        });
      } else if (tabType == 1) {
        // 提现
        this.$ui.Indicator.open({
          text: "加载中...",
          spinnerType: "snake"
        });
        this.$axios({
          method: "get",
          url: "/blockchain/v1/wxpay/getWithdrawInfo",
          data: {
            coinName: "trx"
          }
        })
          .then(response => {
            this.$ui.Indicator.close();
            if (response.data.status) {
              var userWithDrawAddress = response.data.data.userWithDrawAddress;
              if (userWithDrawAddress) {
                this.$router.push({
                  path: "/CashWithdrawal",
                  query: {
                    coinName: "trx"
                  }
                });
              } else {
                this.$ui
                  .MessageBox({
                    title: "添加提现地址",
                    message: "提现需添加提现地址后可使用",
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText: "去添加",
                    cancelButtonText: "取消"
                  })
                  .then(action => {
                    if (action == "confirm") {
                      this.$router.push({
                        path: "/CashAddressAdd"
                      });
                    }
                  });
              }
            }
          })
          .catch(response => {
            this.$ui.Indicator.close();
          });
      } else if (tabType == 2) {
        // 发红包
        this.$router.push({
          path: "/SendRedPack"
        });
      } else if (tabType == 3) {
        // 发送中的红包
        this.$router.push({
          path: "/PacketInSend"
        });
      }
    },

    itemClick(type) {
      switch (type) {
        case "db": // 点钻
          this.$router.push({
            path: "/WalletItemDetail",
            query: {
              formType: 1
            }
          });
          break;
        case "rmb": // 人民币
          this.$router.push({
            path: "/WalletItemDetail",
            query: {
              formType: 2
            }
          });
          break;
        case "candy": // 糖果卡
          this.$router.push({
            path: "/PayCandyCard"
          });
          break;
        case "trx": // TRX
          this.$router.push({
            path: "/WalletItemTrx",
            query: {
              formType: this.currentItem // 1-本地钱包  2-云钱包
            }
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
.h-374 {
  width: 100%;
  height: 374px;
  position: relative;
}

.h-374-abs {
  width: 100%;
  height: 374px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
}

.fs-28 {
  line-height: 40px;
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: white;
}

.mt-1 {
  margin-top: 1px;
}

.mt-9 {
  margin-top: 9px;
}

.mt-14 {
  margin-top: 14px;
}

.mt-16 {
  margin-top: 16px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-46 {
  margin-top: 46px;
}

.mt-33 {
  margin-top: 33px;
}

.ml-20 {
  margin-left: 20px;
}

.ml-30 {
  margin-left: 30px;
}

.h-72 {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: flex-end;
}

.fs-72 {
  line-height: 72px;
  font-family: PingFangSC-Medium;
  font-size: 72px;
  color: white;
}

.h-130 {
  width: 100%;
  height: 130px;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
  justify-content: space-between;
}

.s-330-130 {
  width: 330px;
  height: 130px;
  border-radius: 16px;
  background-image: url(~@/assets/image/bg_wallet_card.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-sizing: border-box;
}

.border-4-00 {
  border: 2px solid #0000;
}

.border-4-ff {
  border: 2px solid #d0d5ff;
}

.fs-28-r {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: white;
  line-height: 40px;
}

.h-152 {
  width: 100%;
  height: 152px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
}

.s-25-152 {
  width: 25%;
  height: 152px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.s-45-51 {
  width: 45px;
  height: 51px;
}

.s-43-42 {
  width: 43px;
  height: 42px;
}

.s-41-48 {
  width: 41px;
  height: 48px;
}

.s-47-51 {
  width: 47px;
  height: 51px;
}

.fs-28-05 {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #051426;
  line-height: 40px;
}

.h-80 {
  width: 100%;
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
}

.h-120 {
  width: 100%;
  height: 120px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}

.s-200-120 {
  width: 200px;
  height: 120px;
  display: flex;
  align-items: center;
}

.s-300-120 {
  width: 300px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.s-50 {
  width: 50px;
  height: 50px;
}

.fs-32 {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #051426;
  line-height: 45px;
}

.qian-box {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qian-box-r {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}



.fs-24 {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #a3aeba;
  line-height: 33px;
}

.s-12-21 {
  width: 12px;
  height: 21px;
}

.h-120-no {
  width: 100%;
  height: 120px;
  background: transparent;
}
</style>