<template>
  <div class="Profile">
    <div class="head">
      <img class="cover" :src="$url(user.photo)">
      <div class="info">
        <span>{{user.nick}}</span>
        <div class="info_num">
          <div>关注:{{user.followedCount}}</div>
          <div class="ml20">粉丝:{{user.fansCount}}</div>
        </div>
      </div>
      <div v-if="uid == myUid" class="follow" @click="editInfo()">编辑资料</div>
      <div v-else-if="user.user_relation" class="romoveRelation" @click="deleteRelation(uid)">已关注</div>
      <div v-else-if="!user.user_relation" class="follow" @click="relation(uid)">关注</div>
    </div>
    <div class="desc">
      <div class="desc_info">{{user.desc?'简介：'+user.desc:'简介：这个人很懒，什么都没留下'}}</div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item class="navbar" id="1">
        <span>动态</span>
      </mt-tab-item>
      <mt-tab-item class="navbar" id="2">
        <span>文章</span>
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div v-if="newList.length==0" class="non">
          <img src="~@/assets/image/img_non.png">
          <div>暂时还没有数据哦～</div>
        </div>
        <mu-load-more class="feeds" :loading="loading" @load="loadMore">
          <div class="item_card" v-for="(item,index) in newList" @click="goDetail(item.contentId)">
            <div class="item_user">
              <img class="item_cover" :src="$url(user.photo)">
              <div class="item_nick">{{user.nick}}</div>
              <div v-if="item.optTime" class="item_time">{{formatTimeData(item.optTime)}}</div>
              <div v-else class="item_time">{{formatTimeData(item.createTime)}}</div>
            </div>
            <div v-if="item.optType==1" class="item_opt">赞了文章</div>
            <div v-else-if="item.optType==2" class="item_opt">赞赏了文章</div>
            <div class="item_info">
              <img
                mode="aspectFill"
                v-if="item.coverPid"
                class="item_img"
                :src="$url(item.coverPid)"
              >
              <div class="item_content">{{item.title}}</div>
            </div>
          </div>
        </mu-load-more>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-if="hotList.length==0" class="non">
          <img src="~@/assets/image/img_non.png">
          <div>暂时还没有数据哦～</div>
        </div>
        <mu-load-more class="feeds" :loading="loading" @load="loadMore">
          <div class="item_card" v-for="(item,index) in hotList" @click="goDetail(item.contentId)">
            <div class="item_user">
              <img class="item_cover" :src="$url(user.photo)">
              <div class="item_nick">{{user.nick}}</div>
              <div v-if="item.optTime" class="item_time">{{formatTimeData(item.optTime)}}</div>
              <div v-else class="item_time">{{formatTimeData(item.createTime)}}</div>
            </div>
            <div class="item_opt">发表了文章</div>
            <div class="item_info">
              <img
                mode="aspectFill"
                v-if="item.coverPid"
                class="item_img"
                :src="$url(item.coverPid)"
              >
              <div class="item_content">{{item.title}}</div>
            </div>
          </div>
        </mu-load-more>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  name: "Profile",
  data() {
    return {
      uid: this.$route.query.uid || "1070988726840066048",
      myUid: "",
      selected: "1",
      loading: false,
      user: {
        photo: "",
        nick: "",
        followedCount: "",
        fansCount: "",
        user_relation: "",
        desc: ""
      },
      newList: [],
      hotList: []
    };
  },
  mounted() {
    this.myUid = this.$store.state.user.uid;
    this.queryProfile();
    this.getNewList();
    this.getHotList();
  },
  methods: {
    loadMore() {},
    /**
     * 用户信息
     */
    queryProfile() {
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/queryUserProfile",
        data: {
          uid: this.uid
        }
      })
        .then(response => {
          if (response.data.status) {
            this.user = response.data.data;
          }
        })
        .catch(response => {});
    },
    /**
     * 动态
     */
    getNewList() {
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/queryProfileUserFeeds",
        data: {
          next: this.next,
          uid: this.uid
        }
      })
        .then(response => {
          this.loading = false;
          if (response.data.status) {
            this.next = response.data.data.next;
            this.newList = this.newList.concat(response.data.data.data);
          }
        })
        .catch(response => {
          this.loading = false;
        });
    },
    /**
     * 文章
     */
    getHotList() {
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/blockchain/v1/user/queryProfileContentsList",
        data: {
          next: this.next,
          uid: this.uid
        }
      })
        .then(response => {
          this.loading = false;
          if (response.data.status) {
            this.next = response.data.data.next;
            this.hotList = this.hotList.concat(response.data.data.data);
          }
        })
        .catch(response => {
          this.loading = false;
        });
    },
    /**
     * 进详情
     */
    goDetail(id) {
      this.$router.push({
        path: "/FeedDetail",
        query: { contentId: id }
      });
    },
    /**
     * 编辑资料
     */
    editInfo() {
      this.$router.push({
        path: "/EditProfile",
        query: {
          photo: this.user.photo,
          nick: this.user.nick,
          desc: this.user.desc
        }
      });
    },
    /**
     * 时间格式化
     */
    formatTimeData(time) {
      var now = new Date();
      var str = "";
      if (now.getTime() - time < 60 * 1000) {
        str = "刚刚";
      } else if (now.getTime() - time < 60 * 60 * 1000) {
        str = parseInt((now.getTime() - time) / 1000 / 60) + "分钟前";
      } else {
        str = this.$formatDate(time, 6);
      }
      return str;
    },
    /**
     * 关注
     */
    relation(uid) {
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
            this.$ui.Toast("已关注");
            this.user.user_relation = 1;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    /**
     * 取消关注
     */
    deleteRelation(uid) {
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
            this.$ui.Toast("已取消关注");
            this.user.user_relation = 0;
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 120px;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .cover {
    width: 120px;
    height: 120px;
    margin-left: 27px;
    border-radius: 120px;
    background-color: rgba(163, 174, 186, 0.08);
  }
  .info {
    flex: 1;
    margin-left: 24px;
    font-size: 32px;
    color: #333333;
    .info_num {
      margin-top: 18px;
      display: flex;
      flex-direction: row;
      font-size: 24px;
      color: #333333;
    }
    .ml20 {
      margin-left: 20px;
    }
  }
  .follow {
    margin-right: 30px;
    width: 120px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #0794fc;
    border-radius: 4px;
    font-size: 28px;
    color: #ffffff;
  }
  .romoveRelation {
    margin-right: 30px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #333333;
    border-radius: 4px;
    font-size: 24px;
    color: #333333;
    text-align: center;
  }
}
.desc {
  width: 100%;
  background: #ffffff;
  .desc_info {
    padding-top: 30px;
    padding-bottom: 30px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 28px;
    color: #a3aeba;
  }
}
.navbar {
  color: #a3aeba;
  height: 96px;
  line-height: 96px;
  font-family: PingFangSC-Regular;
  span {
    font-size: 32px;
  }
}
.item_card {
  margin-top: 20px;
  width: 100%;
  height: 325px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  .item_user {
    margin-top: 30px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    .item_cover {
      margin-left: 30px;
      width: 40px;
      height: 40px;
      border-radius: 40px;
    }
    .item_nick {
      flex: 1;
      margin-left: 12px;
      font-size: 24px;
      color: #a3aeba;
    }
    .item_time {
      margin-right: 30px;
      font-size: 24px;
      color: #a3aeba;
    }
  }
  .item_opt {
    margin-top: 32px;
    margin-left: 30px;
    font-size: 28px;
    color: #051426;
  }
  .item_info {
    margin-left: 30px;
    margin-top: 15px;
    margin-right: 30px;
    /* height: 140px; */
    background: rgba(163, 174, 186, 0.08);
    display: flex;
    .item_img {
      width: 220px;
      height: 140px;
    }
  }
  .item_content {
    flex: 1;
    margin: 20px;
    line-height: 44px;
    font-size: 28px;
    color: #051426;
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