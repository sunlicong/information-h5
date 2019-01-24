<template>
  <div class="SendRedPack">
    <div class="height98 marginT30" @click="topTypePopupVisible=true">
      <div class="left">
        <span>资产</span>
      </div>
      <div class="right">
        <div>
          <span v-if="currentPayType.type=='TRX'">TRX</span>
          <span v-if="currentPayType.type=='RMB'">CNY</span>
        </div>
        <img class="arrow" src="~@/assets/image/arrows_right.png">
      </div>
    </div>
    <div class="height98 marginT30">
      <div class="left">
        <div class="type">{{redType?'普':'拼'}}</div>
        <span>{{redType?'单个金额':'总金额'}}</span>
      </div>
      <div class="right">
        <input type="number" placeholder="0" v-model="money">
        <span v-if="currentPayType.type=='TRX'">TRX</span>
        <span v-if="currentPayType.type=='RMB'">元</span>
      </div>
    </div>
    <div class="changeTip">
      <span>当前为{{redType?'普通':'拼手气'}}红包，</span>
      <span class="colorF98332" @click="redType=!redType">改为{{redType?'拼手气':'普通'}}红包</span>
    </div>
    <div class="height98 marginT50">
      <div class="left">
        <span>红包个数</span>
      </div>
      <div class="right">
        <input type="tel" placeholder="0" maxlength="3" v-model="redCount">
        <span>个</span>
      </div>
    </div>
    <div class="desc">
      <textarea placeholder="恭喜发财，大吉大利！" maxlength="20" v-model="description"></textarea>
    </div>
    <div class="counts">
      <div class="countsName">总金额</div>
      <div class="countsMoney">
        <span>{{money?redType==1?money*redCount:money:0}}</span>
        <span v-if="currentPayType.type=='TRX'">TRX</span>
        <span v-if="currentPayType.type=='RMB'">元</span>
      </div>
    </div>
    <mt-button class="button" @click="checkSubmit()">塞钱进钱包</mt-button>
    <div v-if="currentPayType.type=='TRX'" class="tip">24小时未领取的红包，将返还到云钱包内</div>
    <div v-if="currentPayType.type=='RMB'" class="tip">发出红包内的24小时内，未领取的红包发起退款</div>
    <div class="tab">
      <div class="item">
        <img class="icon" src="~@/assets/image/icon_tab_redpack.png">
        <div class="colorAC2C38">发红包</div>
      </div>
      <div class="item" @click="goRecords()">
        <img class="icon" src="~@/assets/image/icon_tab_history.png">
        <div class="colorA3AEBA">红包记录</div>
      </div>
    </div>
    <!-- 选择资产类型 -->
    <mt-popup class="dialog_top_box" v-model="topTypePopupVisible" position="bottom">
      <div class="title_view">
        <div class="left"></div>
        <div class="title">选择资产</div>
        <div class="right"></div>
      </div>
      <div class="line"></div>
      <div class="item_title">
        <div class="name">资产</div>
        <div class="local">本地钱包</div>
        <div class="cloud">云钱包</div>
      </div>
      <div class="item" v-for="item in list" @click="selectAsset(item)">
        <div v-if="item.type=='TRX'" class="name">TRX</div>
        <div v-if="item.type=='RMB'" class="name">CNY</div>
        <div class="local">{{item.localAmount?item.localAmount:'0.00'}}</div>
        <div class="cloud">{{item.cloudAmount?item.cloudAmount:'0.00'}}</div>
      </div>
    </mt-popup>
    <!-- 确认支付弹框 -->
    <mt-popup class="dialog_box" v-model="popupPayVisible" position="bottom">
      <div class="title_view">
        <div class="left" @click="popupPayVisible=!popupPayVisible">取消</div>
        <div class="title">确认支付</div>
        <div class="right"></div>
      </div>
      <div class="line"></div>
      <div class="price_view">
        <div class="price">
          <div
            v-if="currentPayType.type=='TRX'"
            class="trx"
          >{{money?redType==1?money*redCount:money:0}}TRX</div>
          <div
            v-if="currentPayType.type=='RMB'"
            class="trx"
          >￥{{money?redType==1?money*redCount:money:0}}</div>
        </div>
      </div>
      <div class="item">
        <div class="left">订单信息</div>
        <div class="right">发{{redType?'普通':'拼手气'}}红包</div>
      </div>
      <div class="item bordertb" @click="currentPayType.type!='RMB'?selectPayTypePop=true:selectPayTypePop=false">
        <div class="left">支付方式</div>
        <div class="right">
          <img class="icon" :src="walletTypeObj.pic" alt>
          <span>{{currentPayType.assetName}}</span>
          <span
            v-if="currentPayType.type!='RMB'"
            class="type"
          >{{walletTypeObj.name=="local"?"本地钱包":"云钱包"}}</span>
          <img v-if="currentPayType.type!='RMB'" class="arrow" src="~@/assets/image/arrows_right.png">
        </div>
      </div>
      <div v-if="redType">
        <div class="charge">
          <div v-if="currentPayType.type=='TRX'&&walletTypeObj.name=='local'" class="left">手续费</div>
          <div class="right">
            <p v-if="currentPayType.type=='TRX'&&walletTypeObj.name=='local'">交易将产生手续费，预计扣除{{currentPayType.localNormalCharge}}TRX</p>
          </div>
        </div>
      </div>
      <div v-if="!redType">
        <div class="charge">
          <div class="left">手续费</div>
          <div class="right marginT20">
            <p v-if="currentPayType.type=='TRX'&&walletTypeObj.name=='local'">交易和调用拼手气红包智能合约将产生手续费，预计扣除{{currentPayType.localLuckCharge}}TRX</p>
            <p v-if="currentPayType.type=='TRX'&&walletTypeObj.name=='cloud'">调用拼手气红包智能合约将产生手续费，预计扣除{{currentPayType.cloudLuckCharge}}TRX</p>
            <p v-if="currentPayType.type=='RMB'">调用拼手气红包智能合约需￥{{currentPayType.localLuckCharge}}手续费</p>
          </div>
        </div>
      </div>
      <mt-button class="pay" @click="doPayRedPacket()">确认支付</mt-button>
    </mt-popup>
    <!-- 选择支付方式 -->
    <mt-popup class="dialog_box" v-model="selectPayTypePop" position="bottom">
      <div class="title_view">
        <div class="left" @click="cancelSelect()">
          <img src="~@/assets/image/icon_back.png" alt>
        </div>
        <div class="title">选择支付方式</div>
        <div class="right"></div>
      </div>
      <div class="line"></div>
      <div
        class="payItem"
        v-for="(item,index) in currentPayType.payList"
        @click="selectPayType(item)"
      >
        <img class="icon" :src="item.pic" alt>
        <div class="info">
          <div class="name">
            <span>{{currentPayType.assetName}}</span>
            <span v-if="currentPayType.type!='RMB'" class="type">{{item.name=="local"?"本地钱包":"云钱包"}}</span>
          </div>
          <div class="balance">余额：{{item.amount}}TRX</div>
        </div>
        <div v-if="walletTypeObj.name == item.name" class="right">
          <img src="~@/assets/image/icon_duihao.png" alt>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "SendRedPack",
  data() {
    return {
      money: "",
      redCount: "", //红包个数
      description: "",
      redType: 0, //红包类型 0拼手气 1普通
      topTypePopupVisible: false, //选择币种
      popupPayVisible: false, //确认支付弹框
      selectPayTypePop: false, //支付方式弹框
      list: [], //支付方式列表
      currentPayType: {
        //当前选择资产类型
        assetName: "",
        cloudAmount: "0",
        localAmount: 0,
        payList: [],
        serviceCharge: 0, //手续费
        type: ""
      },
      walletTypeObj: {
        //钱包类型 1-本地 2-去钱包
        amount: 0,
        name: "", //local本地 cloud云
        pic: ""
      }
    };
  },
  created() {
    this.getRedpackAssetList();
  },
  methods: {
    /**
     * 获取数据
     * 支付方式列表
     */
    getRedpackAssetList() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/redpackAssetList"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.list = response.data.data;
            this.currentPayType = response.data.data[0];
            this.walletTypeObj = response.data.data[0].payList[0];
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 校验
     */
    checkSubmit() {
      if(!this.currentPayType.type){
        return
      }
      if(this.currentPayType.type=='TRX'){
        //TRX拼手气红包最小总金额为1；
        if (!this.redType && this.money < 1) {
          this.$ui.Toast("红包总金额最小为1");
          return;
        }
        //TRX普通红包单个最小金额为0.001
        if(this.redType && this.money < 0.001){
          this.$ui.Toast("单个红包金额最小为0.001");
          return;
        }
      }
      if(this.currentPayType.type=='RMB'){
        //人民币拼手气红包最小总金额为1
        if (!this.redType && this.money < 1) {
          this.$ui.Toast("红包总金额最小为1");
          return;
        }
        //人民币普通红包单个最小金额为0.01
        if(this.redType && this.money < 0.01){
          this.$ui.Toast("单个红包金额最小为0.01");
          return;
        }
      }
      if (this.redCount < 1) {
        this.$ui.Toast("请输入红包个数");
        return;
      }
      if (this.redCount > 100) {
        this.$ui.Toast("红包个数最多为100个");
        return;
      }
      this.popupPayVisible = true;
    },
    /**
     * 选择资产
     */
    selectAsset(item) {
      this.currentPayType = item;
      this.walletTypeObj = item.payList[0];
      this.topTypePopupVisible = false;
    },
    /**
     * 选择框的返回
     */
    cancelSelect() {
      this.selectPayTypePop = false;
    },
    /**
     * 选择支付方式
     */
    selectPayType(item) {
      this.walletTypeObj = item;
      this.selectPayTypePop = false;
    },
    /**
     * 发红包
     */
    doPayRedPacket() {
      var assetType = 0;
      if (this.currentPayType.type == "TRX") {
        assetType = 1;
      } else if (this.currentPayType.type == "RMB") {
        assetType = 2;
      }

      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/wxpay/doPayRedPacket",
        data: {
          amount: this.money,
          count: this.redCount,
          description: this.description || "恭喜发财，大吉大利！",
          type: this.redType + 1, //红包类型 1 拼手气 2普通
          assetType: assetType,
          walletType: this.walletTypeObj.name == "local" ? 1 : 2
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            //1:TRX  2微信支付
            if (response.data.data.payChannel == 1) {
              this.shareRedPack(response.data.data.redPacketId);
            } else if (response.data.data.payChannel == 2) {
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener(
                    "WeixinJSBridgeReady",
                    () => {
                      this.onBridgeReady(response.data.data);
                    },
                    false
                  );
                } else if (document.attachEvent) {
                  document.attachEvent("WeixinJSBridgeReady", () => {
                    this.onBridgeReady(response.data.data);
                  });
                  document.attachEvent("onWeixinJSBridgeReady", () => {
                    this.onBridgeReady(response.data.data);
                  });
                }
              } else {
                this.onBridgeReady(response.data.data);
              }
            }
          } else if (response.data.code == 30120) {
            this.popupPayVisible = false;
            if(this.walletTypeObj.name == "local"){
              this.$ui.MessageBox({
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
            } else {
              this.$ui.MessageBox({
                  title: "余额不足",
                  message: "云钱包可用余额不足，马上转入TRX",
                  showCancelButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "去转入",
                  cancelButtonText: "取消"
                })
                .then(action => {
                  if (action == "confirm") {
                    this.$router.push({
                      path: "/WalletCloudInOrOut",
                      query: {
                        cloudType: 1
                      }
                    });
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
     * 微信支付
     */
    onBridgeReady(data) {
      var that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.package,
          signType: data.signType, //微信签名方式：
          paySign: data.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            that.shareRedPack(data.redPacketId);
          }
        }
      );
    },
    /**
     * 成功后进分享
     */
    shareRedPack(id) {
      this.$ui.Toast("红包生成中");
      window.location.href = location.protocol + "//" + window.location.host + "/dayu/ShareRedPack?redpackId=" + id;
    },
    /**
     * 红包记录
     */
    goRecords() {
      this.$router.push({
        path: "/RedPacketRecords"
      });
    }
  }
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
.colorAC2C38 {
  color: #ac2c38;
}
.colorA3AEBA {
  color: #a3aeba;
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
    width: 200px;
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
      width: 300px;
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
  }
}
.dialog_top_box {
  width: 100%;
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
      img {
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
    height: 1px;
    background: #f4f4f4;
  }
  .item_title {
    width: 100%;
    height: 88px;
    border-top: 1px solid #f4f4f4;
    div {
      width: 33%;
      height: 88px;
      float: left;
      padding-left: 30px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #a3aeba;
      line-height: 88px;
    }
  }
  .item {
    width: 100%;
    height: 98px;
    border-top: 1px solid #f4f4f4;
    div {
      width: 33%;
      height: 98px;
      float: left;
      padding-left: 30px;
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #051426;
      line-height: 98px;
    }
  }
}
.dialog_box {
  width: 100%;
  height: 667px;
  background: #ffffff;
  .height120{
    height: 120px;
  }
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
      img {
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
    height: 100px;
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
      width: 100%;
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
  .bordertb {
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
  }
  .item {
    width: 100%;
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #2a2e3f;
    .left {
      margin-left: 30px;
      width: 180px;
    }
    .right {
      flex: 1;
      text-align: right;
      margin-right: 30px;
      .icon {
        width: 60px;
        height: 60px;
        margin-right: 15px;
      }
      .type {
        margin-left: 10px;
        padding-left: 10px;
        padding-right: 10px;
        height: 28px;
        border-radius: 20px 0 20px 0;
        background: #e99e33;
        font-size: 24px;
        color: #ffffff;
      }
      .arrow {
        width: 12px;
        height: 21px;
        margin-left: 12px;
      }
      .marginT20{
        margin-top: 20px;
      }
    }
  }
  .charge{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #2a2e3f;
    .left {
      margin-left: 30px;
      margin-top: 20px;
      width: 150px;
    }
    .right {
      flex: 1;
      margin-top: 20px;
      margin-right: 20px; 
      text-align: right;
      p{
        display: inline-block;
        text-align: left;
      }
    }
  }
  .text {
    float: right;
    text-align: right;
    margin-right: 30px;
    width: 80%;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #2a2e3f;
    line-height: 40px;
  }
  .payItem {
    width: 100%;
    height: 108px;
    border-bottom: 1px solid #dedede;
    display: flex;
    align-items: center;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #2a2e3f;
    .icon {
      margin-left: 30px;
      width: 60px;
      height: 60px;
    }
    .info {
      margin-left: 15px;
      flex: 1;
      .name {
        margin-top: 13px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #2a2e3f;
        line-height: 40px;
        .type {
          margin-left: 10px;
          padding-left: 10px;
          padding-right: 10px;
          height: 28px;
          border-radius: 20px 0 20px 0;
          background: #e99e33;
          font-size: 24px;
          color: #ffffff;
        }
      }
      .balance {
        margin-top: 5px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #a3aeba;
        line-height: 33px;
      }
    }
    .right {
      margin-right: 40px;
      img {
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