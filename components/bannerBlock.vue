<template>
  <!-- banner部分 -->
  <div class="banner">
    <div style="height:100%" class="fluid-container flex-center-center">
      <div class="search-input flex-0-center">
        <div class="logo-wrapper">
          <router-link to="/">
            <img
              style="width:1.8rem;height:.65rem"
              src="@/assets/img/logo.png"
              alt="财查到"
            />
          </router-link>
        </div>
        <input
          @keydown.enter="toSearch"
          type="text"
          v-model="keywords"
          placeholder="请输入关键字"
        />
        <div @click="toSearch" class="single-btn">搜索</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: ""
    };
  },
  computed: {},
  methods: {
    toSearch() {
      if (!this.keywords.trim()) {
        return alert("请输入关键词");
      }
      window.localStorage.setItem("keywords", this.keywords);
      const { href } = this.$router.resolve({
        path: `/keywordList/1/${this.keywords}.html`
      });
      if (this.$route.fullPath.startsWith("/keywordList/")) {
        this.keywords = "";
         window.open(href,"_self");
      } else {
        window.open(href, "_blank");
        this.keywords = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 1.94rem;
  background: url("../assets/img/banner-bg.png") no-repeat center center;
  background-size: 100% 100%;
  .logo-wrapper {
    margin-right: 0.4rem;
  }
  .search-input {
    input {
      height: 0.4rem;
      width: 6.35rem;
      border: none;
      border-radius: 0.08rem;
      font-size: 0.18rem;
      padding: 0 0.3rem;
    }
    .single-btn {
      width: 1.26rem;
      height: 0.4rem;
      background: #1a52ff;
      border-radius: 0.08rem;
      color: #fff;
      font-size: 0.18rem;
      margin-left: 0.2rem;
      line-height: 0.4rem;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
