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
      <!-- <router-view></router-view> -->
       <div class="main-content">
    <div class="banner">
      <img class="img-block" src="@/assets/img/partner-banner.png" alt="" />
    </div>
    <div class="info-container">
      <div class="info">
        <ul>
          <li class="item">
            <div class="label">股东：</div>
            <div class="txt" style="visibility:hidden">111</div>
          </li>
          <li class="item">
            <div class="shareholders-box txt flex-0-center">
              <div class="pic">
                <img class="img-block" src="@/assets/img/Shareholder.png" alt="" />
              </div>
              <div class="info-txt">
                浦东创投是上海创业投资协会副会长单位，中国基金业协会会
                员单位。作为具有近二十年历史的创业风险投资企业，管理团
                队和投资团队在创业风险投资项目运作方面积累了丰富的经
                验，公司正迅速成为国内外领先的VC/PE公司。
              </div>
            </div>
          </li>
          <li class="item">
            <div style="padding-top:.25rem" class="label">合作伙伴：</div>
            <div class="txt partner-box">
              <div class="pic"  v-for="(item,index) in parterImgs" :key="index">
<img class="img-block"  :src="require(`@/assets/img/${item.pic}.png`)" alt="">
              </div>
          </div>
          </li>
        </ul>
      </div>
    </div>
    <fixed-bar></fixed-bar>
  </div>
      <!-- <router-view></router-view> -->
      <!-- <component :is="isShow"></component> -->
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
      parterImgs: [
        {
          pic: 'partner-icon1'
        },
        {
          pic: 'partner-icon2'
        },
        {
          pic: 'partner-icon3'
        },
        {
          pic: 'partner-icon4'
        },
        {
          pic: 'partner-icon5'
        },
        {
          pic: 'partner-icon6'
        },
        {
          pic: 'partner-icon7'
        },
        {
          pic: 'partner-icon8'
        },
        {
          pic: 'partner-icon9'
        },
        {
          pic: 'partner-icon10'
        }
      ],
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
      title: '合作伙伴-财查到',
      meta: [
        { name: 'keywords', content: '合作伙伴,财查到,才查到' },
        {  name: 'description', content: '才查到科技合作伙伴：股东“浦东创投”是上海创业投资协会副会长单位，中国基金业协会会员单位。作为具有近二十年历史的创业风险投资企业，管理团队和投资团队在创业风险投资项目运作方面积累了丰富的经验，正迅速成为国内外领先的VC/PE公司。' },
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
  padding: 0.4rem 0 .5rem;
  .banner {
    height: 2.8rem;
    margin-bottom: 0.5rem;
  }
  .info {
    font-size: 0.18rem;
    width: 8.6rem;
    margin: 0 auto;
    .item {
      margin-bottom: 1.12rem;
      &:first-child {
        margin-bottom: 0;
      }
      .label {
        float: left;
        width: 1.48rem;
        text-align: left;
        padding-right: 0.2rem;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 0.24rem;
        line-height: 0.24rem;
      }
      .txt {
        margin-left: 1.48rem;

      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.shareholders-box {
  .pic {
    width:2.38rem ;
    height: .62rem;
    margin-right: .41rem;
  }
  .info-txt {
    line-height: .32rem;
    width: 432px;

  }
}
.partner-box {
  overflow: hidden;
  .pic {
    width: 1.3rem;
    float: left;
    height: .76rem;
    margin-right: .64rem;
    margin-bottom: .16rem;
    &:nth-child(4n) {
      margin-right: 0;
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
