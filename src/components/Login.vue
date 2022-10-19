<template>
  <div>
    <div class="top">登录</div>
    <div class="input_box">
      <van-cell-group inset>
        <van-field
          v-model="userInfo.account"
          placeholder="请输入账号"
          size="large"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="userInfo.password"
          placeholder="请输入密码"
          type="password"
          size="large"
        />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button
        color="#243de2"
        size="normal"
        @click="login"
        :disabled="disabled"
        >登录</van-button
      >
    </div>
    <div class="tip"></div>
  </div>
</template>

<script>
import { debounce } from "../utils/index";
import { login, sign } from "../utils/api";
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        account: "",
        password: "",
      },
      disabled: false,
    };
  },
  methods: {
    login() {
      if (this.$data.userInfo.account && this.$data.userInfo.password) {
          this.$data.disabled = true;
          this.$store
            .dispatch("user/login", this.$data.userInfo)
            .then((res) => {
              this.$toast("登陆成功！");
            })
            .then((res) => {
              this.$router.replace("/home");
              this.$data.disabled = false;
            })
            .catch((err) => {
              console.log(err);
              this.$toast(err);
              this.$data.disabled = false;
            });

        // log_debounce()
      } else {
        
        this.$toast("请填写账号密码");
      }
    },
  },
};
</script>

<style scoped>
.top {
  height: 3.5rem;
  background: rgba(248, 250, 252, 0.94);
  text-align: center;
  font-size: 1rem;
  line-height: 3.5rem;
  font-weight: 700;
}
.input_box {
  padding: 2rem 0.75rem;
}
.van-cell-group {
  border: 0.0625rem solid rgba(148, 163, 184, 1);
  margin-bottom: 0.75rem;
}
.btn {
  text-align: center;
}
.van-button {
  width: 21.4375rem;
  height: 3.125rem;
  opacity: 1;
  border-radius: 0.375rem;
  background: #98b9db;
}
</style>