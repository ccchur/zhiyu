<template>
  <div class="page">
    <div class="top">
      <h3>设置</h3>
    </div>
    <div class="main">
      <van-cell-group title="账号信息设置">
        <van-cell title="更改个人信息" icon="user-o" is-link @click="update" />
      </van-cell-group>
      <van-cell-group title="其它">
        <van-cell title="联系我们" icon="phone-o">
          <template #right-icon>
            <van-icon name="service-o" class="service" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="logout">
      <van-button type="danger" size="large" @click="logout">退出</van-button>
    </div>

    <!-- 更改信息 -->
    <div>
      <van-popup
        v-model="updataUser"
        position="bottom"
        closeable
        round
        :style="{ height: '80%' }"
      >
        <div class="updateUser">
          <div class="top">
            <h3>修改个人信息</h3>
          </div>

          <div class="userInfo">
            <van-cell class="avatar" center>
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <van-uploader
                  v-model="fileList"
                  :max-count="1"
                  :after-read="afterRead"
                >
                  <template>
                    <van-image
                      width="80"
                      height="80"
                      fit="cover"
                      :src="$store.state.user.avatar"
                    />
                    <div class="preview-cover van-ellipsis">更换头像</div>
                  </template>
                </van-uploader>
              </template>
            </van-cell>

            <van-cell-group>
              <van-field
                v-model="userInfo.username"
                label="用户名"
                placeholder="填写用户名"
              />
            </van-cell-group>
            <van-cell-group>
              <van-field v-model="userInfo.sex" center clearable label="性别">
                <template #button>
                  <van-radio-group
                    v-model="userInfo.sex"
                    direction="horizontal"
                  >
                    <van-radio name="男">男</van-radio>
                    <van-radio name="女">女</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
            </van-cell-group>
            <van-cell-group>
              <van-field
                v-model="userInfo.age"
                label="年龄"
                type="number"
                placeholder="填写年龄"
              />
            </van-cell-group>
          </div>
          <div class="btn">
            <van-button
              type="danger"
              size="large"
              @click="updateInfo"
              :disabled="disabled"
              >确认更改</van-button
            >
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      updataUser: false,
      fileList: [],
      userInfo: {
        id: this.$store.state.user.id,
        username: this.$store.state.user.name,
        sex: this.$store.state.user.sex,
        age: this.$store.state.user.age,
        userImg: "",
      },
      disabled: true,
      changed: false,
    };
  },
  watch: {
    userInfo:{
      handler(newVal, oldVal){
        this.$data.disabled = false
        this.$data.changed = true
      },
      deep:true,
    }
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    update() {
      this.$data.updataUser = true;
    },
    updateInfo() {
      if (this.$data.changed) {
        this.$data.disabled = false;
      }
      this.$emit("updateUser", this.$data.userInfo, this.$data.fileList[0]);

    },
    //更新头像
    afterRead(file) {
      this.$data.disabled = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.page {
}
.top {
  margin-left: 1.25rem;
}
.main {
  margin-top: 3.125rem;
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    align-items: center;
    font-size: 16px;
    line-height: inherit;
  }
}
.logout {
  position: relative;
  margin-top: 30%;
  text-align: center;
  .van-button {
    width: 18.75rem;
    border-radius: 5%;
  }
}
.updateUser {
  .top {
    margin-top: 4.125rem;
  }
  .btn {
    position: relative;
  margin-top: 30%;
    text-align: center;
    .van-button {
      width: 18.75rem;
      border-radius: 5%;
    }
  }
}
.preview-cover {
  position: absolute;
  bottom: 0.375rem;
  box-sizing: border-box;
  width: 5.4375rem;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.avatar {
  text-align: center;
}
</style>