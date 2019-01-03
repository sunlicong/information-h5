<template>
  <div>
    <button @click="isShow=!isShow">过渡</button>

    <transition @before-leave="beforeEnter" v-on:leave="enter" v-on:after-leave="afterEnter">
      <!-- <h1 v-show="isShow">这个东西多少钱？how much？</h1> -->
      <img v-show="isShow"  @click="isShow==true" class="img_mining" src="~@/assets/image/icon_mining.png">
    </transition>
  </div>
</template>
<script>
export default {
  name: "Test",
  data() {
    return {
      isShow: true
    };
  },
  mounted() {

  },
  methods: {
    beforeEnter(el) {
      // 开始动画之前，也就是起始状态
      el.style.transform = "translate(370px,50px)";
      el.style.opacity = 1;
      el.style.transition = "all 2s ease";
    },
    enter(el, done) {
      // 动画指定的过程
      // console.log('enter');

      // 作用：告诉浏览器重绘或重排页面结构
      // offsetWidth 会通知浏览器重新计算元素的宽度，这样，会造成浏览器重绘
      // el.offsetWidth
      el.offsetHeight;

      // 设置动画要达到的目标状态
      el.style.transform = "translate(50px,150px)";
      el.style.opacity = 0.5;
      done();
    },
    afterEnter(el) {
      // 动画结束
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style lang="less" scoped>
.img_mining{
    width: 80px;
    height: 80px;
}
</style>


