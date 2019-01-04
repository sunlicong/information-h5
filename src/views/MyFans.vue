<template>
  <div>
    <mu-load-more :loading="loading" @load="loadMore">
      <div class="item" v-for="(item,index) in list" @click="goProfile(item.uid)">
        <img class="cover" :src="item.photo">
        <div class="nick">{{item.nick}}</div>
        <div v-if="item.mutual==0" class="follow" @click="relation(item.uid,index)">关注</div>
        <div v-else class="follow yes" @click="deleteRelation(item.uid,index)">已关注</div>
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
  name: "MyFans",
  data() {
    return {
      loading: false,
      list: [],
      next: 0
    };
  },
  mounted() {
    this.getFansList();
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
    getFansList() {
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/relation/fans",
        data: {
          next: this.next
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
    /**
     * 关注
     */
    relation(uid, index) {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/user/relation/add",
        data: {
          mainUserId: uid
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("关注成功");
            this.list[index].mutual = 1;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 取消关注
     */
    deleteRelation(uid, index) {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/user/relation/delete",
        data: {
          mainUserId: uid
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("取消成功");
            this.list[index].mutual = 0;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    loadMore() {
      if (this.next == -1) return;
      this.getFansList();
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  margin-top: 1px;
  width: 100%;
  height: 150px;
  background: #ffffff;
  display: flex;
  align-items: center;
  .cover {
    margin-left: 30px;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    background: #f4f4f4;
  }
  .nick {
    flex: 1;
    margin-left: 24px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #333333;
  }
  .follow {
    margin-right: 30px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    background: #0794fc;
    border-radius: 4px;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
  }
  .yes {
    background: #ffffff;
    border: 1px solid #333333;
    border-radius: 4px;
    font-size: 24px;
    color: #333333;
  }
}
.non {
  margin-top: 250px;
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