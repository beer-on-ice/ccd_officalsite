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
      <img class="img-block" src="@/assets/img/contactUs.png" alt="" />
    </div>
    <div class="info-container flex-center-center">
       <div class="info">
           <ul>
             <li class="item">
               <div class="label">办公地址：</div>
               <strong class="txt large-font" style="display:block">上海才查到科技有限公司</strong>
               </li>
             <li class="item">
               <div class="txt">地址：上海市虹口区四川北路1500号上海投资组合中心大厦3楼</div>
               </li>
             <li class="item">
               <div class="txt">电话：61406392</div>
               </li>
             <li class="item">
               <div class="txt">邮箱：service.ccd@aifound.cn</div>
               </li>
             <li class="item">
               <strong class="txt large-font">上海才查到科技有限公司苏州分公司</strong>
               </li>
             <li class="item">
               <div class="txt">地址：苏州工业园区星湖街328号创意产业园4-B503单元</div>
               </li>
             <li class="item">
               <div class="txt">电话：15851538149</div>
               </li>
               <li class="item">
               <div class="label">洽谈合作：</div>
               <div class="txt">企业品牌推广、资源置换、广告投放、市场合作，请联系：周经理</div>
               </li>
               <li class="item">
               <div class="txt">电话：13816617078</div>
               </li>
               <li class="item">
               <div class="txt">Email：zhouchenqing@aifound.cn</div>
               </li>
               <li class="item">
               <div class="txt">媒体、投融资相关事宜，请联系：季经理</div>
               </li>
               <li class="item">
               <div class="txt">电话：18516269764</div>
               </li>
               <li class="item">
               <div class="txt">Email：jiyuetong@aifound.cn</div>
               </li>
           </ul>
       </div>
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
    };
  },
  head () {
    return {
      title: '联系我们-财查到',
      meta: [
        { name: 'keywords', content: '联系我们,财查到,才查到' },
        { name: 'description', content: '上海才查到科技有限公司, 地址：上海市虹口区四川北路1500号上海投资组合中心大厦3楼, 电话：61406392, 邮箱：service.ccd@aifound.cn' },
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
  padding: .4rem 0;
  .banner {
    height: 2.8rem;
    margin-bottom: 0.5rem;
    margin-bottom: .3rem;
  }
  .info {
    font-size: .18rem;
    .item {
      margin-bottom: .2rem;
      .label {
        float: left;
        width: 1.4rem;
        text-align: right;
        padding-right: .2rem;
        box-sizing: border-box;
      -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
        font-size: .24rem;
        line-height: .24rem;
        & + .txt {
          height: .24rem;
          line-height: .24rem;
        }
      }
      .txt {
        margin-left:1.4rem ;

      }
      &:last-child {
        margin-bottom: 0;
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
