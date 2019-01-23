<template>
  <div>
    <div class="top">
      <img src="~@/assets/image/bg_sign_in.png" class="top_bg">
      <div class="top_content">
        <div class="top_content_menu">
          <div class="invite" @click="invite()">邀请好友</div>
          <div class="help" @click="raiders()">
            <div>攻略</div>
            <img src="~@/assets/image/icon_help_search.png">
          </div>
        </div>
        <div class="mining">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SignIn",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 600px;
  position: relative;
  .top_bg {
    position: absolute;
    width: 100%;
    height: 600px;
  }
  .top_content {
    position: absolute;
    width: 100%;
    height: 600px;
    .top_content_menu {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 30px;
      .invite {
        width: 145px;
        height: 66px;
        line-height: 66px;
        background: rgba(255, 255, 255, 0.1) none repeat scroll 0 0 !important;
        border-radius: 0 100px 100px 0;
        font-size: 28px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
      }
      .help {
        width: 145px;
        height: 66px;
        line-height: 66px;
        background: rgba(255, 255, 255, 0.1) none repeat scroll 0 0 !important;
        border-radius: 100px 0 0 100px;
        font-size: 28px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 5px;
          width: 30px;
          height: 30px;
        }
      }
    }
    
  }
}
</style>