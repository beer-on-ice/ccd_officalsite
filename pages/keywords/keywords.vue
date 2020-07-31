<template>
  <div>
    <Header></Header>
    <banner-block></banner-block>
    <div class="search-result">
      <div class="fluid-container">
        <span>搜索“{{ keywords }}”相关结果{{ total }}个</span>
      </div>
    </div>
    <!-- 列表部分 -->
    <section>
      <div class="fluid-container">
        <div class="main-content">
          <div class="left-block">
            <ul class="lists">
              <router-link
                @click.native="updateReadCountFun(item.informationId)"
                target="_blank"
                :to="`/consultingResult/${item.informationId}.html`"
                v-for="(item, index) in searchList"
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
                      <h4 class="text-ellipsis-2" v-html="item.title"></h4>
                      <!-- 关键字标红 -->
                      <div
                        v-html="item.abstractContent"
                        class="txt text-ellipsis-2"
                      ></div>
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
              :current="current"
              :keywords="keywords"
              ref="paginationRef"
              @pagechange="pagechange"
            ></Pagination>
          </div>
          <!-- 右边栏 -->
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
import Pagination from "@/components/pagination.vue";
import Footer from "@/components/footer.vue";
import bannerBlock from "@/components/bannerBlock.vue";
import { queryPcInformation, updateReadCount } from "@/service/coreApi";
import backTop from "@/core/mixin/backTop";
import asideMixin from "@/core/mixin/asideMixin";
export default {
  mixins: [backTop, asideMixin],
  data() {
    return {
      total: 200,
      display: 10,
      current: 0,
      showPagination: false,
      keywords: "",
      searchList: [],
      start: 0
    };
  },
  components: { Header, bannerBlock, Pagination, Footer },
  computed: {},
  async asyncData({ app, route }) {
    let keywords = route.params.keywords;
    let start = (Number(route.params.currentPage) - 1) * 10;
    let params = {
      keywords,
      start,
      size: 10
    };
    let showPagination = false;

    let [res1, res2, res3] = await Promise.all([
      app.$axios.get("/hotInformation"),
      app.$axios.get("/recommendInformation"),
      app.$axios.get(`/queryPcInformation`, { params })
    ]);

    if (res3.data.data.list.length !== 0) {
      showPagination = true;
    }
    return {
      hotInfoList: res1.data.data,
      recommendList: res2.data.data,
      searchList: res3.data.data.list,
      total: res3.data.data.total,
      showPagination,
      keywords,
      start
    };

    // app$axios.get('...')
  },
  head() {
    return {
      title: `${this.keywords}_资讯_财查到`,
      meta: [
        { name: "keywords", content: this.keywords },
        { name: "description", content: this.keywords }
      ]
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
    // 判断搜索记录是否包含某个关键字
    checkPara(val, para) {
      if (val.indexOf(para) !== -1 && para !== "") {
        return true;
      } else {
        return false;
      }
    },
    getSearchList() {
      var params = {
        keywords: this.keywords,
        start: this.start,
        size: this.display
      };
      queryPcInformation(params)
        .then(res => {
          if (res.code === 200) {
            this.searchList = res.data.list;
            this.total = res.data.total;
            if (res.data.list.length !== 0) {
              this.showPagination = true;
            }
          } else {
            console.log(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err);
        });
    },
    pagechange(index) {
      const { href } = this.$router.resolve({
        path: `/keywordList/${index}/${this.keywords}.html`
      });
      window.open(href, "_self");
    }
  },
  created() {
    this.keywords =
      this.$route.params.keywords || window.localStorage.getItem("keywords");
    this.current = Number(this.$route.params.currentPage);
    this.$nextTick(() => {
      if (this.$refs.paginationRef) {
        this.$refs.paginationRef.current = this.current;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.search-result {
  padding: 0.2rem 0;
}
.main-content {
  padding-bottom: 0.4rem;
  display: flex;
  .left-block {
    flex: 1;
    .dis-img {
      height: 2.9rem;
      background-color: black;
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
/deep/ .asideConsulting-block .downloadApp {
  // height: 1.2rem;
  background-color: #f5f5f5;
  padding: 0.07rem 0.24rem 0.05rem 0.17rem;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  .logo {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.12rem;
    margin-top: 0.13rem;
  }
  .txt {
    margin-right: 0.2rem;
    margin-top: 0.13rem;
    width: 1.48rem;
    h4 {
      font-size: 0.24rem;
      margin-bottom: 0.1rem;
      font-weight: 400;
    }
    p {
      color: #666666;
      line-height: 0.22rem;

      &:first-child {
        margin-bottom: 0.04rem;
      }
    }
  }
  .er {
    img {
      width: 0.88rem;
      height: 0.88rem;
    }
    p {
      white-space: nowrap;
    }
  }
}
</style>
<style lang="scss" scoped>
@keyframes move {
  from {
    top: 0;
  }
  to {
    top: -500px;
  }
}
.asideConsulting-block {
  width: 3.95rem;
  margin-left: 0.15rem;
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
        position: relative;
        max-height: 0.64rem;
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
}
</style>
