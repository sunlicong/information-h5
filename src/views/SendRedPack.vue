<template>
  <div class="SendRedPack">
    <div class="height98 marginT30">
      <div class="left">
        <span>资产</span>
      </div>
      <div class="right">
        <span>TRX</span>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div class="height98 marginT30">
      <div class="left">
        <div class="type">拼</div>
        <span>总金额</span>
      </div>
      <div class="right">
        <input type="text" placeholder="0" v-model="money">
        <span>TRX</span>
      </div>
    </div>
    <div class="changeTip">
      <span>当前为拼手气红包，</span>
      <span class="colorF98332">改为普通红包</span>
    </div>
    <div class="height98 marginT50">
      <div class="left">
        <span>红包个数</span>
      </div>
      <div class="right">
        <input type="text" placeholder="0" v-model="money">
        <span>个</span>
      </div>
    </div>
    <div class="desc">
      <textarea placeholder="恭喜发财，大吉大利！" maxlength="20"></textarea>
    </div>
    <div class="counts">
      <div class="countsName">总金额</div>
      <div class="countsMoney">
        <span>0</span>
        <span>TRX</span>
      </div>
    </div>
    <mt-button class="button" @click="pay()">塞钱进钱包</mt-button>
    <div class="tip">24小时未领取的红包，将返还到云钱包内</div>
    <div class="tab">
      <div class="item">
        <img class="icon" src="~@/assets/image/icon_tab_redpack.png">
        <div>发红包</div>
      </div>
      <div class="item">
        <img class="icon" src="~@/assets/image/icon_tab_history.png">
        <div>红包记录</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SendRedPack",
  data() {
    return {
      money: ""
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.SendRedPack {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fbf2ec;
}
.marginT30 {
  margin-top: 30px;
}
.marginT50 {
  margin-top: 50px;
}
.height98 {
  margin-left: 30px;
  margin-right: 30px;
  height: 98px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #051426;
  .left {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .type {
      width: 30px;
      height: 33px;
      line-height: 33px;
      border-radius: 5px;
      background: #f98332;
      margin-right: 6px;
      color: #ffffff;
      font-size: 24px;
      text-align: center;
    }
  }
  .right {
    margin-right: 20px;
    display: flex;
    align-items: center;
    input {
      border: 0;
      text-align: right;
      margin-right: 10px;
    }
    .arrow {
      width: 12px;
      height: 21px;
      margin-left: 12px;
    }
  }
}
.changeTip {
  margin-left: 30px;
  margin-top: 20px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #a3aeba;
  line-height: 33px;
  .colorF98332 {
    color: #f98332;
  }
}
.desc {
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 30px;
  background-color: #ffffff;
  textarea {
    width: 100%;
    height: 120px;
    border: 0;
    padding: 15px 20px 15px 20px;
    line-height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #051426;
  }
}
.counts {
  margin-top: 30px;
  .countsName {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #071628;
    text-align: center;
  }
  .countsMoney {
    font-size: 64px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #071628;
    text-align: center;
  }
}
.button {
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
  width: 690px;
  height: 98px;
  background-color: #d14139;
  line-height: 98px;
  text-align: center;
  font-size: 32px;
  color: #fff;
  border-radius: 8px;
}
.tip {
  margin-top: 20px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #a3aeba;
  line-height: 33px;
  text-align: center;
}
.tab {
  margin-top: 43px;
  .item {
    width: 50%;
    float: left;
    text-align: center;
    .icon {
      width: 75px;
      height: 75px;
    }
    .colorAC2C38{
        color: #AC2C38;
    }
    .color051426{
        color: #051426;
    }
  }
}
</style>