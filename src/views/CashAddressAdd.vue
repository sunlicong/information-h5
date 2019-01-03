<template>
  <div>
    <div>
      <div class="title">
        <img class="icon" src="~@/assets/image/icon_trx.png" alt>
        <span class="name">TRX</span>
      </div>
      <div class="item">
        <input type="text" placeholder="请输入提现地址" v-model="address">
      </div>
      <div class="item">
        <input type="text" placeholder="地址备注" v-model="remark">
      </div>
      <div class="item">
        <input type="password" placeholder="请输入6位纯数字地址密码" maxlength="6" v-model="password">
      </div>
    </div>
    <div>
      <p class="tip_title">添加须知</p>
      <p class="tip1">1、为保证资产安全，添加地址后，仅能提现到账该地址，请勿随意添加</p>
      <p class="tip1">2、修改提现地址时验证地址密码，请妥善保存，遗失或泄漏造成的资产，平台概不负责</p>
    </div>
    <mt-button class="button" @click.native="save()">保存</mt-button>
  </div>
</template>
<script>
export default {
  name: "CashAddressAdd",
  data() {
    return {
      id: this.$route.query.id || 0,
      address: this.$route.query.withdrawAddress || "",
      remark: this.$route.query.remark || "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    save() {
      if (this.address.length < 1) {
        this.$ui.Toast("请输入提现地址");
        return;
      }
      if (this.remark.length < 1) {
        this.$ui.Toast("请输入备注");
        return;
      }
      if (!(/^\d{6}$/.test(this.password))){
        this.$ui.Toast('请输入6位纯数字地址密码');
        return;
			}
      var title = "添加提现地址"
      var message = "添加提现地址后，仅能提现到该地址，请核对提现地址和地址密码无误后，进行添加"
      var confirmButtonText = "确定添加"
      if (this.id) {
        title = "修改提现地址"
        message = "修改提现地址后，仅能提现到该地址，确认修改么？"
        confirmButtonText = "确定修改"
      }
      this.$ui
        .MessageBox({
          title: title,
          message: message,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: confirmButtonText,
          cancelButtonText: "取消"
        })
        .then(action => {
          if (action == "confirm") {
            this.$ui.Indicator.open({
              text: "加载中...",
              spinnerType: "snake"
            });
            var url = "/blockchain/v1/user/saveWithdrawAddress";
            if (this.id) {
              url = "/blockchain/v1/user/updateWithdrawAddress";
            }
            this.$axios({
              method: "post",
              url: url,
              data: {
                id: this.id,
                currency: "trx",
                withdrawAddress: this.address,
                remark: this.remark,
                addressPwd: this.password
              }
            })
              .then(response => {
                this.$ui.Indicator.close();
                if (response.data.status) {
                  this.$ui.Toast("保存成功");
                  this.$router.go(-1);
                }
              })
              .catch(response => {
                this.$ui.Indicator.close();
              });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 110px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  background-color: white;
  .icon {
    width: 60px;
    height: 60px;
  }
  .name {
    flex: 1;
    margin-left: 15px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #2a2e3f;
  }
}
.item {
  margin-top: 1px;
  width: 100%;
  height: 110px;
  background: #ffffff;
  input {
    padding-left: 30px;
    padding-right: 30px;
    width: 100%;
    height: 110px;
    line-height: 110px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    background: #ffffff;
    border: 0;
  }
}
.tip_title {
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 32px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ff6700;
  line-height: 45px;
}
.tip1 {
  margin-left: 30px;
  margin-right: 30px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
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
</style>
