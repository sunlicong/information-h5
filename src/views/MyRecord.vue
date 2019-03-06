<template>
  <div>
    <div class="top_card">
      <div class="text1">已获奖励（元）</div>
      <div class="text2">{{totalAmount}}</div>
      <div class="text3">累计签到份数 {{totalCheckinCount}}</div>
      <div class="top_card_b">
        <div class="item">
          <div class="item_text1">开宝箱奖励（元）</div>
          <div class="item_text2">{{lotteryAmount}}</div>
        </div>
        <div class="item">
          <div class="item_text1">邀请奖励（元）</div>
          <div class="item_text2">{{inviteRewardsAmount}}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="list_title">战绩明细</div>
      <div v-if="BillList.length==0" class="non">
        <img src="~@/assets/image/img_non.png">
        <div>暂时还没有数据哦～</div>
      </div>
      <mu-load-more :loading="loading" @load="loadMore">
      <div class="list" v-for="item in BillList" @click="goDetail(item.operationType,item.logId)">
        <div class="left">
          <div>{{item.description}}</div>
          <div>{{$formatDate(item.createTime/1000,3)}}</div>
        </div>
        <div class="right">
          <div>+ {{item.amount}}</div>
          <div>已领奖励{{item.awardedCount}}/{{item.totalRewardCount}}</div>
        </div>
      </div>
      </mu-load-more>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyRecord",
  data() {
    return {
      totalCheckinCount: 0,//累计签到份数
      lotteryAmount: 0,//开宝箱奖励
      inviteRewardsAmount: 0,//邀请奖励
      totalAmount: 0,//所有奖励
      loading: false,
      next: 0,
      BillList: []//战绩
    };
  },
  created() {
    this.requestData()
    this.queryBillList()
  },
  methods: {
    requestData() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "get",
        url: "/blockchain/v1/checkin/queryStatisticDatas"
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.totalCheckinCount = response.data.data.totalCheckinCount;
            this.lotteryAmount = response.data.data.lotteryAmount;
            this.inviteRewardsAmount = response.data.data.inviteRewardsAmount;
            this.totalAmount = response.data.data.totalAmount;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    loadMore() {
      if (this.next == -1) return;
      this.loading = true;
      this.requestData();
    },
    /**
     * 战绩列表
     */
    queryBillList(){
      this.$axios({
        method: "get",
        url: "/blockchain/v1/checkin/queryBillList",
        data: {
          next: this.next,
          limit: 20
        }
      })
        .then(response => {
          this.loading = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.BillList = this.BillList.concat(response.data.data.data);
            this.next = response.data.data.next;
          }
        })
        .catch(response => {
          this.loading = false;
          this.$ui.Indicator.close();
        });
    },
    /**
     * 跳转
     */
    goDetail(type,id){
      if(type == 33){//邀请
        this.$router.push({
            path: "/SignInInviteDetail",
            query: {
              logId: id
            }
          });
      } else if(type == 34){//宝箱
        this.$router.push({
            path: "/SignInBoxDetail",
            query: {
              logId: id
            }
          });
      } else if(type == 35){//签到
        this.$router.push({
            path: "/SignInDetail",
            query: {
              logId: id
            }
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.top_card {
  position: relative;
  width: 100%;
  height: 390px;
  background-image: url(~@/assets/image/bg_myrecord_card.png);
  background-size: 100% 100%;
  text-align: center;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #eea6a4;
  line-height: 33px;
  padding-top: 57px;
  .text2 {
    margin-top: 10px;
    font-size: 64px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: #ffffff;
    line-height: 74px;
  }
  .text3 {
    margin-top: 10px;
  }
  .top_card_b {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    .item {
      width: 50%;
      text-align: center;
      .item_text1 {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #eea6a4;
        line-height: 33px;
      }
      .item_text2 {
        margin-top: 15px;
        font-size: 36px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #ffffff;
        line-height: 50px;
      }
    }
  }
}
.list_title{
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  padding-left: 30px;
  line-height: 80px;
  font-size:28px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#051426;
}
.list{
  margin-top: 2px;
  width: 100%;
  height: 120px;
  background: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left{
    margin-left: 30px;
    text-align: left;
    div:nth-child(1){
      font-size:32px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#051426;
      line-height:45px;
    }
    div:nth-child(2){
      font-size:24px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#A3AEBA;
      line-height:33px;
    }
  }
  .right{
    margin-right: 30px;
    text-align: right;
    div:nth-child(1){
      font-size:32px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#FE6503;
      line-height:45px;
    }
    div:nth-child(2){
      font-size:24px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#A3AEBA;
      line-height:33px;
    }
  }
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