<template>
  <div class="notFound">
    <Header></Header>
    <banner-block></banner-block>
    <!-- 列表部分 -->
    <div class="pic flex-center-center">
      <img class="img-block" src="@/assets/img/notfound.png" alt />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Pagination from "@/components/pagination.vue";
import Footer from "@/components/footer.vue";
import bannerBlock from "@/components/bannerBlock.vue";
import backTop from "@/core/mixin/backTop";

export default {
  mixins: [backTop],
  data() {
    return {};
  },
 head() {
    return {
      title: "财查到-智能、高效的一站式创新金融监管科技服务平台",
      meta: [
        {
          name: "keywords",
          content:
            "私募,基金,信托,银行,理财,证券,资讯,基金公司,基金高管,人工智能,大数据,区块链,财查到,才查到,高净值,金融产品鉴别"
        },
        {
          name: "description",
          content:
            "财查到是由上海才查到科技有限公司利用人工智能，大数据，云计算，区块链等前沿科技手段研发的一站式金融产品鉴别平台，提供全方位的金融数据查询，包含私募、基金、信托、银行、理财、证券、资讯、基金公司、基金高管等海量金融信息，为高净值用户解决投前不会选，投后不会管的痛点。"
        }
      ]
    };
  },
  components: {
    Header,
    Pagination,
    Footer,
    bannerBlock
  },
  created() {},
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.notFound {
  height: 100vh;
  display: -webkit-flex;
  display: flex;
  display: -moz-flex;
  display: -ms-flexbox;
  flex-direction: column;
  .pic {
    flex: 1;
    img {
      width: 4.82rem;
      height: 2.57rem;
    }
  }
}
</style>
