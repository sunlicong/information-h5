<template>
  <div>
    <!-- <div class="top">
      <img src="~@/assets/image/bg_wallet.png" class="top_bg">
      <div class="top_content">
        <div class="balance one_line">
          <div>{{num?num:'0.00'}}</div>
          <span class="yuan">{{formType==1?'点钻':'元'}}</span>
        </div>
      </div>
    </div>-->
    <div class="h-220">
      <div class="h-98">
        <div class="fs-70">{{ formType == 1 ? num : $formatMoney(num,1) }}</div>
        <div class="fs-36-m ml-10">{{ formType == 1 ? 'Fcoin' : '元' }}</div>
      </div>
      <div v-if="formType == 2" class="h-50"></div>
      <div v-else-if="formType == 1" class="fs-36">~</div>
    </div>

    <div v-if="list.length==0" class="non">
      <img src="~@/assets/image/img_non.png">
      <div>暂时还没有数据哦～</div>
    </div>
    <mu-load-more :loading="loading" @load="loadMore">
      <div class="height-120" v-for="item in list" :key='item.time'>
        <div class="left">
          <div class="title">{{getTypeName(item.type)}}{{item.status==50?'中':''}}</div>
          <div class="time">{{$formatDate(item.time/1000,3)}}</div>
        </div>
        <div class="right">
          <div
            class="num"
          >{{item.type==2||item.type==5||item.type==18||item.type==20||item.type==21||item.type==22||item.type==24||item.type==28?'-':'+'}}{{item.count}}{{formType==1?'点钻':'元'}}</div>
        </div>
      </div>
    </mu-load-more>

    <!-- 提现功能开发中 -->
    <div class="h-100" v-if="formType == 2">
      <div class="fs-36-m">提现功能开发中</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletItemDetail",
  data() {
    return {
      loading: false,
      formType: this.$route.query.formType, //1-点钻 2-人民币
      num: 0,
      next: 0,
      list: []
    };
  },
  mounted() {
    if (this.$route.query.formType == 1) {
      document.title = "点钻";
    }
    this.$ui.Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    });
    this.list = [];
    this.requestData();
  },
  methods: {
    loadMore() {
      if (this.next == -1) return;
      if (this.list.length == 0) return;
      this.loading = true;
      this.requestData();
    },
    /**
     * 获取数据
     */
    requestData() {
      var url = "/blockchain/v1/wallet/queryTokenBillList";
      if (this.formType == 2) {
        url = "/blockchain/v1/wallet/queryRMBBillList";
      }
      this.$axios({
        method: "get",
        url: url,
        data: {
          next: this.next
        }
      })
        .then(response => {
          this.loading = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.list = this.list.concat(response.data.data.data);
            this.num = response.data.data.totalAmount;
            this.next = response.data.data.next;
          }
        })
        .catch(response => {
          this.loading = false;
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
      }
      return name;
    }
  }
};
</script>

<style lang="less" scoped>
.ml-10 {
  margin-left: 10px;
}

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

.h-98 {
  width: 500px;
  height: 98px;
  display: flex;
  align-items: baseline;
}

.fs-70 {
  font-family: PingFangSC-Medium;
  font-size: 70px;
  line-height: 98px;
  color: white;
}

.fs-36-m {
  font-family: PingFangSC-Medium;
  font-size: 36px;
  line-height: 50px;
  color: white;
}

.h-50 {
  width: 1px;
  height: 50px;
  background: transparent;
}

.fs-36 {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: white;
  line-height: 50px;
}

.h-100 {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #d2d2d2;
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
      font-size: 100px;
      color: #fff;
      display: flex;
    }
    .yuan {
      margin-left: 20px;
      margin-top: 15px;
      font-size: 36px;
    }
  }
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
</style>
