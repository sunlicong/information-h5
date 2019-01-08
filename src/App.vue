<template>
  <div id="app">
    <!-- <router-view/> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  created() {
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') == -1) {
      this.$ui
        .MessageBox({
          title: "提示",
          message:
            "请微信搜索“大鱼快报”公众号体验或复制链接微信内打开，浏览器仅可浏览，无法登录",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "知道了"
        })
        .then(action => {});
    }
  }
};
</script>
<style lang="less">
@import "./style/common/mobile.common.css";
</style>
