<template>
  <div class="home">
    <Header></Header>
    <banner-block></banner-block>
    <!-- 列表部分 -->
    <section>
      <div class="fluid-container">
        <div class="main-content">
          <div class="left-block">
            <!-- 轮播图 -->
            <el-carousel height="2.3rem">
              <el-carousel-item>
                <a href="javascript:;">
                  <img
                    src="@/assets/img/banner1.png"
                    alt="才查到官网新版本上线了"
                  />
                </a>
              </el-carousel-item>
              <el-carousel-item>
                <a href="javascript:;">
                  <img
                    src="@/assets/img/banner1.png"
                    alt="才查到官网新版本上线了"
                  />
                </a>
              </el-carousel-item>
            </el-carousel>
            <!-- <div class="dis-img"></div> -->
            <div class="flex-between-center tabs-wrapper">
              <div class="tabs just-flex">
                <div
                  @click="toSwitch(index)"
                  :class="{ 'tab-item': true, active: item.active }"
                  v-for="(item, index) in tabList"
                  :key="item.name"
                >
                  <div class="txt">{{ item.name }}</div>
                </div>
              </div>
              <div class="download">
                下载手机APP
                <div class="erweima">
                  <img class="img-block" src="@/assets/img/erweima2.png" alt />
                </div>
              </div>
            </div>
            <ul class="lists">
              <router-link
                @click.native="updateReadCountFun(item.informationId)"
                target="_blank"
                v-for="(item, index) in consultingData"
                :to="`/consultingResult/${item.informationId}.html`"
                :key="index"
              >
                <li class="list-item just-flex">
                  <div v-if="item.covePicturePath" class="img-box">
                    <img
                      class="img-block pic"
                      :src="item.covePicturePath"
                      alt
                    />
                  </div>

                  <div class="content flex-1">
                    <div>
                      <!-- <a  target="_blank" href="http://www.aifound.cn">
                      <h4 @click="aa">美的创始人何享建“渡劫”家电地产业务撑起千亿财富</h4>
                    </a>-->
                      <h4 class="text-ellipsis-2">{{ item.title }}</h4>
                      <div class="txt text-ellipsis-2">
                        {{ item.abstractContent }}
                      </div>
                    </div>
                    <div class="other">
                      <span class="fromApp">{{ item.sourceform }}&nbsp;</span>
                      <span class="date">{{ item.releaseDate }}</span>
                    </div>
                  </div>
                </li>
              </router-link>
            </ul>

            <Pagination
              v-if="showPagination"
              :total="total"
              :display="display"
              :current="currentPage"
              @pagechange="pagechange"
              :activeIndex="activeIndex"
              ref="paginationRef"
            ></Pagination>
          </div>
          <div class="asideConsulting-block">
            <div class="consult-container">
              <div class="title flex-0-center">
                <div class="dec-line"></div>
                <span>热门资讯</span>
              </div>
              <ul class="content">
                <router-link
                  @click.native="updateReadCountFun(item.id)"
                  target="_blank"
                  :to="`/consultingResult/${item.id}.html`"
                  v-for="(item, index) in hotInfoList"
                  :key="index"
                >
                  <li class="text-ellipsis-2">
                    {{ item.title }}
                  </li>
                </router-link>
              </ul>
            </div>
            <div id="fixed-wrapper" :class="{ isFixed: isFixed }">
              <div class="advertising-box" id="advertising-box">
                <div class="title1">海量金融产品+大数据监控预警</div>
                <div class="title2">立即下载财查到APP</div>
                <div class="pic">
                  <img
                    class="img-block"
                    alt="立即下载财查到APP"
                    src="@/assets/img/erweima.png"
                  />
                </div>
                <div class="title3">高净值人群专属金融产品鉴别APP</div>
              </div>

              <div class="recomRead-container">
                <div class="title flex-0-center">
                  <div class="dec-line"></div>
                  <span>推荐阅读</span>
                </div>
                <ul class="content">
                  <router-link
                    @click.native="updateReadCountFun(item.id)"
                    target="_blank"
                    :to="`/consultingResult/${item.id}.html`"
                    v-for="(item, index) in recommendList"
                    :key="index"
                  >
                    <li class="text-ellipsis-2">
                      <span class="">{{ item.inforDomain | inforDomain }}</span>
                      <span> | </span>
                      <span class="text-muted">{{ item.title }}</span>
                    </li>
                  </router-link>
                </ul>
              </div>
            </div>
            <!-- 解决滚动bug -->
            <div
              class="space-block"
              v-if="isFixed"
              :style="{
                height: `${elHeight}px`,
                backgroundColor: 'transparent'
              }"
            ></div>
            <fixed-bar></fixed-bar>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Pagination from "@/components/homePagination.vue";
import Footer from "@/components/footer.vue";
import fixedBar from "@/components/fixedBar.vue";
import bannerBlock from "@/components/bannerBlock.vue";
import { getNewRecommendN, updateReadCount } from "@/service/coreApi";
import backTop from "@/core/mixin/backTop";
import axios from "axios";
import $ from "jquery";
import asideMixin from "@/core/mixin/asideMixin";

