import $ from 'jquery'
export default {
  methods: {
    backtop () {
      // 回到平顶部效果
      // var timer = setInterval(function () {
      //   const osTop =
      //     document.documentElement.scrollTop || document.body.scrollTop;
      //   const ispeed = Math.floor(-osTop / 5);
      //   document.documentElement.scrollTop = document.body.scrollTop =
      //     osTop + ispeed;
      //   this.isTop = true;
      //   if (osTop === 0) {
      //     clearInterval(timer);
      //   }
      // }, 1);
      $('body,html').animate({
        scrollTop: 0
      },
      500); ;
    }
  }
};
