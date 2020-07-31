import $ from "jquery";
import fixedBar from "../../components/fixedBar.vue";
import { hotInformation, recommendInformation } from "@/service/coreApi";
export default {
  data() {
    return {
      isFixed: false,
      offsetTop: 0,
      elHeight: 0,
      asideHeight: 0,
      hotInfoList: [],
      recommendList: [],
      footerHeight: 0,
      flag: false
    };
  },
  computed: {},
  components: { fixedBar },
  methods: {
    getScrollTop() {
      var scrollTop = 0;
      var bodyScrollTop = 0;
      var documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    getScrollHeight() {
      var scrollHeight = 0;
      var bodyScrollHeight = 0;
      var documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        var clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    handleScroll() {
      var scrollTop = this.getScrollTop();
      var offsetTop = this.offsetTop;
      var helpTop = document.querySelector(".footer").getBoundingClientRect()
        .top;
      let clientHt = this.getClientHeight(); //宽口高度
      if (clientHt < this.elHeight) {
        this.isFixed = false;
      } else {
        if (scrollTop < offsetTop) {
          // 还没滚动前
          this.isFixed = false;
        } else {
          if (helpTop > this.elHeight) {
            // 还没碰到底部
            this.isFixed = true;
            $("#fixed-wrapper").removeClass("animate");
          } else if ((helpTop = this.elHeight)) {
            $("#fixed-wrapper").addClass("animate");
            this.$nextTick(() => {
              document
                .querySelector("#fixed-wrapper")
                .addEventListener("animationend", function() {
                  this.isFixed = false;
                });
            });
          }
        }
      }
    },
    getHotInfo() {
      const params = {};
      hotInformation(params)
        .then(res => {
          if (res.code === 200) {
            this.hotInfoList = res.data;
            // 获取数据成功过后
            this.$nextTick(() => {
              window.addEventListener("scroll", this.handleScroll);
              this.offsetTop = $("#fixed-wrapper").offset().top;
            });
          } else {
            console.log(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRecommendList() {
      const params = {};
      recommendInformation(params)
        .then(res => {
          if (res.code === 200) {
            this.recommendList = res.data;
            this.$nextTick(() => {
              this.elHeight = document.querySelector(
                "#fixed-wrapper"
              ).offsetHeight;
              this.asideHeight = document.querySelector(
                ".asideConsulting-block"
              ).offsetHeight;
            });
          } else {
            console.log(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {},
  created() {
    if (process.client) {
      this.$nextTick(() => {
        this.elHeight = document.querySelector("#fixed-wrapper").offsetHeight;
        this.asideHeight = document.querySelector(
          ".asideConsulting-block"
        ).offsetHeight;
      });
      this.$nextTick(() => {
        this.offsetTop = $("#fixed-wrapper").offset().top;
        window.addEventListener("scroll", this.handleScroll);
      });
    }

    //暂时保留
    // this.getHotInfo();
    // this.getRecommendList();
  }
};
