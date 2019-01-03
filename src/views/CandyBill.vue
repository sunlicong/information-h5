<template>
  <div>
    <div v-if="list.length==0" class="non">
      <img src="~@/assets/image/img_non.png">
      <div>暂时还没有数据哦～</div>
    </div>
    <mu-load-more :loading="loading" @load="loadMore">
      <div class="height-120" v-for="item in list">
        <div class="left margin-left-30">
          <div class="title">{{getTypeName(item.type)}}</div>
          <div class="time">{{$formatDate(item.time/1000,3)}}</div>
        </div>
        <div class="right">
          <div class="num">{{item.type==2||item.type==5||item.type==18||item.type==20||item.type==21?'-':'+'}}{{item.count}}糖果</div>
        </div>
      </div>
    </mu-load-more>
  </div>
</template>
<script>
export default {
  name: "CandyBill",
  data() {
    return {
      loading: false,
      list: []
    };
  },
  mounted() {
    this.$ui.Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    });
    this.getList();
  },
  methods: {
    loadMore() {
      if (this.next == -1) return;
      this.loading = true;
      this.getList();
    },
    getList() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/wallet/queryCandyBillList",
        data: {
          next: this.next,
          limit: 20
        }
      })
        .then(response => {
          this.loading = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.next = response.data.data.next;
            this.list = this.list.concat(response.data.data.data);
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

.height-120 {
  margin-top: 1px;
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
</style>
