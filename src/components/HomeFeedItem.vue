<template>
  <div>
    <div class="feed_item" @click="goPage">
      <div v-if="getImgs(feed.coverPid).length==1||getImgs(feed.coverPid).length==2" class="style1">
        <div class="feed_title">{{feed.title}}</div>
        <img
          v-if="index<1"
          v-for="(item,index) in getImgs(feed.coverPid)"
          :key="index"
          :src="item"
          alt
        >
      </div>
      <div v-else class="style2">
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
        <div class="source">{{feed.source}}</div>
        <div class="shang">
          <img src="~@/assets/image/icon_item_praise_no.png">
          {{feed.investAmount}}
        </div>
        <div class="zan">
          <img src="~@/assets/image/icon_praise_non.png">
          {{feed.likeNum}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFeedItem",
  props: ["feed"],
  data() {
    return {};
  },
  methods: {
    goPage(event) {
      this.$router.push({
        path: "/FeedDetail",
        query: { contentId: this.feed.contentId }
      });
    },
    getImgs(coverPid) {
      return coverPid ? coverPid.split(",") : [];
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">

.family() {
  font-family: PingFangSC-Medium;
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
      line-height: 53px;
      font-size: 38px;
      color: #051426;
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
        line-height: 53px;
        font-size: 38px;
        color: #051426;
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
  margin-top: 16px;
  margin-bottom: 27px;
  height: 30px;
  line-height: 30px;
  display: flex;
  font-size: 22px;
  color: #a3aeba;
  .source {
    margin-left: 30px;
  }
  .shang {
    margin-left: 40px;
    line-height: 30px;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .zan{
    margin-left: 40px;
    line-height: 30px;
    img {
      width: 28px;
      height: 28px;
    }
  }
}
</style>