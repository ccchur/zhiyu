<template>
  <div>
    <!-- 头部 -->
    <div class="navbar">
      <van-nav-bar :fixed="true" :placeholder="true" title="个人中心">
        <template #right>
          <van-icon
            name="setting"
            color="#98b9db"
            size="25"
            @click="setting"
          /> </template
      ></van-nav-bar>
    </div>

    <!-- 个人信息 -->
    <div class="userInfo">
      <div class="avatar">
        <van-image
          width="120px"
          height="120px"
          fit="cover"
          lazy-load
          :src="$store.state.user.avatar"
        />
      </div>
      <div class="username">
        {{ $store.state.user.name }}
      </div>
    </div>

    <div class="info">
      <h3>
        官网:
      </h3>
       http://175.178.61.219/ 复制到浏览器下载更新>>
    </div>

    <!-- 修改个人信息 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '80%' }"
      closeable
      ><setting ref="child" @logout="logout" @updateUser="update"
    /></van-popup>
  </div>
</template>

<script>

import { Toast } from "vant";
import setting from "../../../components/Setting.vue";
import { updateUser } from "@/utils/api";
import { uploadImg } from "@/utils/oss";
export default {
  components: {
    setting,
  },
  name: "center",
  data() {
    return {
      show: false,
    };
  },

  methods: {
    setting() {
      this.$data.show = true;
    },
    async logout() {
      let res = await this.$store.dispatch("user/logout");
      Toast(res);
      this.$router.push(`/`);
    },
    async update(updateInfo, img) {
      // 如果要修改头像
      //先提交头像，获取链接
      if (img) {
         let imgUrl = await uploadImg(img)
         updateInfo.userImg = imgUrl()
      } 
      //提交表单
      await updateUser(JSON.stringify(updateInfo))
      // 更新完重新获取用户信息
      this.$store.dispatch("user/getInfo", updateInfo.id)
      Toast("更新成功")
      this.$refs.child.disabled = true
    },
  },
};
</script>

<style scoped lang='scss'>
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.6875rem auto;

  .username {
    margin-top: 0.625rem;
    font-weight: 700;
    font-size: 0.975rem;
    line-height: 1.25rem;
  }
}
.info {
  position: relative;
  top: 10rem;
  text-align: center;
  background-color: #fff;
}

.van-popup {
  border: 0.0625rem solid #fff;
  border-radius: 5% 5% 0 0;
}
</style>