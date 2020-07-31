<template>
  <div>
    <nav>
      <ul class="pagination">
        <li
          style="margin-right:.23rem"
          :class="{ disabled: current == 1, 'no-hover': true }"
        >
          <div @click="setCurrent(1)">首页</div>
        </li>
        <li
          style="margin-right:.14rem"
          :class="{ disabled: current == 1, 'no-hover': true }"
        >
          <div @click="setCurrent(current - 1)">上一页</div>
        </li>
        <a :href="`/homePage/${p.val}.html?activeIndex=${activeIndex}`"   v-for="(p, index) in grouplist" :key="index">
          <li :class="{ active: current == p.val }">
            <div class="txt">
              {{ p.txt }}
            </div>
          </li>
        </a>
        <li
          style="margin-left:.14rem"
          :class="{ disabled: current == page, 'no-hover': true }"
        >
          <div @click="setCurrent(current + 1)">下一页</div>
        </li>
        <li
          style="margin-left:.23rem"
          :class="{ disabled: current == page, 'no-hover': true }"
        >
          <div @click="setCurrent(page)">尾页</div>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: this.currentPage
    };
  },
  props: {
    // 数目总条数
    total: {
      type: Number,
      default: 0
    },
    // 每一页显示10条数据
    display: {
      type: Number,
      default: 10
    },
    // 当前处于哪一页
    currentPage: {
      type: Number,
      default: 1
    },
    // 分页数目
    // 默认可视为5页
    pagegroup: {
      type: Number,
      default: 5
    },
    activeIndex:{
      type: Number,
      default: 0
    }
  },
  // 如何计算总页数
  // 总页数目是随着后台数据的变化而变化的所以需要计算属性，实时计算
  computed: {
    // 获取总页数
    page() {
      return Math.ceil(this.total / this.display);
    },
    // 获取页码
    grouplist() {
      // 总页数
      let len = this.page,
        // 距离中间那个数的偏移量
        count = Math.floor(this.pagegroup / 2),
        // 以当前页为中间数
        center = this.current,
        // 临时数组
        temp = [],
        // 返回的数组
        list = [];
      // 判断当总页数<=分页数的情况
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({
            txt: this.page - len,
            val: this.page - len
          });
        }

        return temp;
      }
      // 否则就是len>分页数目的情况
      while (len--) {
        temp.push(this.page - len);
      }
      // 找出当前页在这个数据中位置
      let idx = temp.indexOf(center);
      // 判断这个位置与中间偏离的大小
      // 计算出中间值
      idx < count && (center = center + count - idx);
      this.current > this.page - count && (center = this.page - count);
      // 从当前位置减去偏移量再减去1就是数组索引，
      // 获取this.pagegroup长度数组
      temp = temp.splice(center - count - 1, this.pagegroup);

      do {
        // 拼接数据
        let t = temp.shift();
        list.push({
          txt: t,
          val: t
        });
      } while (temp.length);

      // 接着判断数组是否到达处于中间
      if (this.page > this.pagegroup) {
        this.current > count + 1 &&
          list.unshift({ txt: "...", val: list[0].val - 1 });
        this.current < this.page - count &&
          list.push({ txt: "...", val: list[list.length - 1].val + 1 });
      }
      return list;
    }
  },
  methods: {
    setCurrent(idx) {
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        // 判断当前页码不等于本身，和大于零，而且要小于总页数的时候，才触发
        this.current = idx;
        this.$emit("pagechange", this.current);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  overflow: hidden;
  display: table;
  margin: 0 auto;
  padding: 0.44rem 0 0.36rem;

  /*width: 100%;*/
  li {
    list-style: none;
    float: left;
    height: 0.36rem;
    border-radius: 50%;
    margin: 0.03rem;
    line-height: 0.36rem;
     font-size: 0.14rem !important;
    &:hover {
      cursor: pointer;
      background: rgb(25, 137, 250);
      .txt {
        background: rgb(25, 137, 250);
        color: #fff;
      }
    }
    &.no-hover:hover {
      background-color: #fff;
      .txt {
        background: #fff;
        color: #333;
      }
    }
     .txt {
      display: block;
      width: 0.36rem;
      height: 0.36rem;
      text-align: center;
      line-height: 0.36rem;
      border-radius: 50%;
      text-decoration: none;
      color: #333;
       font-size: 0.14rem !important;

    }
  }
  .active {
    background: #1a52ff;
    .txt {
      color: #fff;
    }
  }
}
</style>
