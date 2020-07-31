<template>
  <div>
    <Header></Header>
    <banner-block></banner-block>
    <div class="bread-crumb">
      <div class="fluid-container">
        <div class="bread-list flex-0-center">
          <div class="item">
            <router-link target="_blank" :to="{ path: '/' }">
              <span>财查到首页</span>
            </router-link>
            <span>></span>
          </div>
          <div class="item">
            <span>正文</span>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="main-content">
        <div class="fluid-container just-flex">
          <div class="left-block">
            <h1 class="title">{{ detailData.title }}</h1>
            <div class="source">
              来源：{{ detailData.sourceform }} {{ detailData.releaseDate }}
            </div>
            <h4 class="abstract-card">
              <div class="sign flex-center-center">摘要</div>
              <span>{{ detailData.abstractContent }}</span>
            </h4>

            <div class="content">
              <div class="paragraph" v-html="content"></div>
              <div class="keyWords clearfix">
                <div class="txt">关键字：</div>
                <div
                  v-if="detailData.topic && detailData.topic.length !== 0"
                  class="keyWords-lists"
                >
                  <router-link
                    :to="`/keywordList/1/${item}.html`"
                    v-for="(item, index) in detailData.topic"
                    :key="index"
                    target="_blank"
                  >
                    <div class="keyWords-item fl">
                      {{ item }}
                    </div>
                  </router-link>
                </div>
                <span style="padding:0.04rem 0;float:left" v-else>无</span>
              </div>
            </div>
            <!-- 相关咨询 -->
            <div class="some-consulting">
              <div class="consult-container">
                <div class="title flex-0-center">
                  <div class="dec-line"></div>
                  <span>相关资讯</span>
                </div>
                <ul
                  v-if="detailData.list && detailData.list.length !== 0"
                  class="content"
                >
                  <router-link
                    @click.native="updateReadCountFun(item.informationId)"
                    target="_blank"
                    :to="`/consultingResult/${item.informationId}.html`"
                    v-for="(item, index) in detailData.list"
                    :key="index"
                  >
                    <li>
                      <div class="text-ellipsis txt fl">{{ item.title }}</div>
                      <div class="date fr">
                        {{ item.releaseDate | detailDate }}
                      </div>
                    </li>
                  </router-link>
                </ul>
                <span v-else>无</span>
              </div>
            </div>
          </div>
          <!-- 右边侧边栏 -->
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
import bannerBlock from "@/components/bannerBlock.vue";
import Footer from "@/components/footer";
import { inforDetails, updateReadCount } from "@/service/coreApi";
import asideMixin from "@/core/mixin/asideMixin";
export default {
  mixins: [asideMixin],
  data() {
    return {
      id: "",
      detailData: {},
      keywords: "",
      description: "",
      title: "",
      content: ""
    };
  },
  async asyncData({ app, route }) {
    let params = {
      id: route.params.id
    };
    let keywords;
    let content;
    let title;
    let [res1, res2, res3] = await Promise.all([
      app.$axios.get("/hotInformation"),
      app.$axios.get("/recommendInformation"),
      app.$axios.get("/inforDetails", { params })
    ]);
    keywords = res3.data.data.topic.join(",");
    title = res3.data.data.title;
    content = res3.data.data.content.replace(/alt=\"[^\"]+\"{1}/g, ""); //去除alt
    // 給圖片添加alt
    content = content.replace(/title="/g, `title="${title}`); //添加title
    content = content.replace(/<img/g, `<img alt="${title}"`); //添加alt
    return {
      hotInfoList: res1.data.data,
      recommendList: res2.data.data,
      detailData: res3.data.data,
      keywords,
      description: res3.data.data.abstractContent,
      title,
      content
    };
  },
  computed: {},
  head() {
    return {
      title: `${this.title}-财查到`,
      meta: [
        { name: "keywords", content: this.keywords },
        { name: "description", content: this.description }
      ]
    };
  },
  components: { Header, bannerBlock, Footer },
  methods: {
    updateReadCountFun(id) {
      let params = {
        informationId: id
      };
      updateReadCount(params).then(res => {
        console.log(res);
      });
    },
    getDetailInfo() {
      const params = {
        id: this.id
      };
      inforDetails(params)
        .then(res => {
          if (res.code === 200) {
            this.detailData = res.data;
            this.keywords = res.data.topic.join(",");
            this.description = res.data.abstractContent;
            this.title = res.data.title;
          } else {
            console.log(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err);
        });
    }
  },
  created() {
    this.id = this.$route.params.id;
  }
};
</script>

<style lang="scss" scoped>
.bread-crumb {
  padding: 0.2rem 0;
  border-bottom: 1px solid #eeeeee;
  a:hover {
    color: #e92137;
  }
}
.main-content {
  padding-bottom: 0.4rem;
  /deep/img {
    display: block;
    width: 100%;
  }

  .left-block {
    width: 7.85rem;
    h1 {
      font-size: 0.24rem;
      font-weight: 700;
      padding: 0.2rem 0;

      line-height: 0.31rem;
    }
    .source {
      font-size: 0.12rem;
      color: #999999;
      padding-bottom: 0.2rem;
    }
    .abstract-card {
      position: relative;
      padding: 0.43rem 0.2rem 0.2rem;
      border-radius: 0.08rem;
      box-shadow: 0px 0px 0.1rem 0px rgba(0, 0, 0, 0.05);
      font-size: 0.16rem;
      font-weight: 400;
      line-height: 0.32rem;
      .sign {
        width: 0.51rem;
        height: 0.23rem;
        background: #1a52ff;
        border-radius: 0px 0.08rem 0px 8px;
        color: #fff;
        position: absolute;
        left: 0.2rem;
        top: 0;
      }
    }

    .content {
      line-height: 0.32rem;
      .paragraph {
        padding-top: 20px;
      }
      /deep/ .paragraph p {
        margin-bottom: 0.2rem;
      }
      .keyWords {
        margin-bottom: 0.36rem;
        .txt {
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          text-align: left;
          float: left;
          padding: 0.04rem 0;
        }
        .keyWords-lists {
          overflow: hidden;
        }
        .keyWords-item {
          padding: 0.04rem 0.12rem;
          background: #1a52ff;
          border-radius: 0.08rem;
          margin-right: 0.2rem;
          color: #fff;
          margin-bottom: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .some-consulting {
    .consult-container {
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
        //   color: #1a52ff;
        // }
        li {
          line-height: 0.32rem;
          padding-left: 0.12rem;
          max-height: 0.64rem;
          // margin-bottom: 0.06rem;
          position: relative;
          overflow: hidden;
          &:hover {
            color: #e92137;
            &::after {
              background-color: #e92137;
            }
          }
          .txt {
            width: 75%;
          }
          .date {
            // margin-left: .4rem;
            color: #666;
            width: 20%;
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
            z-index: 999;
            border-radius: 50%;
          }
        }
      }
      ul a:last-child li {
        margin-bottom: 0;
      }
    }
  }
}
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
