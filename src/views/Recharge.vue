<template>
  <div class="Recharge">
    <div class="name">
      <img src="~@/assets/image/icon_trx.png" alt>
      <div class="margin-left-20">TRX</div>
    </div>
    <div class="content">
      <div class="text1">TRX充值地址</div>
      <img class="qr" :src="$url(qrCode)" alt>
      <div class="text2">{{rechargeAddress}}</div>
      <mt-button class="copy" @click="copy()">复制地址</mt-button>
    </div>
    <div class="tip">
      <div class="title">充值须知</div>
      <div class="text">1、充值后需5-10分钟才能到账，任何非TRX资产充值到TRX地址后将不可找回</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Recharge",
  data() {
    return {
      qrCode:'',
      rechargeAddress: '',
      popupVisible: true
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
        url: "/blockchain/v1/user/getRechargeAddress"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.qrCode = response.data.data.qrCode;
            this.rechargeAddress = response.data.data.rechargeAddress;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    copy(){
      this.$copyText(this.rechargeAddress)
      this.$ui.Toast('复制成功');
    }
  }
};
</script>
<style lang="less" scoped>
.name {
  background: #ffffff;
  display: flex;
  width: 100%;
  height: 110px;
  align-items: center;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #2a2e3f;
  img {
    margin-left: 30px;
    width: 60px;
    height: 60px;
  }
  .margin-left-20 {
    margin-left: 20px;
  }
}
.content {
  margin-top: 2px;
  padding-top: 30px;
  padding-bottom: 54px;
  width: 100%;
  text-align: center;
  background: #ffffff;
  .text1 {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(5, 20, 38, 1);
    line-height: 45px;
  }
  .text2 {
    margin-top: 30px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(5, 20, 38, 1);
    line-height: 40px;
  }
  .qr {
    margin-top: 20px;
    width: 300px;
    height: 300px;
    border: 2px solid #f4f4ff;
  }
  .copy {
    margin-top: 40px;
    width: 190px;
    height: 51px;
    border-radius: 8px;
    border: 2px solid rgba(224, 224, 224, 1);
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(5, 20, 38, 1);
    line-height: 51px;
    background: #ffffff;
  }
}
.tip {
  .title {
    margin-top: 20px;
    margin-left: 30px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 103, 0, 1);
    line-height: 45px;
  }
  .text {
    margin-top: 10px;
    margin-left: 30px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(163, 174, 186, 1);
    line-height: 40px;
  }
}
</style>