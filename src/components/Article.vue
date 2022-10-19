<template>
  <!-- 头部作者信息 -->
  <div class="content">
    <!-- 头部内容 -->
    <div class="top">
      <div class="avatar">
        <van-image
          round
          width="4rem"
          height="4rem"
          fit="cover"
          :src="articleInfo.userImg"
        />
      </div>
      <div class="user">
        <div class="username">
          {{ articleInfo.username }}
        </div>
        <div class="time">
          {{ articleInfo.publishTime }}
        </div>
      </div>
    </div>
    <!-- 文章内容 -->
    <div class="main">
      <div class="txt">
        {{ articleInfo.content }}
      </div>
      <div class="img">
        <van-swipe :autoplay="10000">
          <van-swipe-item v-for="(image, index) in swiperData" :key="index">
            <img
              v-lazy="image"
              fit="cover"
              lazy-load
              width="100%"
              @click="swiperImgClick"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <!-- 分割线 -->
    <van-divider
      :style="{
        color: '#1989fa',
        borderColor: '#98b9db',
        padding: '1rem 1rem',
      }"
    >
    </van-divider>
    <!-- 评论区 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
      :immediate-check="false"
    >
      <div class="comment">
        <comment
          :item="item"
          :reply="reply"
          v-for="(item, index) in replies"
          :key="index"
          @writeReply="writeReply"
          @getReply="getReply"
          @initReply='initReply'
          ref="comment"
        >
        </comment>
      </div>
    </van-list>

    <!-- 输入框 -->

    <div class="input">
      <div class="title">评论文章:</div>
      <van-field
        v-model="msg"
        center
        :clearable="true"
        placeholder="说点什么吧..."
      >
        <template #right-icon>
          <van-icon :name="publish_icon" size="23" @click="writeComment" />
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import {
  getArticle,
  getComment,
  writeComment,
  writeReplies,
  getReplies,
  refurbish,
} from "@/utils/api";
import { ImagePreview, Toast } from "vant";
import comment from "@/components/Comment.vue";
export default {
  components: {
    comment,
  },
  name: "article_",
  data() {
    return {
      tId: "",
      articleInfo: [],
      swiperData: [],
      msg: "",
      publish_icon: require("@/assets/icon/publish.png"),
      replies: [],
      reply: [],
      // 标识
      visible: "",
      finished: false,
      loading: false,
      // 评论页数
      currentPage: 1,
      pageSize: 8,
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    //查询文章内容
    async getArticleInfo(tId) {
      this.$data.tId = tId;
      let res = await getArticle(JSON.stringify({ tId: tId }));
      this.$data.articleInfo = res.data.data;
      this.swiperData = res.data.data.fileName;
      this.$data.currentPage = 1;
      this.$data.replies = [];
      this.$data.finished = false;
      this._getComment(tId);
    },
    // 图片预览
    swiperImgClick() {
      ImagePreview(this.$data.swiperData);
    },
    // 发布评论
    async writeComment() {
      if (!this.$data.msg) {
        Toast("发布内容不能为空！");
        return;
      }
      let res = await writeComment(
        JSON.stringify({
          userId: this.$store.state.user.id,
          tId: this.$data.articleInfo.tid,
          username: this.$store.state.user.name,
          userImg: this.$store.state.user.avatar,
          content: this.$data.msg,
        })
      );
      // 发布成功后，清空输入框内容
      this.$data.msg = "";
      // 重置页数,列表
      this.$data.currentPage = 1;
      this.$data.replies = [];
      // 开启加载
      this.$data.finished = false;
      this._getComment(this.$data.articleInfo.tid);
      Toast(res.data.data);
    },
    // 查询评论
    async _getComment(tId) {
      await getComment(
        JSON.stringify({
          id: tId,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
        })
      ).then((res) => {
        this.$data.replies.push(...res.data.data.records);
        if (res.data.data.records.length < this.$data.pageSize) {
          this.$data.finished = true;
        }
        this.$data.loading = false;
      });
    },
    // 下拉刷新评论
    onLoad() {
      this.$data.currentPage++;
      this._getComment(this.$data.tId);
    },
    // 回复
    async writeReply(msg) {
      let res = await writeReplies(JSON.stringify(msg));
      this.initReply()
      Toast(res.data.data);
    },
    // 查询回复
    async getReply(msg) {
      // this.$data.reply = []
      // 待优化
      await refurbish(
        JSON.stringify({
          currentPage: 1,
          pageSize: 8,
          subject: "",
        })
      );
      await getReplies(JSON.stringify(msg)).then((res) => {
        this.$data.reply.push(...res.data.data.records);
        if (res.data.data.records.length < 8) {
          this.$refs.comment[0].finished = true;
        }
        this.$refs.comment[0].loading = false;
      });
    },
    // 初始化回复归空
    initReply(){
      this.$data.reply = []
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 2rem;
  width: 100%;
  // margin: 0 auto;
}

.top {
  display: flex;
  align-items: center;
  height: 5rem;
  padding: 1rem;
  border-radius: 10% 10% 0 0;
  .user {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 00.6rem;
    .username {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .time {
      font-size: 0.8rem;
      font-weight: 400;
      color: #b4b4b5;
    }
  }
  .close {
    position: absolute;
    right: 1rem;
  }
}
.main {
  background-color: #fff;
  .txt {
    padding: 0.7125rem;
    letter-spacing: 0.12rem;
    line-height: 1.2rem;
  }
  .img {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    .van-swipe {
      width: 20.8125rem;
      // height: 20.8125rem;
      // border: 0.0225rem solid pink;
      border-radius: 10%;
    }
  }
}

.comment {
  // background-color: pink;
}
.input {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 4;
  .van-field {
    width: 100%;
    border-bottom: 0.1625rem solid #98b9db;
  }
  .title {
    width: 6.25rem;
    color: #98b9db;
    text-align: center;
    background-color: #fff;
  }
}
.van-list {
  margin-bottom: 15%;
}
</style>