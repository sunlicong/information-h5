<template>
  <div>
    <!-- 转出金额 -->
    <div class="h-150">
      <div class="fs-28">转出金额</div>
      <div class="h-30 mt-15">
        <div class="fs-22">TRX</div>
        <!-- 云钱包转出 -->
        <input
          v-if="cloudType == 1"
          type="number"
          placeholder="最小转入金额为 10 TRX"
          v-model="money"
          class="input-style ml-10"
        >
        <!-- 转入云钱包 -->
        <input
          v-else-if="cloudType == 2"
          type="number"
          placeholder="请输入转出金额"
          v-model="money"
          class="input-style ml-10"
        >
      </div>
    </div>

    <!-- 可提现金额、手续费 -->
    <div class="h-130 mt-2">
      <div v-if="cloudType == 1" class="fs-22">可转入金额：{{cloudTrx}} TRX</div>
      <div v-else-if="cloudType == 2" class="fs-22">可提现金额：{{cloudTrx}} TRX</div>
      <div v-if="cloudType == 1" class="fs-22 mt-10">手续费：预计 0.04 TRX，以实际交易为准</div>
      <div v-else-if="cloudType == 2" class="fs-22 mt-10">手续费：0.04 TRX，未激活地址需 0.1 TRX 手续费</div>
    </div>

    <!-- 按钮 -->
    <div class="h-220">
      <mt-button v-if="cloudType == 1" class="s-650-90" @click="onCloudInClick">从本地钱包转入</mt-button>
      <mt-button v-else-if="cloudType == 2" class="s-650-90" @click="onCloudOutClick">转出到本地钱包</mt-button>
      <div v-if="cloudType == 1" class="fs-22 mt-30">发起转入请求后实时转入，具体到账时间以区块为准</div>
      <div v-else-if="cloudType == 2" class="fs-22 mt-30">发起转出请求后实时转出，具体到账时间以区块为准</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletCloudInOrOut",

  data() {
    return {
      money: "", // 输入的金额
      cloudType: this.$route.query.cloudType, // 1-转入云钱包  2-云钱包转出
      cloudTrx: "0.00" // 可提现金额
    };
  },

  mounted() {
    if (this.cloudType == 1) {
      document.title = "转入云钱包";
    } else if (this.cloudType == 2) {
      document.title = "云钱包转出";
    }

    this.requestData();
  },

  methods: {
    /**
     * 从本地钱包转入
     */
    onCloudInClick: function(event) {
      if (this.money) {
        if (Number(this.money) > Number(this.cloudTrx)) {
          this.$ui.Toast({
            message: "可转入余额不足",
            position: "middle",
            duration: 1500
          });
        } else if (Number(this.money) == 0) {
          this.$ui.Toast({
            message: "请输入大于 0 的金额",
            position: "middle",
            duration: 1500
          });
        } else {
          this.$ui.Indicator.open({
            text: "正在转入",
            spinnerType: "snake"
          });

          this.$axios({
            method: "get",
            url: "/blockchain/v1/wallet/transferCloudWallet",
            data: {
              amount: this.money
            }
          })
            .then(response => {
              this.$ui.Indicator.close();
              // 成功转入
              if (response.data.status) {
                this.$ui.Toast({
                  message: "已发起转入请求",
                  position: "middle",
                  duration: 1500
                });
              } else if (response.data.code == 30117) {
                this.$ui.MessageBox({
                  title: "转入云钱包",
                  message: "本地钱包 TRX 余额不足本次手续费，请修改转入金额"
                });
              }
            })
            .catch(response => {
              this.$ui.Indicator.close();
            });
        }
      } else {
        this.$ui.Toast({
          message: "请输入转入金额",
          position: "middle",
          duration: 1500
        });
      }
    },

    /**
     * 转出到本地钱包
     */
    onCloudOutClick: function(event) {
      if (this.money) {
        if (Number(this.money) > Number(this.cloudTrx)) {
          this.$ui.Toast({
            message: "可转出余额不足",
            position: "middle",
            duration: 1500
          });
        } else if (Number(this.money) == 0) {
          this.$ui.Toast({
            message: "请输入大于 0 的金额",
            position: "middle",
            duration: 1500
          });
        } else {
          this.$ui.Indicator.open({
            text: "正在转出",
            spinnerType: "snake"
          });

          this.$axios({
            method: "get",
            url: "/blockchain/v1/wallet/transferLocalWallet",
            data: {
              amount: this.money
            }
          })
            .then(response => {
              this.$ui.Indicator.close();
              // 成功转出
              if (response.data.status) {
                this.$ui.Toast({
                  message: "已发起转出请求",
                  position: "middle",
                  duration: 1500
                });
              } else if (response.data.code == 30117) {
                this.$ui.MessageBox({
                  title: "云钱包转出",
                  message: "云钱包 TRX 余额不足本次手续费，请修改转出金额"
                });
              }
            })
            .catch(response => {
              this.$ui.Indicator.close();
            });
        }
      } else {
        this.$ui.Toast({
          message: "请输入转出金额",
          position: "middle",
          duration: 1500
        });
      }
    },

    /**
     * 获取trx明细
     */
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
            this.cloudTrx = response.data.data.cloudTrx.amount;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    }
  }
};
</script>

<style lang="less" scoped>
.h-150 {
  width: 100%;
  height: 150px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
  box-sizing: border-box;
}

.fs-28 {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #a1a1a1;
  line-height: 40px;
}

.h-30 {
  height: 30px;
  display: flex;
}

.mt-2 {
  margin-top: 2px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-15 {
  margin-top: 15px;
}

.mt-30 {
  margin-top: 30px;
}

.ml-10 {
  margin-left: 10px;
}

.fs-22 {
  font-family: PingFangSC-Regular;
  font-size: 22px;
  color: #051426;
  line-height: 30px;
}

.input-style {
  border: 0;
  width: 400px;
  height: 30px;
}

.h-130 {
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #fff;
}

.h-220 {
  width: 100%;
  height: 220px;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.s-650-90 {
  width: 650px;
  height: 90px;
  background-color: #ff6700;
  border-radius: 8px;
  border: 0;
  font-family: PingFangSC-Regular;
  font-size: 36px;
  line-height: 50px;
  color: white;
}
</style>
