<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item class="navbar" id="1">作品</mt-tab-item>
      <mt-tab-item class="navbar" id="2">数据</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div v-if="list.length==0" class="non">
          <img src="~@/assets/image/img_non.png">
          <div>暂时还没有数据哦～</div>
        </div>
        <mu-load-more class="feeds" :loading="loading" @load="loadMore">
          <div class="feed_item" v-for="(feed,index) in list">
            <div
              v-if="getImgs(feed.coverPid).length==1||getImgs(feed.coverPid).length==2"
              class="style1"
              @click="goDetail(feed.contentId)"
            >
              <div class="feed_title">{{feed.title}}</div>
              <img
                v-if="index<1"
                v-for="(item,index) in getImgs(feed.coverPid)"
                :key="index"
                :src="item"
                alt
              >
            </div>
            <div v-else class="style2" @click="goDetail(feed.contentId)">
              <div class="feed_title">
                <span>{{feed.title}}</span>
              </div>
              <div class="more_imgs">
                <div v-if="index<3" v-for="(item,index) in getImgs(feed.coverPid)" :key="index">
                  <img :src="item" alt>
                </div>
              </div>
            </div>
            <div class="bottom_tag">
              <div class="zan">
                <img src="~@/assets/image/icon_candy_count.png">
                {{feed.investAmount}}糖果
              </div>
              <div class="zan">
                <img src="~@/assets/image/icon_praise_non.png">
                {{feed.likeNum}}人
              </div>
              <div class="zan flex1">
                <img src="~@/assets/image/icon_look.png">
                {{feed.browserNum}}
              </div>
              <div class="delete" @click="deleteItem(feed.contentId,index)">
                <img src="~@/assets/image/icon_close.png">
              </div>
            </div>
          </div>
        </mu-load-more>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="myInfo">
          <img class="img" src="~@/assets/image/bg_circle.png">
          <div class="info_num">
            <div class="text1">累计收益(点钻)</div>
            <div class="text2">{{worksData.totalProfit}}</div>
          </div>
        </div>
        <div class="fans_view">
          <div class="fans_num">粉丝 {{worksData.fansCount}}</div>
          <div class="fans_num">累积阅读量 {{worksData.totalReads}}</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button class="button" @click.native="publish()">发布作品</mt-button>
  </div>
</template>
<script>
export default {
  name: "MyWorks",
  data() {
    return {
      selected: "1",
      list: [],
      loading: false,
      worksData: {
        totalProfit: 0,
        fansCount: 0,
        totalReads: 0
      }
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
        url: "/blockchain/v1/user/queryProfileContentsList",
        data: {
          next: this.next,
          uid: this.$store.state.user.uid || "1076321355420401664"
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
    getImgs(coverPid) {
      return coverPid ? coverPid.split(",") : [];
    },
    /**
     * 删除
     */
    deleteItem(id, index) {
      this.$ui
        .MessageBox({
          title: "提示",
          message: "确认删除文章吗？",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "确认删除",
          cancelButtonText: "取消"
        })
        .then(action => {
          if (action == "confirm") {
            this.$ui.Indicator.open({
              text: "加载中...",
              spinnerType: "snake"
            });
            this.$axios({
              method: "get",
              url: "/blockchain/v1/content/del",
              data: {
                contentId: id
              }
            })
              .then(response => {
                this.$ui.Indicator.close();
                if (response.data.status) {
                  this.$ui.Toast("删除成功");
                  this.list.splice(index, 1);
                }
              })
              .catch(response => {
                this.$ui.Indicator.close();
              });
          }
        });
    },
    /**
     * 发布
     */
    publish() {
      this.$router.push({
        path: "/Publish"
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
    }
  }
};
</script>
<style lang="less" scoped>
.navbar {
  color: #a3aeba;
  height: 96px;
  line-height: 96px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
}
.feeds {
  padding-bottom: 98px;
}
.feed_item {
  background: #ffffff;
  overflow: hidden;
  position: relative;
  margin-top: 2px;
  .style1 {
    margin-left: 30px;
    margin-top: 30px;
    margin-right: 30px;
    display: flex;
    .feed_title {
      flex: 1;
      line-height: 50px;
      font-size: 36px;
      color: #051426;
      font-family: PingFangSC-Semibold;
      font-weight: 400;
    }
    img {
      margin-left: 15px;
      width: 220px;
      height: 140px;
      background: #f4f4f4;
      object-fit: cover;
    }
  }
  .style2 {
    .feed_title {
      margin-left: 30px;
      margin-top: 30px;
      margin-right: 30px;
      span {
        line-height: 50px;
        font-size: 36px;
        color: #051426;
        font-family: PingFangSC-Semibold;
        font-weight: 400;
        padding-top: 7px;
      }
    }
    .more_imgs {
      margin-top: 26px;
      margin-left: 30px;
      margin-right: 30px;
      div {
        display: inline-block;
        overflow: hidden;
        width: 33.3%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      div:first-child {
        float: left;
        padding-right: 2px;
      }
      div:last-child {
        float: right;
        padding-left: 2px;
      }
      img {
        width: 100%;
        height: 140px;
        background: #f4f4f4;
        object-fit: cover;
      }
    }
  }
}
.bottom_tag {
  height: 78px;
  line-height: 78px;
  display: flex;
  font-size: 22px;
  color: #a3aeba;
  .flex1 {
    flex: 1;
  }
  .zan {
    margin-left: 40px;
    margin-right: 10px;
    img {
      margin-top: -10px;
      width: 30px;
      height: 30px;
    }
  }
  .delete {
    margin-right: 40px;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
.myInfo {
  position: relative;
  margin-top: 164px;
  margin-left: 170px;
  width: 410px;
  height: 410px;
  .img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .info_num {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
.fans_view {
  margin-top: 128px;
  margin-left: 35px;
  margin-right: 35px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .fans_num {
    margin-left: 10px;
    margin-right: 10px;
    width: 320px;
    height: 80px;
    line-height: 80px;
    border: 2px solid #a3aeba;
    border-radius: 40px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #a3aeba;
    letter-spacing: 0;
    text-align: center;
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