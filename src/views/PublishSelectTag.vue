<template>
  <div class="selectTags">
    <mt-checklist v-model="tags" :options="tagList"></mt-checklist>
    <mt-button class="button" @click="save()">保存</mt-button>
  </div>
</template>
<script>
export default {
  name: "PublishSelectTag",
  data() {
    return {
      tagList: [
        "娱乐",
        "情感",
        "搞笑",
        "健康",
        "养生",
        "教育",
        "生活",
        "科技",
        "财经",
        "故事",
        "汽车",
        "星座",
        "美食",
        "时尚",
        "旅游",
        "育儿",
        "体育",
        "房产",
        "历史",
        "军事"
      ],
      tags: this.$route.query.tags || []
    };
  },
  mounted() {},
  methods: {
    save() {
      this.$router.push({
        path: "/Publish",
        query: {
          title: this.$route.query.title || "",
          url: this.$route.query.url || "",
          tags: this.tags || []
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>

.selectTags {
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
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