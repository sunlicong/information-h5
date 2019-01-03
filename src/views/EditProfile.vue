<template>
  <div>
    <div class="myInfo">
      <img class="cover" :src="photo">
      <!-- <text class='cover_text'>点击修改头像</text> -->
    </div>
    <div class="item">
      <div class="name">昵称</div>
      <input class="info one_line" placeholder="请输入您的昵称" v-model="nick">
    </div>
    <div class="item">
      <div class="name">简介</div>
      <input class="info one_line" placeholder="请输入您的个性简介" v-model="desc" maxlength="24">
    </div>
    <mt-button class="save" @click="save()">保存</mt-button>
  </div>
</template>
<script>
export default {
  name: "EditProfile",
  data() {
    return {
      photo: this.$route.query.photo || "",
      nick: this.$route.query.nick || "",
      desc: this.$route.query.desc || ""
    };
  },
  mounted() {},
  methods: {
    save() {
      this.$ui.Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios({
        method: "post",
        url: "/blockchain/v1/user/updateProfile",
        data: {
          avatar: this.photo,
          nickName: this.nick,
          description: this.desc
        }
      })
        .then(response => {
          this.$ui.Indicator.close();
          if (response.data.status) {
            this.$ui.Toast("保存成功");
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
.myInfo {
  width: 100%;
  height: 240px;
  text-align: center;
  background: #ffffff;
  .cover {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    margin-top: 30px;
    background: #f4f4f4;
  }
  .cover_text {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #a3aeba;
    display: block;
  }
}

.item {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  background: #ffffff;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #051426;
  .name {
    float: left;
    margin-left: 30px;
    width: 90px;
    height: 100px;
    line-height: 100px;
  }
  .info {
    margin-left: 30px;
    margin-right: 40px;
    height: 100px;
    line-height: 100px;
    border: 0;
  }
}

.save {
  margin-top: 60px;
  margin-left: 30px;
  margin-right: 30px;
  width: 690px;
  height: 88px;
  background: #0794fc;
  border-radius: 8px;
  font-size: 36px;
  color: #ffffff;
}
</style>
