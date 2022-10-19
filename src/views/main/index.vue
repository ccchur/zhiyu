<template>
  <div>
    <!-- 中心内容 -->
    <div class="main">
      <router-view />
    </div>
    <!-- 底部导航栏 -->
    <div class="tabbar">
      <van-tabbar route :placeholder="true" active-color="#98b9db">
        <van-tabbar-item
          safe-area-inset-bottom="true"
          router-link
          to="/home"
          icon="wap-home"
          >首页</van-tabbar-item
        >
        <van-icon class="publish" name="add" size="60" @click="publish"/>

        <van-tabbar-item router-link to="/center" icon="manager"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconUrl: require("../../assets/icon/publish.png"),
      active: 0,
    };
  },
  methods: {
    publish() {
      this.$router.push("/publish");
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  background-color: #f5f5f5;
  border: 0.0625rem solid #fff;
}
.publish {
  position: relative;
  bottom: 0.625rem;
  border: 0.0625rem solid #f5f5f5;
  z-index: 5;
  height: 3.75rem;
  background-color: #fff;
  border-radius: 50%;
}
</style>