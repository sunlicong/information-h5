<template>
  <div>
    <div class="top">
      <img src="~@/assets/image/bg_wallet_bonus.png" class="top_bg">
      <div class="top_content">
        <div class="name">待提取分红</div>
        <div class="balance one_line">
          <div>{{balance?balance:'0.00'}}TRX</div>
        </div>
      </div>
    </div>
    <div v-if="list.length==0" class="non">
      <img src="~@/assets/image/img_non.png">
      <div>暂时还没有数据哦～</div>
    </div>
    <mu-load-more class="list" :loading="loading" @load="loadMore">
      <div class="height-120" v-for="item in list">
        <div class="left margin-left-30">
          <div class="title">{{getTypeName(item.type)}}</div>
          <div class="time">{{$formatDate(item.time/1000,3)}}</div>
        </div>
        <div class="right">
          <div
            class="num"
          >{{item.type==2||item.type==5||item.type==18||item.type==20||item.type==21||item.type==24?'-':'+'}}{{item.count}}TRX</div>
        </div>
      </div>
    </mu-load-more>
    <mt-button :disabled="balance==0" class="button" :class="balance==0?'disabledBg':''" @click.native="showDialogDraw()">提取分红</mt-button>
  </div>
</template>
<script>
export default {
  name: "WalletItemBonus",
  data() {
    return {
      loading: false,
      formType: this.$route.query.formType, //1-点钻 2-人民币
      balance: 0,
      next: 0,
      list: []
    };
  },
  mounted() {
    this.$ui.Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    });
    this.requestData();
  },
  methods: {
    loadMore() {
      if (this.next == -1) return;
      this.loading = true;
      this.requestData();
    },
    /**
     * 获取数据
     */
    requestData() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wallet/queryPedingDrawBillList",
        data: {
          next: this.next
        }
      })
        .then(response => {
          this.loading = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.list = this.list.concat(response.data.data.data);
            this.next = response.data.data.next;
            this.balance = response.data.data.totalAmount;
          }
        })
        .catch(response => {
          this.loading = false;
          this.$ui.Indicator.close();
        });
    },
    /**
     * 提取 手续费弹框
     */
    showDialogDraw() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/getDrawTRXFee"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            if (this.balance < response.data.data.fee) {
              this.$ui
                .MessageBox({
                  title: "提取分红",
                  message: "待提取分红不足转账手续费,请稍后提取",
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonText: "知道了"
                })
                .then(action => {});
            } else {
              this.$ui
                .MessageBox({
                  title: "提取分红",
                  message:
                    "提取分红后，系统将待提取分红转入用户地址，将自动扣除手续费" +
                    response.data.data.fee +
                    "TRX",
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonText: "确定提取"
                })
                .then(action => {
                  if (action == "confirm") {
                    this.drawTRX();
                  }
                });
            }
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 提取分红
     */
    drawTRX() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/drawTRX"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("提取成功");
            this.list = [];
            this.next = 0;
            this.requestData();
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
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
        case 24:
          name = "购买糖果卡";
          break;
      }
      return name;
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 374px;
  background: #fff;
  position: relative;
  .top_bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 92px;
  }
  .top_content {
    position: absolute;
    width: 100%;
    height: 374px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .name {
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #a3aeba;
    }
    .balance {
      margin-top: 30px;
      height: 70px;
      line-height: 70px;
      font-size: 70px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #ff6700;
      display: flex;
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
.button {
  position: fixed;
  left: 50px;
  right: 50px;
  bottom: 25px;
  width: 650px;
  height: 98px;
  background-color: #ff6700;
  line-height: 98px;
  text-align: center;
  font-size: 36px;
  color: #fff;
  border-radius: 0;
}
.disabledBg{
  background: #a1a1a1;
  opacity: 1;
}
</style>
