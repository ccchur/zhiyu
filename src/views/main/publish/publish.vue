<template>
  <!-- 上滑进入 -->
  <div>
    <van-overlay :show="show" @click="show = false" z-index="5">
  <div class="wrapper" @click.stop>

      <van-loading class="block" color="#98b9db" size="66">
        发布中...
      </van-loading>

  </div>
</van-overlay>
    
    <transition name="van-slide-up">
      <div v-show="visible">
        <!-- 头部 -->
        <div class="top">
          <van-nav-bar title="发布" left-text="返回" @click-left="onClickLeft">
            <template #left>
              <van-icon name="cross" size="25" color="#e3bbcd" />
            </template>
            <template #right>
              <van-icon
                :name="iconpublishi"
                size="25"
                @click="onClickRight(fileList)"
              />
            </template>
          </van-nav-bar>
        </div>

        <!-- 主体内容 -->
        <div class="main">
          <div class="input">
            <!-- 文字内容 -->
            <div class="input_text">
              <van-field
                v-model="text"
                autosize
                type="textarea"
                maxlength="500"
                placeholder="输入想法~"
                show-word-limit
                size="large"
              />
            </div>
            <!-- 图片内容 -->
            <div class="input_img">
              <van-uploader
                v-model="fileList"
                multiple
                :max-count="3"
                preview-size="102"
                :after-read="afterRead"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { publish,refurbish } from "../../../utils/api";
import { uploadFiles } from "../../../utils/oss";
export default {
  data() {
    return {
      show: false,
      visible: false,
      iconpublishi: require("../../../assets/icon/publish.png"),
      text: "",
      fileList: [],
    };
  },
  methods: {
    //返回
    onClickLeft() {
      console.log("返回");
      this.$router.go(-1);
    },
    //发布
    async onClickRight(fileList) {
     
      if (this.$data.fileList.length < 1 && !this.$data.text)
        return this.$toast("发布内容不能为空！");
      console.log("发布");
      this.$data.show = true
      let upImg = await uploadFiles(fileList);
      let upImgUrl = upImg();
      publish(
        JSON.stringify({
          userId: this.$store._modules.root.state.user.id,
          username: this.$store._modules.root.state.user.name,
          content: this.$data.text,
          fileName: upImgUrl,
          userImg: this.$store._modules.root.state.user.avatar,
        })
      ).then((res) => {
        if (res.data.code == 200) {
          this.$data.show = false
        }
        this.$toast(res.data.data);
        this.$bus.$emit('onRefresh')
        this.$router.push("/home");
      });
    },
    afterRead(file) {
      console.log();
      console.log(file);
    },
  },
  mounted() {
    this.$data.visible = true;
  },
  // 进入home页面要刷新
  beforeRouteLeave(to, from, next) {
    to.meta.isRe = true;
    next();
  },
};
</script>

<style scoped lang='scss'>
.van-nav-bar {
  height: 10vh;
  align-items: center;

  .van-nav-bar__title {
    font-size: 32px !important;
    font-weight: 700 !important;
  }
}
.main {
  margin: 2.1875rem 1.125rem;
  .input_img {
    text-align: center;
    .van-uploader > input {
      border: 1px solid pink;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 4.125rem;
    height: 4.125rem;
  }
</style>