export default {
  mixins: [backTop, asideMixin],
  data() {
    return {
      total: 0,
      display: 10,
      start: 0,
      activeIndex: 0,
      showPagination: false,
      currentPage: 0,
      totalpage: 0,
      swiperOption: {
        // autoplay: {
        //   delay: 3000
        // },
        autoplay: true,
        // loop: true,
        // aotu
        pagination: {
          el: ".swiper-pagination"
        }
      },
      tabList: [
        {
          name: "推荐",
          active: true
        },
        {
          name: "私募",
          active: false
        },
        {
          name: "银行",
          active: false
        },
        {
          name: "保险",
          active: false
        },
        {
          name: "信托",
          active: false
        },
        {
          name: "证券",
          active: false
        }
      ],
      consultingData: []
    };
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
  key (route) {
    return route.fullPath
  },
  components: {
    Header,
    Pagination,
    Footer,
    bannerBlock
  },
  computed: {},
  created() {},
  async asyncData({ app, route }) {
    let activeIndex = Number(route.query.activeIndex) || 0;
    let start = (Number(route.params.currentPage) - 1) * 10;
    let params1;
    if (activeIndex === 0) {
      params1 = {
        type: 2,
        start: start,
        size: 10
      };
    } else {
      let inforDomain;
      switch (activeIndex) {
        case 1: // 私募
          inforDomain = 3;
          break;
        case 2: // 银行
          inforDomain = 5;
          break;
        case 3: // 保险
          inforDomain = 4;
          break;
        case 4: // 信托
          inforDomain = 1;
          break;
        case 5: // 证券
          inforDomain = 6;
          break;
      }
      params1 = {
        inforDomain: inforDomain,
        type: 1,
        start: start,
        size: 10
      };
    }
    let showPagination = false;
    let [res1, res2, res3] = await Promise.all([
      app.$axios.get(`/getNewRecommendN`, { params: params1 }),
      app.$axios.get("/hotInformation"),
      app.$axios.get("/recommendInformation")
    ]);
    if (res1.data.data.list.length !== 0) {
      showPagination = true;
    }
    return {
      consultingData: res1.data.data.list,
      total: res1.data.data.total,
      showPagination,
      hotInfoList: res2.data.data,
      recommendList: res3.data.data
    };
  },
  methods: {
    updateReadCountFun(id) {
      let params = {
        informationId: id
      };
      updateReadCount(params).then(res => {
        console.log(res);
      });
    },
    getNews(idx = 0) {
      let params;
      if (idx === 0) {
        params = {
          type: 2,
          start: this.start,
          size: this.display
        };
      } else {
        let inforDomain;
        switch (idx) {
          case 1: // 私募
            inforDomain = 3;
            break;
          case 2: // 银行
            inforDomain = 5;
            break;
          case 3: // 保险
            inforDomain = 4;
            break;
          case 4: // 信托
            inforDomain = 1;
            break;
          case 5: // 证券
            inforDomain = 6;
            break;
        }
        params = {
          inforDomain: inforDomain,
          type: 1,
          start: this.start,
          size: this.display
        };
      }

      getNewRecommendN(params)
        .then(res => {
          if (res.code === 200) {
            this.consultingData = res.data.list;
            this.consultingData = [...this.consultingData];
            this.total = res.data.total;
            this.totalpage = Math.ceil(this.total / this.display);
            if (res.data.list.length !== 0) {
              this.showPagination = true;
            }
          } else {
            window.console.log(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          window.console.log(err);
        });
    },
    pagechange(idx) {
      const { href } = this.$router.resolve({
        path: `/homePage/${idx}.html`,
        query: {
          activeIndex: this.activeIndex
        }
      });
      window.open(href, "_self");
    },
    toDetailpage(id) {
      // 解决详情页右侧动画失效
      this.updateReadCountFun(id);
      const { href } = this.$router.resolve({
        path: `/consultingResult/${id}.html`,
        query: {
          activeIndex: this.activeIndex
        }
      });
      window.open(href, "_target");
    },
    toSwitch(idx) {
      // 解决部分页面 没这么多页面的情况
      this.activeIndex = idx;
      if (this.currentPage != 1) {
        this.$router.push({
          path: `/homePage/1.html`,
          query: {
            activeIndex: this.activeIndex
          }
        });
      } else {
        this.getNews(this.activeIndex);
      }

      this.tabList.forEach(item => {
        item.active = false;
      });

      this.tabList[idx].active = true;
    }
  },

  created() {
    this.currentPage = this.$route.params.currentPage;
    // 调整分页指向的页码
    this.$nextTick(() => {
      if (this.$refs.paginationRef) {
        this.$refs.paginationRef.current = Number(this.currentPage);
      }
    });
    this.start = (this.currentPage - 1) * this.display;
    this.activeIndex = Number(this.$route.query.activeIndex) || 0;
    this.tabList.forEach(item => {
      item.active = false;
    });
    this.tabList[this.activeIndex].active = true;
    // this.getNews(this.activeIndex);
  }
};
</script>
<style lang="scss" scoped>
.main-content {
  display: flex;
  margin-top: 0.2rem;
  padding-bottom: 0.4rem;
  .left-block {
    width: 7.85rem;
    .dis-img {
      height: 2.9rem;
      background-color: black;
    }
    .tabs-wrapper {
      border-bottom: 1px solid #eeeeee;
      margin-top: 0.2rem;
      .download {
        position: relative;
        color: #e92137;

        &:hover {
          cursor: pointer;
          .erweima {
            display: block;
          }
        }
        .erweima {
          width: 1.35rem;
          height: 1.38rem;
          position: absolute;
          top: 0.1rem;
          left: 50%;
          transform: translateX(-50%);
          display: none;
        }
      }
    }

    .tabs {
      .tab-item {
        height: 0.36rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #4d87fc;
          .txt {
            border-right-color: transparent;
          }
        }
        // padding: 0.09rem 0;
        .txt {
          width: 0.72rem;
          text-align: center;
          border-right: 1px solid #eee;
          height: 0.18rem;
          line-height: 0.18rem;
          font-weight: 700;
          height: auto;
        }
        &.active {
          color: #fff;
          background-color: #1e57fe;
          .txt {
            border-right: none;
          }
        }
      }
    }
    .lists {
      a {
        display: block;
      }
      .list-item {
        padding: 0.2rem 0;
        border-bottom: 1px solid #eeeeee;
        &:hover {
          background-color: rgba(77, 135, 252, 0.1);
          cursor: pointer;
        }
        .img-box {
          width: 1.79rem;
          height: 1.21rem;
          margin-right: 0.2rem;
          overflow: hidden;
          img.pic {
            height: 100%;
            transition: all 1s;
          }
          &:hover {
            img.pic {
              transform: scale(1.1);
            }
          }
        }

        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          a:link,
          a:hover,
          a:focus {
            color: #333;
          }
          // a:visited {
          //   color: pink;
          // }
          h4 {
            font-size: 0.2rem;
            margin-bottom: 0.02rem;
            margin-top: -0.1rem;
            line-height: 0.4rem;
            max-height: 0.8rem;

            &:hover {
              color: #e92137;
            }
          }
          .txt {
            color: #666;
            line-height: 0.32rem;
            max-height: 0.64rem;
          }
          .other {
            color: #999;
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
/deep/.el-carousel {
  overflow: hidden;
}

.el-carousel__item {
  a {
    display: block;
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style lang="scss" scoped>
.asideConsulting-block {
  width: 3.95rem;
  margin-left: 0.15rem;
}
.consult-container,
.recomRead-container {
  background: #f5f5f5;
  padding: 0.2rem 0.15rem 0.2rem 0.13rem;
  .title {
    margin-bottom: 0.2rem;
    .dec-line {
      width: 0.04rem;
      height: 0.16rem;
      background: linear-gradient(#1a52ff, #4d87fc);

      margin-right: 0.08rem;
    }
    span {
      font-size: 0.2rem;
      font-weight: 700;
    }
  }
  .content {
    list-style: ouside;
    a:link,
    a:hover,
    a:focus {
      color: #333;
    }
    // a:visited {
    // color: #1A52FF;
    //  }
    li {
      line-height: 0.32rem;
      padding-left: 0.12rem;
      margin-bottom: 0.06rem;
      max-height: 0.64rem;
      position: relative;
      &:hover {
        color: #e92137;
        span {
          color: #e92137;
        }
        &::after {
          background-color: #e92137;
        }
      }
      &::after {
        content: "";
        width: 0.4rem;
        height: 0.4rem;
        transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        transform: scale(0.1);
        -ms-transform: scale(0.1);
        -webkit-transform: scale(0.1);
        -moz-transform: scale(0.1);
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0.16rem;
        background-color: #333;
        border-radius: 50%;
      }
    }
    & a:last-child li {
      margin-bottom: 0;
    }
  }
}
.consult-container {
  margin-bottom: 0.2rem;
  & .content li:hover {
    color: #e92137;
    & span {
      color: #e92137;
    }
  }
}
#fixed-wrapper.isFixed {
  position: fixed;
  top: 0;
  width: 3.95rem;
}

@keyframes move {
  from {
    top: 0;
  }
  to {
    top: -500px;
  }
}
#fixed-wrapper.animate {
  animation: move 1s forwards;
}

.advertising-box {
  margin: 0 0 0.2rem;
  height: 3.95rem;
  background: linear-gradient(#1a52ff, #4d87fc);
  color: #fff;
  background-color: #fff;
  text-align: center;
  .title1 {
    padding: 0.2rem 0 0.18rem;
    font-size: 0.2rem;
  }
  .title2 {
    font-size: 0.24rem;
    font-weight: 700;
  }
  .pic {
    width: 2.07rem;
    height: 2.05rem;
    margin: 0.24rem auto;
  }
  .title3 {
    font-size: 0.2rem;
  }
}
</style>
