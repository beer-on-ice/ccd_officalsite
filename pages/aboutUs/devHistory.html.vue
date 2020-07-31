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
      <img class="img-block" src="@/assets/img/web1x_toutu.png" alt="" />
    </div>
    <div class="info-container flex-center-center">
      <div class="info">
        <ul>
          <li class="item">
            <div class="label text-muted">2020</div>
            <div class="txt flex-0-center">
              <div class="time">2020年6月</div>
              <span>受邀出席微软AI&loT实验室周年庆典，入选最佳实践案例。</span>
            </div>
            <div class="line"><div class="circle active-circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2020年3月</div>
              <span>与证券头部机构达成战略合作。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2020年2月</div>
              <span>入选微软加速器项目。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="label text-muted">2019</div>
            <div class="txt flex-0-center">
              <div class="time">2019年12月</div>
              <span>下载量突破</span>
              <strong class="text-blue">20W+</strong>
              <span>，注册量突破</span>
              <strong class="text-blue">10W+</strong>
            </div>
            <div class="line"><div class="circle active-circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2019年10月</div>
              <span>摘取易观“精益之星”“精益英雄”双荣耀。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2019年9月</div>
              <span>完成Pre-A轮融资浦东创投领投。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2019年9月</div>
              <span>财查到APP2.0上线。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2019年9月</div>
              <span>才查到成立一周年。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2019年7月</div>
              <span>入驻微软AI&loT实验室。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2019年5月</div>
              <span>作为恒源年会特邀嘉宾投资者介绍财查到。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2019年2月</div>
              <span>财查到APP内测1.0版本上线。</span>
            </div>
            <div class="line"><div class="circle"></div></div>
          </li>
          <li class="item">
            <div class="label text-muted">2018</div>
            <div class="txt flex-0-center">
              <div class="time">2018年12月</div>
              <span>长宁区政府领导走访调研才查到。</span>
            </div>
            <div class="line"><div class="circle active-circle"></div></div>
          </li>
          <li class="item">
            <div class="txt flex-0-center">
              <div class="time">2018年9月</div>
              <span>才查到科技成立。</span>
            </div>
            <div style="border-left-color:transparent" class="line">
              <div class="circle"></div>
            </div>
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
      title: '发展历程-财查到',
      meta: [
        {  name: 'keywords', content: '发展历程,财查到,才查到' },
        { name: 'description', content: '才查到科技于2019年12月下载量突破20W+，注册量突破10W+，2019年10月摘取易观“精益之星”“精益英雄”双荣耀，2019年9月完成Pre-A轮融资浦东创投领投，2019年9月财查到APP2.0版本上线。' },
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
.text-blue {
  color: #1A52FF;
}
.main-content {
  color: #666;
  padding: 0.4rem 0;
  .banner {
    height: 2.8rem;
    margin-bottom: 0.5rem;
  }
  .info {
    .item {
      padding-bottom: 0.3rem;
      position: relative;
      .label {
        float: left;
        width: 1.64rem;
        text-align: left;
        padding-right: 0.2rem;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 0.24rem;
        line-height: 0.24rem;
        & + .txt {
          height: 0.24rem;
          line-height: 0.24rem;
        }
      }
      .txt {
        margin-left: 1.64rem;
        .time {
          width: .98rem;
          text-align: left;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.circle {
  width: 0.2rem;
  height: 0.2rem;
  left: 0;
  top: -0.05rem;
  border-radius: 50%;
  background-color: #8EAAFF;
  position: absolute;
  z-index: 999;
  transform:scale(0.5)  translateX(-50%) ;
  transform-origin: 0% center;

  &.active-circle {
    background-color: #1a52ff;
    width: 0.24rem;
    height: 0.24rem;
    left:0;
    top: -0.06rem;
  }
}
.line {
  border-left: 1px dotted rgba(26, 82, 255, 0.3);
  height: 100%;
  position: absolute;
  left: 1.2rem;
  top: .05rem;
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
