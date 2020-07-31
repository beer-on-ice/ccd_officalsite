<template>

<div>
    <Header></Header>
    <banner-block></banner-block>
    <div class="fluid-container">
      <div class="tabs flex-between-center">
        <div
          @click="switchTab(index)"
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
      <div class="pic">
        <img class="img-block" src="@/assets/img/left-gun.png" alt="" />
      </div>
      <h1 class="txt">
        打造投资者首选的互联网创新金融监管科技综合服务平台，构建共生科技生态圈
      </h1>
      <div class="pic fr">
        <img class="img-block" src="@/assets/img/right-gun.png" alt="" />
      </div>
    </div>
    <div class="intro flex-center-center">
      <ul class="lists">
        <div v-for="(item,index) in listData" :key="index" class="item flex-0-center">
          <div class="pic">
            <img class="img-block" :src="require(`@/assets/img/${item.icon}.png`)" alt="" />
          </div>
          <div class="content">
            <h4>{{item.title}}</h4>
            <div class="txt">
              {{item.txt}}
            </div>
          </div>
        </div>
      </ul>
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
  components: { fixedBar },
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
      listData: [
        {
          icon: 'icon1',
          title: '围绕用户需求，解决“投前不会选、投后不会管”的痛点',
          txt: '投前金融产品鉴别，将风险防控在发生之前；投后存续记账管理、风险预警实时防范产品风险，最大限度满足高/超高净值人群的使用需求'
        },
        {
          icon: 'icon2',
          title: '辅助政府监管，扩大风险监控的广度与深度',
          txt: '依托金融产品大数据与技术支撑，通过管理人及产品关联信息穿透，全面、及时、准确掌握微观金融机构风险，确保政府金融监管效率和用户所投资产安全。'
        },
        {
          icon: 'icon3',
          title: '赋能金融机构，解决传统风控基于人工经验的盲区',
          txt: '24小时不间断监控金融产品风险，全场景化、多数据维度监控管理人动态，协助金融机构提前预防潜在风险，提升其自身风险检测效率和风险控制水平。'
        },
        {
          icon: 'icon4',
          title: '深耕金融细分领域，积累专业人才实现先进科技支撑',
          txt: '扩大对细分领域的科技人才、数据与技术的积累，完成金融细分领域用户需求的深度定制，凭借技术优势重塑行业生态，深度改造细分行业价值链。'
        }
      ]
    };
  },
  head () {
    return {
      title: '公司愿景-财查到',
      meta: [
        { name: 'keywords', content: '公司愿景,财查到,才查到' },
        { name: 'description', content: '才查到科技依托金融产品大数据与技术支撑，通过管理人及产品关联信息穿透，全面、及时、准确掌握微观金融机构风险，确保政府金融监管效率和用户所投资产安全。' },
      ]
    }
  },
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
    background: url("../../assets/img/version-bg.png") no-repeat center center;
    background-size: 100% 100%;
    padding: 0.86rem 1.8rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin-bottom: 0.44rem;
    .pic {
      width: 1.32rem;
      height: 0.08rem;
    }
    .txt {
      font-size: 0.24rem;
      color: #fff;
    }
    h1 {
      height: 0.84rem;
      line-height: 0.84rem;
    }
  }
  .intro {
    .lists {
      .item {
        height: 0.9rem;
        margin-bottom: .28rem;
        &:last-child{
          margin-bottom: 0;
        }
        .content {
          width:6.24rem ;
        }
        .pic {
          width: 0.9rem;
          height: 0.9rem;
          margin-right: .57rem;
        }
        h4 {
            font-size: .2rem;
            height:.26rem ;
            line-height: .26rem;
            margin-bottom:.1rem ;
            color: #000;
        }
        .txt {
          line-height: .22rem;
          color: #666;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
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
