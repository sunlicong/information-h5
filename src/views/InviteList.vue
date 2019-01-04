<template>
  <div>
    <div class="top">
      <img src="~@/assets/image/bg_wallet.png" class="top_bg">
      <div class="top_content">
        <div class="top_text1">已邀请{{count}}人，获得奖励</div>
        <div class="top_text2">{{award}}点钻</div>
        <div class="top_text3">奖励实时到账钱包</div>
      </div>
    </div>
    <div v-if="list.length" class="height-120">
      <div class="left margin-left-30">被邀请人</div>
    </div>
    <mu-load-more :loading="loading" @load="loadMore">
      <div class="height-120" v-for="item in list" @click="goProfile(item.uid)">
        <img class="cover" :src="item.photo">
        <div class="left">
          <div class="nick">{{item.nick}}</div>
          <div class="time">{{$formatDate(item.inviterDate/1000,4)}}</div>
        </div>
      </div>
    </mu-load-more>
    <div v-if="list.length==0" class="non">
      <img src="~@/assets/image/img_non.png">
      <div>暂时还没有数据哦～</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InviteList",
  data() {
    return {
      loading: false,
      next: 0,
      count: 0,
      award: 0,
      list: []
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    goProfile(uid) {
      this.$router.push({
        path: "/Profile",
        query: {
          uid: uid
        }
      });
    },
    loadMore() {
      if (this.next == -1) return;
      this.loading = true;
      this.getInviteList();
    },
    /**
     *
     */
    requestData() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/invitation/record/profile"
      })
        .then(response => {
          if (response.data.status) {
            this.award = response.data.data.award;
            this.count = response.data.data.count;
            this.getInviteList();
          }
        })
        .catch(response => {});
    },
    getInviteList() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/invitation/record/list",
        data: {
          next: this.next
        }
      })
        .then(response => {
          this.loading = false;
          if (response.data.status) {
            this.next = response.data.data.next;
            this.list = this.list.concat(response.data.data.data);
          }
        })
        .catch(response => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .top_text1 {
      font-family: PingFangSC-Regular;
      height: 37px;
      line-height: 37px;
      font-size: 26px;
      color: #ffffff;
      text-align: center;
    }
    .top_text2 {
      height: 126px;
      line-height: 126px;
      font-size: 90px;
      color: #ffffff;
      text-align: center;
    }
    .top_text3 {
      font-family: PingFangSC-Regular;
      height: 37px;
      line-height: 37px;
      font-size: 26px;
      color: #ffffff;
      text-align: center;
    }
  }
}
.height-120 {
  margin-top: 1px;
  width: 100%;
  height: 120px;
  background-color: white;
  display: flex;
  align-items: center;
  .cover {
    margin-left: 30px;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background: #f4f4f4;
  }
  .left {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  }
  .left {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  }
  .nick {
    flex: 1;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #333333;
  }
  .time {
    font-size: 24px;
    color: #a3aeba;
  }
  .margin-left-30 {
    margin-left: 30px;
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