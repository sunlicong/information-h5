<template>
  <div>
    <div class="top_card">
        <div class="text1">已获奖励（元）</div>
        <div class="text2">2345.00</div>
        <div class="text3">累计签到份数 198</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyRecord",
  data() {
    return {
      
    };
  },
  created() {

  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.top_card{
    width: 100%;
    height: 390px;
    background-image: url(~@/assets/image/bg_myrecord_card.png);
    background-size:100% 100%;
    text-align: center;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#EEA6A4;
    line-height:33px;
    padding-top: 57px;
    .text2{
        margin-top: 10px;
        font-size:64px;
        font-family:Arial-BoldMT;
        font-weight:normal;
        color:#FFFFFF;
        line-height:74px;
    }
    .text3{
        margin-top: 10px;
    }
}
</style>