<template>
  <div>
    <ul class="NavBar clearfix">
      <li class="nav_list">
        <div @click="goHome()" to="/Home" class="nav">
          <img src="~@/assets/image/index_s.png" v-if="$route.path=='/Home'">
          <img src="~@/assets/image/index_n.png" v-else>
          <p>首页</p>
        </div>
      </li>
      <li class="nav_list">
        <div @click="goWallet()" to="/Wallet" class="nav">
          <img src="~@/assets/image/wallet_s.png" v-if="$route.path=='/Wallet'">
          <img src="~@/assets/image/wallet_n.png" v-else>
          <p>钱包</p>
        </div>
      </li>
      <li class="nav_list">
        <div @click="goMine()" to="/Mine" class="nav">
          <img src="~@/assets/image/me_s.png" v-if="$route.path=='/Mine'">
          <img src="~@/assets/image/me_n.png" v-else>
          <p>我的</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goHome() {
      this.$router.push({
        path: "/Home"
      });
    },
    goWallet() {
      this.$router.push({
        path: "/Wallet"
      });
    },
    goMine() {
      this.$router.push({
        path: "/Mine"
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "../style/common/config.less";
.NavBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  border-top: 1px solid #dcdcdc;
  z-index: 10;
}
.NavBar .nav_list {
  width: 33.33%;
  float: left;
  height: 98px;
  padding: 10px 0;
}
.nav {
  text-align: center;
  display: block;
  p {
    font-size: 22px;
    color: #a3aeba;
  }
}
.nav img {
  width: 40px;
  height: 40px;
}
.router-link-active {
  p {
    color: #0794fc;
  }
}
</style>