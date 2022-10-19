<template>
  <!-- 评论区 -->
  <div class="box">
    <!-- 左边头像 -->
    <div class="left">
      <van-image
        width="2rem"
        height="2rem"
        fit="cover"
        round
        :src="item.userImg"
      />
    </div>

    <!-- 右边名字，时间，评论内容 -->
    <div class="info">
      <!-- 用户信息 -->
      <div class="user">
        <div class="name">
          <div class="username">{{ item.username }}</div>
          <div class="to" v-if="item.replyName">回复</div>
          <div class="replyName" v-if="item.replyName">
            {{ item.replyName }}
          </div>
        </div>
        <div class="time">{{ item.publishTime }}</div>
      </div>
      <!-- 评论内容 -->
      <div class="content">
        {{ item.content }}
      </div>

      <div class="other_info">
        <!-- 评论时间/评论 -->

        <!-- 点赞 -->
        <div class="praise">
          <div v-if="!like">
            <van-icon name="like-o" size="20" /> {{ item.praise }}
          </div>
          <div v-else><van-icon name="like" color="#fa547a" size="20" />20</div>
        </div>

        <div class="replies" v-if="!type == 1">
          <van-icon name="comment-o" size="20" @click="look" />
          {{ item.replyNums }}
        </div>
        
        <div class="reply" @click="show_input">回复</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "msg", "type"],
  name: "reply",
  data() {
    return {
      like: false,
      currentPage: 1,
      pageSize: 8,
      
    };
  },
  methods: {
    look() {
      this.$emit('initReply')
      this.$emit("show");
      this.getReply();
    },
    // 查询回复
    async getReply() {
      this.$emit("getReply", {
        id: this.item.cid,
        currentPage: this.$data.currentPage,
        pageSize: this.$data.pageSize,
      });
    },
    // 打开输入框
    show_input() {
      this.$emit("show_input");
    },
    // 写评论回复
    writeReply(msg) {
      this.$emit("writeReply", {
        cId: this.item.cid,
        userId: this.$store.state.user.id,
        username: this.$store.state.user.name,
        cor: this.type, //回复评论则为0；如果是回复回复则为1
        replyName: this.item.username, // 回复对象的名字(如果cor为0，该字段可以为null)
        replyId: this.item.userId,
        content: msg,
        userImg: this.$store.state.user.avatar,
      });
      this.$data.currentPage = 1
      this.getReply();
    },
  },
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  flex-direction: row;
  padding: 0.625rem;
  .left {
    margin-right: 0.625rem;
  }
  .info {
    width: 87%;
    .user {
      display: flex;
      flex-direction: column;

      width: 100%;
      margin-bottom: 1rem;
      .name {
        display: flex;
        flex-direction: row;
        .to {
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: -0.01px;
          line-height: 18px;
          color: #4c4c4c;
          margin: 0 0.625rem;
        }
        .replyName {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.01px;
          line-height: 18px;
          color: #98b9db;
        }
      }
      .username {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: -0.01px;
        line-height: 18px;
        color: #0075ff;
      }
      .time {
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 15px;
        color: rgba(164, 171, 179, 1);
        margin-top: 0.3125rem;
      }
    }
    .content {
      padding-right: 0.625rem;
      margin-bottom: 0.625rem;
      line-height: 1.375rem;
      color: #070707;
    }
    .other_info {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      .inputReply {
        margin: 0 0.625rem;
        color: #98b9db;
      }
      .praise {
        margin-right: 0.625rem;
      }
      .reply {
        margin-left: 0.625rem;
        color: #536c85;
        line-height: 1.25rem;
      }
    }
  }
}
.input {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-left: -0.625rem;
  z-index: 5;

  .title {
    width: 6.25rem;
    text-align: center;
    color: #98b9db;
    background-color: #fff;
  }
  .van-field {
    width: 97%;
    border-bottom: 0.1625rem solid #98b9db;
    background-color: #fff;
  }
}
</style>