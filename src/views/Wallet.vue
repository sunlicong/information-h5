<template>
  <div>
    <!-- 总资产 -->
    <div class="h-374">
      <img src="~@/assets/image/bg_wallet.png" class="h-374-abs">
      <div class="h-374-abs">
        <div class="fs-28 mt-26 ml-30">总资产折合（CNY）</div>
        <div class="h-72 mt-14">
          <div class="fs-28 ml-30">￥</div>
          <div class="fs-72 ml-12">{{ total ? total : '0.00' }}</div>
        </div>
        <div class="h-130 mt-33">
          <!-- 本地钱包 -->
          <div class="s-330-130">
            <div class="fs-28-r ml-20 mt-16">本地钱包</div>
            <div class="fs-28-r ml-20 mt-9">¥0.00</div>
          </div>
          <!-- 云钱包 -->
          <div class="s-330-130">
            <div class="fs-28-r ml-20 mt-16">云钱包</div>
            <div class="fs-28-r ml-20 mt-9">¥0.00</div>
          </div>
        </div>
        <!-- 指示点 -->
        <div class="h-12 mt-26">
          <div class="s-12"></div>
          <div class="s-12 ml-12"></div>
        </div>
      </div>
    </div>

    <!-- 充值、提现、发红包、发送中的红包 -->
    <div class="h-152">
      <!-- 充值 -->
      <div class="s-25-152">
        <img src="~@/assets/image/icon_wallet_0.png" class="s-45-51">
        <div class="fs-28-05 mt-14">充值</div>
      </div>
      <!-- 提现 -->
      <div class="s-25-152">
        <img src="~@/assets/image/icon_wallet_1.png" class="s-43-42">
        <div class="fs-28-05 mt-14">提现</div>
      </div>
      <!-- 发红包 -->
      <div class="s-25-152">
        <img src="~@/assets/image/icon_wallet_2.png" class="s-41-48">
        <div class="fs-28-05 mt-14">发红包</div>
      </div>
      <!-- 发送中的红包 -->
      <div class="s-25-152">
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
          <div class="fs-32">{{ trx ? trx : '0.00' }}</div>
          <div class="fs-24">￥128.00</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>

    <!-- Fcion 点钻 -->
    <div class="h-120 mt-1" @click="itemClick('db')">
      <!-- 图标 -->
      <div class="s-200-120">
        <img src="~@/assets/image/icon_db.png" class="s-50">
        <div class="fs-32 ml-20">Fcion</div>
      </div>
      <!-- 钱 -->
      <div class="s-300-120">
        <div class="qian-box">
          <div class="fs-32">{{ token ? token : '0.00' }}</div>
          <div class="fs-24">￥128.00</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>

    <!-- 人民币 -->
    <div class="h-120 mt-1" @click="itemClick('rmb')">
      <!-- 图标 -->
      <div class="s-200-120">
        <img src="~@/assets/image/icon_rmb.png" class="s-50">
        <div class="fs-32 ml-20">人民币</div>
      </div>
      <!-- 钱 -->
      <div class="s-300-120">
        <div class="qian-box">
          <div class="fs-32">{{ rmb ? rmb : '0.00' }}</div>
          <div class="fs-24">￥128.00</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>

    <!-- 糖果卡 -->
    <div class="h-120 mt-1" @click="itemClick('candy')">
      <!-- 图标 -->
      <div class="s-200-120">
        <img src="~@/assets/image/icon_candy.png" class="s-50">
        <div class="fs-32 ml-20">糖果卡</div>
      </div>
      <!-- 钱 -->
      <div class="s-300-120">
        <div class="qian-box">
          <div class="fs-32">{{ candy ? candy : '0.00' }}</div>
          <div class="fs-24">￥128.00</div>
        </div>
        <img src="~@/assets/image/arrows_right.png" class="s-12-21 ml-20">
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  name: "Wallet",

  data() {
    return {
      total: 0,
      token: 0,
      rmb: 0,
      candy: 0,
      trx: 0
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
        url: "/blockchain/v1/wallet/queryWalletOverview"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.data = response.data.data;
            this.total = response.data.data.total;
            this.token = response.data.data.token;
            this.rmb = response.data.data.rmb;
            this.candy = response.data.data.candy;
            this.trx = response.data.data.trx;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },

    itemClick(type) {
      switch (type) {
        case "db":  // 点钻
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
            path: "/WalletItemTrx"
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

.mt-26 {
  margin-top: 26px;
}

.mt-33 {
  margin-top: 33px;
}

.ml-12 {
  margin-left: 12px;
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
  border-radius: 10px;
  background-image: url(~@/assets/image/bg_wallet_card.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.fs-28-r {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: white;
  line-height: 40px;
}

.h-12 {
  width: 100%;
  height: 12px;
  display: flex;
  justify-content: center;
}

.s-12 {
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: #fff;
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

</style>