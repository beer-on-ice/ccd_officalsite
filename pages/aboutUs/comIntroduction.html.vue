<template>
 <div>
    <Header></Header>
    <banner-block></banner-block>
    <div class="fluid-container">
      <div class="tabs flex-between-center">
        <div
          @click.stop="switchTab(index)"
          :class="{'tab-item':true,'active':item.active}"
          v-for="(item, index) in tabsData"
          :key="index"
        >
          <span class="txt">{{item.txt}}</span>
        </div>
      </div>
    </div>
    <div style="height:.04rem;background-color:#F5F5F5"></div>
    <div class="fluid-container">
      <div class="main-content">
    <div class="banner">
      <img class="img-block" src="@/assets/img/comIntro.png" alt="" />
    </div>
    <div class="intro">
      <p>
      才查到科技是一家依托人工智能、大数据、云计算等前沿科技手段，为政府监管机构、金融机构及投资人群提供专业化、智能化、个性化服务的互联网
      创新金融监管科技平台。公司总部位于上海北外滩，核心团队由人工智能、数据分析专家组成，团队成员均拥有10年以上互联网科技从业经历，具备先
      进的互联网科技服务创新理念与雄厚的技术研发能力。
    </p>
    <p>
      才查到科技与微软（亚洲）研究院AI专家组合作，致力于打造投资者首选的互联网创新金融监管科技综合服务平台，持续赋能金融细分领域科技创新，
      构建共生金融科技生态圈。才查到科技还与香港专业保险经济协会会员——香港恒源金融集团携手为高净值人群提供多样化、精细化的一站式海外保险
      咨询及理赔服务。
    </p>
    <p>
      才查到科技也将建立独立第三方金融点评信息平台。不仅可为用户提供金融商户信息、金融产品合规披露、过往投资数据、发行产品维度、核心团队成
      员介绍、各平台特色服务展示等信息服务，同时亦打通用户与各类金融机构的信息咨询、高端服务定制、私行服务咨询、家族办公室定制等预约通道。
      还可通过企业多维度数据量身定制金融机构专属的营销解决方案，彰显品牌价值，拉近用户与品牌之间的心里距离。
    </p>
    </div>
    <fixed-bar></fixed-bar>
  </div>
    </div>
    <Footer></Footer>
  </div>
  
</template>
<script>
import fixedBar from '@/components/fixedBar';
export default {
  data () {
    return {
      tabsData: [
        {
          txt: '公司简介',
          active: false
        },
        {
          txt: '公司愿景',
          active: false
        },
        {
          txt: '发展历程',
          active: false
        },
        {
          txt: '合作伙伴',
          active: false
        },
        {
          txt: '联系我们',
          active: false
        }
      ],
    };
  },
   head () {
    return {
      title: '关于我们-财查到',
      meta: [
        {  name: 'keywords', content: '关于我们,财查到,才查到' },
        { name: 'description', content: '才查到科技是一家依托人工智能、大数据、云计算等前沿科技手段，为政府监管机构、金融机构及投资人群提供专业化、智能化、个性化服务的互联网创新金融监管科技平台。' },
      ]
    }
  },
  components: { fixedBar },
  computed: {
    isShow () {
      if (this.$store.state.activeIndex == 0) {
        return 'comIntroduction';
      } else if (this.$store.state.activeIndex == 1) {
        return 'corporateVision';
      } else if (this.$store.state.activeIndex == 2) {
        return 'devHistory';
      } else if (this.$store.state.activeIndex == 3) {
        return 'Partner';
      } else {
        return 'contactUs';
      }
    }
  },
  methods: {
    switchTab (index) {
      this.$store.commit('changeIndex',index)
      this.tabsData.forEach((item, index) => {
        item.active = false;
      });
      this.tabsData[index].active = true;
      this.$router.push({
        path: `/aboutUs/${this.isShow}.html`
      });
    }
  },
  created () {
    this.tabsData.forEach((item, index) => {
      item.active = false;
    });
    this.tabsData[this.$store.state.activeIndex].active = true;
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  padding: 0.4rem 0;
  .banner {
    height: 2.8rem;
    margin-bottom: 0.5rem;
  }
  .intro {
    p {
      margin-bottom: .3rem;
      line-height: .32rem;
      font-size: .18rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
/deep/ .fixed-bar {
  margin-left: 12.1rem !important;
}
</style>
<style lang="scss" scoped>
.tabs {
  .tab-item {
    padding-top: 0.2rem;
    padding-bottom: 8px;
    font-size: 0.2rem;
    position: relative;
    cursor: pointer;
    &.active {
      color: #1a52ff;
      font-weight: bold;
    }
    &.active::after {
      content: "";
      width: 100%;
      height: 0.04rem;
      background-color: #f12d2d;
      position: absolute;
      bottom: -0.04rem;
      left: 0;
      right: 0;
    }
  }
}
  
</style>


