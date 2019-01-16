<template>
  <div>

    <!-- 云钱包 -->
    <!-- <div v-if="formType == 2" class="bottom">
      <mt-button class="button1" @click="onCloudInClick">转入</mt-button>
      <mt-button class="button2" @click="onCloudOutClick">转出</mt-button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "WalletCloudInOrOut",
  
  data() {
    return {
      formType: this.$route.query.formType // 1-本地钱包  2-云钱包
    };
  },

  mounted() {
    if (this.formType == 2) {
      document.title = "云钱包TRX";
    }
    this.$ui.Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    });
    this.requestData();
  },

  methods: {
    /**
     * 获取trx明细
     */
    requestData() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wallet/queryTRXBillList",
        data: {
          next: this.next,
          walletType: this.formType,  // 1-本地  2-云
        }
      })
        .then(response => {
          this.loading = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.list = this.list.concat(response.data.data.data);
            this.num = response.data.data.totalAmount;
            this.pedingDrawAmount = response.data.data.pedingDrawAmount;
            this.next = response.data.data.next;
          }
        })
        .catch(response => {
          this.loading = false;
          this.$ui.Indicator.close();
        });
    },
    /**
     * 提现
     */
    withdrawal() {
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
    }
  }
};
</script>

<style lang="less" scoped>
</style>
