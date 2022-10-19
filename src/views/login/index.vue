<template>
  <div class="page">
    <div class="login_box">
      <div class="title">{{title1}} <br> {{title2}}</div>
      <div class="btn">
        <button class="login" @click="login">登录</button>
        <button class="signup" @click="signup">注册</button>
      </div>
    </div>

    <van-popup
      v-model="show_login"
      position="bottom"
      :style="{ height: '95%' }"
      round
      closeable
    >
      <login />
    </van-popup>

    <van-popup
      v-model="show_signup"
      position="bottom"
      :style="{ height: '95%' }"
      round
      closeable
    >
      <sign @isShow="isShow" />
    </van-popup>
  </div>
</template>

<script>
import login from "../../components/Login.vue";
import sign from "../../components/Sign.vue";
export default {
  components: {
    login,
    sign,
  },
  data() {
    return {
      title1: "知道 · 分享",
      title2: "遇见 · 感动",
      show: false,
      show_login: false,
      show_signup: false,
    };
  },
  methods: {
    login() {
      console.log("登录");
      this.$data.show_login = true;
    },
    signup() {
      console.log("注册");
      this.$data.show_signup = true;
    },
    isShow(idx) {
      if (idx === "false") {
        this.$data.show_signup = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  min-height: 100vh;
  background-image: url("https://zhi--yu.oss-cn-hangzhou.aliyuncs.com/system/bg.jpeg");
  // background: no-repeat;
  background-size: 100%;
}
.login_box {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 12.25rem;
  opacity: 1;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0) 0%,
    rgba(15, 23, 42, 1) 100%
  );
  backdrop-filter: blur(0.8194rem);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 1.2rem;
}
.title {
  width: 14.3125rem;
  height: 4rem;
  margin: 1.5rem 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03rem;
  line-height: 2rem;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn {
  display: flex;
  justify-content: space-around;
}

.login {
  width: 10.4688rem;
  height: 3.125rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  border: 0.0625rem solid #fff;
  border-radius: 5%;
  color: #fff;
  background-color: transparent;
}

.signup {
  width: 10.4688rem;
  height: 3.125rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  border: 0.0625rem solid #fff;
  border-radius: 5%;
}
</style>