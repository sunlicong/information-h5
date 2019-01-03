<template>
  <div>
    <div v-if="list.length==0" class="non">
      <img src="~@/assets/image/img_non.png">
      <div>暂时还没有提现地址哦～</div>
    </div>
    <mu-load-more class="list" :loading="loading" @load="loadMore">
      <div class="height-267" v-for="(item,index) in list" @click="editAddress(index)">
        <div class="item_title">
          <img class="icon" src="~@/assets/image/icon_trx.png" alt>
          <span class="name">TRX</span>
          <img class="arrow" src="~@/assets/image/arrows_right.png">
        </div>
        <div class="item_desc">
          <div class="desc1">{{item.remark}}</div>
          <div class="desc1">{{item.withdrawAddress}}</div>
        </div>
      </div>
    </mu-load-more>
    <mt-button v-if="showAdd" class="button" @click="add()">添加提现地址</mt-button>
  </div>
</template>
<script>
export default {
  name: "CashAddressManager",
  data() {
    return {
      showAdd: false,
      loading: false,
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    loadMore() {
      if (this.next == -1) return;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/getWithdrawAddress",
        data: {
          next: this.next
        }
      })
        .then(response => {
          this.loading = false;
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.next = response.data.data.next;
            this.list = this.list.concat(response.data.data.withdrawList);
            if (response.data.data.withdrawList.length > 0) {
              this.showAdd = false;
            } else {
              this.showAdd = true;
            }
          }
        })
        .catch(response => {
          this.loading = false;
          this.$ui.Indicator.close();
        });
    },
    /**
     * 添加地址
     */
    add() {
      this.$router.push({
        path: "/CashAddressAdd"
      });
    },
    /**
     * 编辑地址
     */
    editAddress(index) {
      var item = this.list[index]
      this.$router.push({
        path: "/CashAddressAdd",
        query: {
          id: item.id,
          withdrawAddress: item.withdrawAddress,
          remark: item.remark,
          addressPwd: item.addressPwd
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.num {
  line-height: 45px;
  font-size: 32px;
  color: #fe6503;
}
.non {
  margin-top: 230px;
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
.list {
  padding-bottom: 98px;
  .height-267 {
    margin-top: 1px;
    margin-bottom: 20px;
    width: 100%;
    height: 267px;
    .item_title {
      width: 100%;
      height: 110px;
      display: flex;
      align-items: center;
      background-color: white;
      .icon {
        margin-left: 30px;
        width: 60px;
        height: 60px;
      }
      .name {
        flex: 1;
        margin-left: 15px;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #2a2e3f;
      }
      .arrow {
        width: 12px;
        height: 21px;
        margin-left: 12px;
        margin-right: 30px;
      }
    }
    .item_desc {
      margin-top: 1px;
      width: 100%;
      height: 156px;
      background-color: white;
      padding: 30px;
      line-height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #051426;
    }
  }
}
.button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #0794fc;
  line-height: 98px;
  text-align: center;
  font-size: 36px;
  color: #fff;
  border-radius: 0;
}
</style>
