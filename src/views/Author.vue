<template>
  <div class="Author"></div>
</template>
<script>
import { baseUrl, appId } from "../utils/config.js";
export default {
  name: "Author",
  created() {
    this.$ui.Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    });
    var code = this.$route.query.code;
    if (code) {
      this.getToken(code);
    } else {
      this.authorize();
    }
  },
  methods: {
    authorize() {
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        appId +
        "&redirect_uri=" +
        baseUrl +
        "/dayu/Author&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    },
    getToken(code) {
      var inviter = this.$getCookie("inviter") || "";
      var n = inviter.indexOf(",");
      if (n > -1) {
        inviter = inviter.slice(0, n);
      }
      this.$axios({
        method: "post",
        url: "/blockchain/v1/account/wechat/token",
        data: {
          code: code,
          inviter: inviter
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$store.commit("setFirst");
            this.$store.commit("saveUserInfo", response.data.data);
            this.goBeforUrl();
          }
        })
        .catch(response => {
          this.$ui.Indicator.close();
        });
    },
    goBeforUrl() {
      var url = this.$getCookie("beforeLoginUrl") || "/Home";
      if (!url || url.indexOf("/Author") != -1) {
        this.$router.replace("/Home");
      } else {
        this.$router.replace(url);
        this.$setCookie("beforeLoginUrl", "");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.Author {
  margin-top: 50px;
  text-align: center;
}
</style>


