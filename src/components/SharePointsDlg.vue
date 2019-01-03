<template>
  <mt-popup class="dialog_box" v-model="show">
    <div class="close_view">
      <img class="close" src="~@/assets/image/icon_dialog_close.png" @click="closeDialog()">
    </div>
    <img class="bg_img" src="~@/assets/image/bg_share_dialog.png">
    <div class="content">
      <div class="text1">
        <span>恭喜获得{{pints}}点钻</span>
      </div>
      <div class="text2">1点钻=1股份，持钻领分红</div>
      <div class="text3">分享再得5点钻</div>
    </div>
  </mt-popup>
</template>
<script>
export default {
  name: "SharePointsDlg",
  props: ["show","pints"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
      closeDialog(){
        this.show = false
      }
  }
};
</script>
<style lang="less" scoped>
.dialog_box {
  background: none;
  width: 524px;
  height: 798px;
  .close_view {
    width: 100%;
    text-align: right;
  }
  .close {
    width: 56px;
    height: 56px;
  }
  .content {
    position: absolute;
    width: 610px;
    height: 653px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .bg_img {
    position: absolute;
    width: 524px;
    height: 549px;
  }
  .content {
    position: absolute;
    width: 610px;
    height: 653px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .text1 {
    margin-top: 170px;
    margin-left: -50px;
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #f13636;
  }
  .text2 {
    margin-left: -50px;
    margin-top: 35px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    font-size: 28px;
    color: #333333;
  }
  .text3 {
    margin-top: 180px;
    margin-left: -50px;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #fff;
  }
  .share {
    position: absolute;
    bottom: 0;
    left: 120px;
    width: 327px;
    height: 81px;
    line-height: 84px;
    background-image: linear-gradient(-180deg, #fde692 0%, #f9c959 50%);
    border-radius: 42px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ffffff;
  }
}
</style>