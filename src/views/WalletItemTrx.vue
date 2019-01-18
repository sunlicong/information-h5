<template>
  <div>
    <div class="h-220">
      <div class="fs-70 ml-30">{{ $formatMoney(num,2) }}</div>
      <div class="fs-36">≈￥{{ $formatMoney(rmbTotalAmount,1) }}</div>
    </div>

    <div v-if="list.length==0" class="non">
      <img src="~@/assets/image/img_non.png">
      <div>暂时还没有数据哦～</div>
    </div>
    <mu-load-more class="list" :loading="loading" @load="loadMore">
      <div class="height-120" v-for="item in list" v-bind:key="item.time">
        <div class="left margin-left-30">
          <div class="title">{{getTypeName(item.type)}}{{item.status==50?'中':''}}</div>
          <div class="time">{{$formatDate(item.time/1000,3)}}</div>
        </div>
        <div class="right">
          <div
            class="num"
          >{{item.type==2||item.type==5||item.type==18||item.type==20||item.type==21||item.type==22||item.type==24||item.type==28||(formType==1&&item.type==32)||(formType==2&&item.type==31)?'-':'+'}}{{item.count}}TRX</div>
        </div>
      </div>
    </mu-load-more>

    <!-- 本地钱包 -->
    <div v-if="formType == 1" class="bottom">
      <mt-button class="button1" @click="recharge()">充值</mt-button>
      <mt-button class="button2" @click="withdrawal()">提现</mt-button>
    </div>

    <!-- 云钱包 -->
    <div v-if="formType == 2" class="bottom">
      <mt-button class="button1" @click="onCloudInClick">转入</mt-button>
      <mt-button class="button2" @click="onCloudOutClick">转出</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletItemTrx",

  data() {
    return {
      loading: false,
      next: 0,
      num: '0.00000', // trx 资产总额
      // pedingDrawAmount: 0, // 待提取的人民币收益
      rmbTotalAmount: '0.00', // 人民币余额
      list: [],
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
     * 转入云钱包
     */
    onCloudInClick: function(event) {
      this.$router.push({
        path: "/WalletCloudInOrOut",
        query: {
          cloudType: 1
        }
      });
    },

    /**
     * 云钱包转出
     */
    onCloudOutClick: function(event) {
      this.$router.push({
        path: "/WalletCloudInOrOut",
        query: {
          cloudType: 2
        }
      });
    },

    loadMore() {
      if (this.next == -1) return;
      this.loading = true;
      this.requestData();
    },
    /**
     * 获取trx明细
     */
    requestData() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wallet/queryTRXBillList",
        data: {
          next: this.next,
          walletType: this.formType // 1-本地  2-云
        }
      })
        .then(response => {
          this.loading = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.list = this.list.concat(response.data.data.data);
            this.num = response.data.data.totalAmount;
            // this.pedingDrawAmount = response.data.data.pedingDrawAmount;
            this.rmbTotalAmount = response.data.data.rmbTotalAmount;
            this.next = response.data.data.next;
          }
        })
        .catch(response => {
          this.loading = false;
          this.$ui.Indicator.close();
        });
    },
    /**
     * 待提取分红
     */
    goBonus() {
      this.$router.push({
        path: "/WalletItemBonus"
      });
    },
    getTypeName(type) {
      var name = "";
      switch (type) {
        case 1:
          name = "充值";
          break;
        case 2:
          name = "提现";
          break;
        case 4:
          name = "赞赏奖励";
          break;
        case 5:
          name = "消费";
          break;
        case 6:
          name = "点赞奖励";
          break;
        case 7:
          name = "购买";
          break;
        case 8:
          name = "奖池奖励";
          break;
        case 9:
          name = "邀请奖励";
          break;
        case 10:
          name = "分红";
          break;
        case 11:
          name = "作品赞赏奖励";
          break;
        case 12:
          name = "作品点赞奖励";
          break;
        case 13:
          name = "分享作品奖励";
          break;
        case 14:
          name = "邀请注册奖励";
          break;
        case 15:
          name = "注册奖励";
          break;
        case 16:
          name = "注册分享奖励";
          break;
        case 17:
          name = "";
          break;
        case 18:
          name = "提现";
          break;
        case 19:
          name = "分红";
          break;
        case 20:
          name = "分红提取";
          break;
        case 21:
          name = "手续费";
          break;
        case 22:
        case 24:
          name = "购买糖果卡";
          break;
        case 28:
          name = "发红包";
          break;
        case 29:
          name = "领红包";
          break;
        case 30:
          name = "红包退还";
          break;
        case 31:
          name = "云钱包转出";
          break;
        case 32:
          name = "转入云钱包";
          break;
      }
      return name;
    },
    /**
     * 充值
     */
    recharge() {
      this.$router.push({
        path: "/Recharge"
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
.h-220 {
  width: 100%;
  height: 220px;
  background-image: url(~@/assets/image/bg_wallet_detail.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
  box-sizing: border-box;
}

.fs-70 {
  font-family: PingFangSC-Medium;
  font-size: 70px;
  line-height: 98px;
  color: white;
}

.fs-36 {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: white;
  line-height: 50px;
}

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
    display: flex;
    align-items: center;
    justify-content: center;
    .balance {
      height: 100px;
      line-height: 100px;
      font-size: 70px;
      color: #fff;
      display: flex;
    }
    .yuan {
      margin-left: 20px;
      margin-top: 15px;
      font-size: 36px;
    }
  }
  .top_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
    }
    .right {
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
    }
    .arrow {
      width: 12px;
      height: 21px;
      margin-left: 12px;
    }
  }
}
.list {
  padding-bottom: 98px;
}
.height-120 {
  margin-top: 2px;
  width: 100%;
  height: 120px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.left .title {
  font-size: 32px;
  color: #051426;
}
.left .time {
  font-size: 24px;
  color: #a3aeba;
}
.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
}
.margin-left-30 {
  margin-left: 30px;
}
.num {
  line-height: 45px;
  font-size: 32px;
  color: #fe6503;
}
.non {
  margin-top: 110px;
  text-align: center;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #9b9b9b;
  img {
    width: 290px;
    height: 396px;
  }
}
.bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  font-size: 36px;
  color: #fff;
  align-items: center;
  .button1 {
    margin-top: 15px;
    margin-left: 25px;
    width: 335px;
    height: 90px;
    background: #ff6700;
    border-radius: 8px;
    font-size: 36px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 50px;
  }
  .button2 {
    margin-top: 15px;
    margin-left: 25px;
    width: 335px;
    height: 90px;
    border-radius: 8px;
    border: 2px solid #ff6700;
    background: #ffffff;
    font-size: 36px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ff6700;
    line-height: 50px;
  }
}
</style>
