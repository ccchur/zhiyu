<template>
  <div>
    <!-- 刷新 -->

    <!-- 头部 -->
    <div class="navbar">
      <van-nav-bar :fixed="true" :placeholder="true" title="看看" ref="top" />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
        :immediate-check="false"
      >
        <contentbox
          v-for="(item, index) in list"
          :key="index"
          :item="item"
          @click="test()"
          @to_article="to_article"
        >
        </contentbox>
      </van-list>
    </van-pull-refresh>

    <div class="popup">
      <van-popup
        v-model="show"
        @close="close"
        closeable
        close-icon-position="top-right"
        position="bottom"
        round
        :style="{ height: '88%' }"
      >
        <article_ ref="article_"></article_>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getToken2, setToken2, removeToken2 } from "@/utils/auth";
import { getPublish, refurbish } from "../../../utils/api";
import contentbox from "../../../components/ContentBox.vue";
import article_ from "../../../components/Article.vue";
import { Toast } from "vant";
export default {
  components: {
    contentbox,
    article_,
  },
  name: "home",
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      currentPage: 1,
      pageSize: 8,
      //停留位置
      scrollNum: 0,
      // 刷新
      count: 0,
      isLoading: false,
      handelscroll: "",
      show: false,
    };
  },
  methods: {
    close() {
      console.log("关闭弹窗");
    },
    //跳转到文章详情页面
    to_article(tId) {
      console.log("要跳到的文章id", tId);
      //article_初始化未完成，添加一个延时器
      setTimeout(() => {
        this.$refs.article_.getArticleInfo(tId);
      }, 10);
      this.$data.show = true;
    },
    // 刷新
    async refresh() {
      await refurbish(
        JSON.stringify({
          currentPage: 1,
          pageSize: 8,
          subject: "",
        })
      );
    },
    // 获取发布文章
    async getPub() {
      await getPublish(
        JSON.stringify({
          subject: "",
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
        })
      ).then((res) => {
        this.$data.list.push(...res.data.data.list);
        if (res.data.data.list.length < this.$data.pageSize) {
          this.$data.finished = true;
        }
        this.$data.loading = false;
      });
    },
    // 加载更多
    async onLoad() {
      this.$data.currentPage++;
      await this.getPub();
    },
    // 刷新
    async onRefresh() {
      this.$data.list = [];
      this.$data.currentPage = 1;
      await refurbish(
        JSON.stringify({
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          subject: "",
        })
      );
      await this.getPub();
      this.$data.finished = false;
      this.isLoading = false;
      Toast("刷新成功");
    },
    //主页回到原来位置
    scroll() {
      console.log("高度");
    },
  },
  mounted() {},
  created() {},
  activated() {
    let id = getToken2();
    this.$store.dispatch("user/getInfo", id);
    //发布之后触发
    this.$bus.$on("onRefresh", () => {
      this.onRefresh();
    });
    document.documentElement.scrollTop = this.$data.scrollNum;
  },
  deactivated() {},

  beforeRouteEnter: (to, from, next) => {
    if (from.path === "/" || from.path === "/login") {
      next((vm) => {
        vm.list = [];
        vm.currentPage = 1;
        console.log("请求刷新");
        vm.refresh();
        vm.getPub();
      });
    }

    if (from.path === "/center") {
      next((vm) => {
        vm.scroll();
      });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/center" || to.path === "/publish" ) {
      let position =
        document.documentElement && document.documentElement.scrollTop; //记录离开页面时的位置
      if (position == null) position = 0;
      this.$data.scrollNum = position; //离开路由时把位置存起来
      next();
    } else {
      next()
    }
  },
};
</script>

<style>
</style>