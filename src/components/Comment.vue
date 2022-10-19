<template>
  <div>
    <!-- 第一层评论 -->
    <reply
      :item="item"
      @show="show"
      @show_input="show_input"
      v-bind="$attrs"
      v-on="$listeners"
      :type="0"
      ref="reply1"
    />

    <!-- 第二层，回复区 -->
    <van-popup
      v-model="showReply"
      position="bottom"
      :style="{ height: '80%' }"
      round
      closeable
      close-icon-position="top-right"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
        :immediate-check="false"
      >
        <div class="replyInfo">评论详情</div>
        <div class="more_reply" v-for="(item, index) in reply" :key="index">
          <reply
            ref="reply2"
            :item="item"
            v-bind="$attrs"
            v-on="$listeners"
            :type="1"
            :msg="msg"
            @show_input="show_input2"
          />
        </div>
      </van-list>
      <!-- 输入框 -->
      <div class="input" v-show="showInput2">
        <div class="title">对话:</div>
        <van-field
          v-model="msg"
          center
          :clearable="true"
          placeholder="说点什么吧..."
        >
          <template #right-icon>
            <van-icon :name="publish_icon" size="23" @click="writeComment2" />
          </template>
        </van-field>
      </div>
    </van-popup>

    <!-- 输入框 -->
    <div class="input" v-if="showInput">
      <div class="title">回复评论:</div>
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
import reply from "@/components/Reply.vue";
export default {
  components: {
    reply,
  },
  props: ["item", "reply"],
  name: "comment",
  data() {
    return {
      publish_icon: require("@/assets/icon/publish.png"),
      like: false,
      showReply: false,
      showInput: false,
      showInput2: false,
      msg: "",

      finished: false,
      loading: false,
    };
  },
  methods: {
    // 点击评论打开弹出层,关闭  回复评论  输入框
    show() {
      this.$data.showReply = true;
      this.$data.showInput = false;
    },
    // 点击回复，打开   回复评论   的输入框
    show_input() {
      this.$data.showInput = !this.$data.showInput;
    },
    show_input2() {
      this.$data.showInput2 = !this.$data.showInput2;
    },

    writeComment() {
      this.$refs.reply1.writeReply(this.$data.msg);
      this.$data.msg = "";
    },
    writeComment2() {
      this.$refs.reply2[0].writeReply(this.$data.msg);
      this.$data.msg = "";
    },
    // 下拉刷新回复
    onLoad() {
      this.$refs.reply2[0].currentPage++;
      this.$refs.reply2[0].getReply()
    },
  },
};
</script>

<style scoped lang='scss'>
.more_reply {
  border-radius: 3%;

}
.replyInfo {
  height: 8%;
  line-height: 3.25rem;
  font-size: 1rem;
  padding-left: 1.25rem;
  border-bottom: 0.125rem solid #e1e1e1;
}
.van-list{
  margin-bottom: 15%;
}
.input {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
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

</style>