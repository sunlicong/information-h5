<template>
  <div>
    <div class="publish">
      <div class="item">
        <div class="title">文章标题</div>
        <input type="text" placeholder="最多50个字" v-model="title">
      </div>
      <div class="item">
        <div class="title">添加文章链接</div>
        <input type="text" placeholder="复制已有文章链接" v-model="url">
      </div>
      <div class="item" @click="selectTags">
        <div class="title flex1">选择文章标签</div>
        <div class="right">
          <div
            class="quan-total"
            :class="tags.length>1?'color051426':''"
          >{{tags.length?"已选择"+tags.length+"个标签":"未选择"}}</div>
          <img class="arrow" src="~@/assets/image/arrows_right.png">
        </div>
      </div>
      <div class="tip">
        <p>支持一键发布今日头条的内容。</p>
        <p>请务必发布本人文章，若发布他人内容导致纠纷，将做封号处理。</p>
      </div>
      <mt-button
        :class="title.length==0||url.length==0||tags.length==0?'disabledBg':'button'"
        class="button"
        @click.native="priview()"
      >查看文章效果</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Publish",
  data() {
    return {
      title: this.$route.query.title || "",
      url: this.$route.query.url || "",
      tags: this.$route.query.tags || []
    };
  },
  mounted() {},
  methods: {
    selectTags() {
      this.$router.push({
        path: "/PublishSelectTag",
        query: {
          title: this.title,
          url: this.url,
          tags: this.tags
        }
      });
    },
    priview() {
      if (this.title.length < 1) {
        this.$ui.Toast("请输入文章标题");
        return;
      }
      if (this.url.length < 4) {
        this.$ui.Toast("请输入文章链接");
        return;
      }
      if (this.tags.length == 0) {
        this.$ui.Toast("请选择文章标签");
        return;
      }
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/content/preview",
        data: {
          url: this.url,
          title: this.title
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.data = response.data.data;
            this.$router.push({
              path: "/PublishPriview",
              query: {
                title: this.title,
                url: this.url,
                tags: this.tags,
                createTime: response.data.data.createTime
              }
            });
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
.item {
  margin-top: 1px;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  background: #ffffff;
  .flex1 {
    flex: 1;
  }
  .title {
    margin-left: 30px;
    width: 280px;
    font-size: 32px;
    color: #051426;
    line-height: 110px;
  }
  input {
    flex: 1;
    margin-right: 30px;
    text-align: right;
    background: #ffffff;
    border: 0;
    font-size: 32px;
    line-height: 110px;
  }
  .right {
    display: flex;
    align-items: center;
    .quan-total {
      font-size: 28px;
      color: #a3aeba;
    }
    .color051426 {
      color: #051426;
    }
    .arrow {
      width: 12px;
      height: 21px;
      margin-left: 12px;
      margin-right: 30px;
    }
  }
}
.tip {
  margin-left: 30px;
  margin-top: 15px;
  font-size: 26px;
  color: #a3aeba;
  line-height: 40px;
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
.disabledBg {
  background: #a1a1a1;
  opacity: 1;
}
</style>