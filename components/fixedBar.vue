<template>
  <div class="fixed-bar" >
    <!--:style="{bottom:`${footerHeight+10}px`}"  -->
    <div class="item">
      <div class="pic">
        <img class="img-block" src="@/assets/img/app.png" alt />
      </div>
      <div class="txt">APP</div>
      <div class="er">
        <img class="img-block" src="@/assets/img/fixed-download.png" alt />
      </div>
    </div>
    <div class="item">
      <div class="pic">
        <img class="img-block" src="@/assets/img/small-er.png" alt />
      </div>
      <div class="txt">微信</div>
      <div class="er">
        <img class="img-block" src="@/assets/img/fixed-gzh.png" alt />
      </div>
    </div>
    <div class="item">
      <div class="pic">
        <img class="img-block" src="@/assets/img/phone.png" alt />
      </div>
      <div class="txt">客服</div>
      <div class="contact-box">
        <div style="margin-bottom:.04rem" class="flex-center-center">
          <img style="width:.2rem" src="@/assets/img/phone.png" alt />
          <strong>021-61406392</strong>
        </div>
        <div class="text-center" style="font-size:.14rem">周一至周五 9:00-18:00</div>
      </div>
    </div>
    <div @click="backtop" class="item">
      <div class="pic">
        <img class="img-block" src="@/assets/img/toTop.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      footerHeight:'',
      addHeight:''
    };
  },
  computed: {},
  methods: {
    backtop () {
      // 回到平顶部效果
      $('body,html').animate({
        scrollTop: 0
      },
      500); ;
    }
  },
  mounted () {
    
  },
  created(){
    this.$nextTick(() => {
      // this.footerHeight = document.querySelector('.footer').offsetHeight 
     
      
    })
    

  }
};
</script>

<style lang="scss" scoped>
.fixed-bar {
  position: fixed;
  width: 0.5rem;
  margin-left: 4.05rem;
  bottom: 2.44rem;
  .item {
    width: 100%;
    margin-bottom: 0.04rem;
    background-color: #f5f5f5;
    padding-top: 0.12rem;
    padding-bottom: 0.12rem;
    position: relative;
    &:last-child {
      margin-bottom: 0px;
    }

    .pic {
      margin: 0 auto;
      width: 0.28rem;
      height: 0.28rem;
      margin-bottom: 0.08rem;
    }
    .er {
      width: 1.45rem;
      height: 1.03rem;
      position: absolute;
      top: -0.2rem;;
      right: 0.35rem;
    }
    &:hover {
      cursor: pointer;
    }
    & {
      .er {
        display: none;
      }
      &:hover .er {
        display: block;
      }
      .contact-box {
        display: none;
      }
      &:hover .contact-box {
        display: block;
      }
    }

    .txt {
      margin-top: 0.08rem;
      color: #333;
      text-align: center;
    }
    &:last-child .pic {
      width: 0.32rem;
      height: 0.32rem;
      margin-bottom: 0;
    }
    .contact-box {
      width: 1.77rem;
      padding: 0.09rem 0.15rem;
      background: url("../assets/img/fixed-tel.png") no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -1.8rem;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-shadow: 0px 0px 0.1rem 0px rgba(0, 0, 0, 0.1);
      img {
        margin-right: 0.11rem;
      }
    }
  }
}
</style>
