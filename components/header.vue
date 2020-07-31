<template>
  <header>
    <div class="header">
      <div class="fluid-container flex-between-center">
        <h4 class="left-txt">财查到 - 信息为本 智享科技</h4>
        <div>
          <router-link class="fl" :to="{ path: '/' }"
            ><div class="right-txt">首页</div></router-link
          >
          <span class="fl" style="margin:0 .08rem"> | </span>
          <!-- <nuxt-link class="fl" :to="{ path: '/aboutUs/' }"
            > -->
            <div @click="toAboutUs" class="right-txt fl">关于我们</div>
            <!-- </nuxt-link> -->
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data () {
    return {};
  },
  computed: {},
  methods: {
    toAboutUs(){
      this.$router.push({
        path:'/aboutUs/comIntroduction.html',
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 0.56rem;
}
.fluid-container {
  height: 100%;
  h4 {
    font-weight: 400;
  }
  .right-txt:hover {
    cursor: pointer;
    // color: #e92137;
  }
  // a:link,
  // a:hover,
  // a:focus {
  //   color: #333;
  // }
  // a:active {
  //   color: #e92137;
  // }
  a:focus {
    color: #e92137
  }
  a:hover {
    color: #e92137
  }
}
</style>
