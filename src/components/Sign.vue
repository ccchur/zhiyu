<template>
  <div>
    <div class="top">注册</div>
    <div class="input_box">
      <van-cell-group inset>
        <van-field v-model="username" placeholder="请输入用户名" size="large" />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="phoneNumber"
          :formatter="formatter_phone"
          :error-message="err_phone"
          maxlength="11"
          placeholder="请输入手机号码"
          type="tel"
          size="large"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="password"
          placeholder="请输入密码"
          type="password"
          size="large"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="email"
          :error-message="err_email"
          :formatter="formatter_email"
          placeholder="请输入邮箱"
          type="email"
          size="large"
        />

        <van-field
          v-model="code"
          center
          clearable
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
        >
          <template #button>
            <van-button
              size="small"
              color="#0f172a"
              @click="send"
              :disabled="disabled_send"
              :loading="loading"
              loading-text="稍后可重发"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <div class="btn">
      <van-button
        color="#243de2"
        size="normal"
        @click="sign"
        :disabled="disabled_sign"
        >注册</van-button
      >
    </div>
  </div>
</template>

<script>
import { phoneRule, EmailRule } from "../utils/reqex";
import { login, sign, code } from "../utils/api";
import { debounce, throttle } from "../utils/index";
export default {
  name: "sign",
  data() {
    return {
      username: "",
      phoneNumber: "",
      password: "",
      email: "",
      code: "",
      err_phone: "",
      err_email: "",
      disabled_sign: false,
      disabled_send: false,
      loading: false,
    };
  },
  methods: {
    formatter_phone(val) {
      const regex = new RegExp(phoneRule);
      let isRight = regex.test(val);
      if (val.length == 0) {
        this.$data.err_phone = "";
      } else {
        if (!isRight) {
          this.$data.err_phone = "手机号格式错误";
        } else {
          this.$data.err_phone = "";
        }
      }
      return val;
    },
    formatter_email(val) {
      const regex = new RegExp(EmailRule);
      let isRight = regex.test(val);
      if (val.length == 0) {
        this.$data.err_email = "";
        this.$data.disabled_send = true;
      } else {
        if (!isRight) {
          this.$data.err_email = "邮箱格式错误";
          this.$data.disabled_send = true;
        } else {
          this.$data.err_email = "";
          this.$data.disabled_send = false;
        }
      }
      return val;
    },
    send() {
      //定时器
      let _this = this;

      if (!this.$data.disabled_send) {
        this.$data.loading = true;
        code({ email: this.$data.email }).then((res) => {
          if (res.status == 200) return this.$toast("发送成功，请注意查收！");
        });
        setTimeout(function () {
          _this.$data.loading = false;
        }, 10000);

      }
    },
    sign() {
      if (
        this.$data.username &&
        this.$data.phoneNumber &&
        this.$data.password &&
        this.$data.email &&
        this.$data.code
      ) {
        this.$data.disabled_sign = true;
        sign(
          JSON.stringify({
            username: this.$data.username,
            phoneNumber: this.$data.phoneNumber,
            password: this.$data.password,
            email: this.$data.email,
            code: this.$data.code,
          })
        ).then((res) => {
          this.$data.disabled_sign = false;
          console.log(res);
          this.$toast(res.data.data);
          if (res.data.code == 200){
            this.$emit("isShow", "false")
          }
          
        });
      } else {
        this.$toast("请填写完整信息!");
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
.btn > .van-button {
  width: 21.4375rem;
  height: 3.125rem;
  opacity: 1;
  border-radius: 0.375rem;
  background: #98b9db;
}
</style>