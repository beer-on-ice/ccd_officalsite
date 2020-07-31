<template>
  <footer>
    <div class="footer flex-0-center">
      <div class="fluid-container flex-between-center">
        <div class="left">
          <p class="toLink">
            Copyright@2018-2020
            <a href="http://www.aifound.cn"> www.aifound.cn </a> All Rights
            Reserved
          </p>
          <p>版权所有：上海才查到科技有限公司</p>
          <p>电话：021-61406392</p>
          <p>联系地址：上海市虹口区四川北路1500号上海投资组合中心大厦3楼</p>
          <p class="toLink">
            <a target="_blank" href="http://www.beian.miit.gov.cn"
              >沪ICP备18041452号</a
            >
          </p>
        </div>
        <div class="right flex-0-center">
          <div class="download flex-column">
            <div class="er">
              <img
                class="img-block"
                src="@/assets/img/footerDown1.png"
                alt="扫码下载财查到APP"
              />
            </div>
            <div>扫码下载财查到APP</div>
          </div>
          <div class="attention flex-column">
            <div class="er">
              <img
                class="img-block"
                src="@/assets/img/footerDown2.png"
                alt="关注微信公众号"
              />
            </div>
            <div>关注微信公众号</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {};
  },

  computed: {},
  methods: {},
  created() {
    // 百度统计代码
    // this.$nextTick(() => {
    //   var hm = document.createElement('script');
    //   hm.src = 'https://hm.baidu.com/hm.js?2ba00b65470c0639c7eb4f1b6eb5d40e';
    //   var s = document.getElementsByTagName('script')[0];
    //   s.parentNode.insertBefore(hm, s);
    // });
  }
};
</script>

<style lang="scss" scoped>
.footer {
  height: 2.34rem;
  background: url("../assets/img/footer-banner.png") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  .fluid-container {
    height: 100%;
  }
  .left {
    p {
      margin-bottom: 0.12rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
    a {
      color: #fff;
    }
    .toLink a {
      &:hover {
        color: #e92137;
      }
    }
  }
  .right {
    .download {
      margin-right: 0.93rem;
    }
    .er {
      width: 1.23rem;
      height: 1.23rem;
      margin-bottom: 0.06rem;
    }
  }
}
</style>
