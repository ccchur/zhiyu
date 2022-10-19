<template>
  <div>
    <div class="box">
      <!-- 头部内容 -->
      <div class="top">
        <div class="avatar">
          <van-image
            round
            width="4rem"
            height="4rem"
            fit="cover"
            :src="item.userImg"
          />
        </div>
        <div class="user">
          <div class="username">
            {{ item.username }}
          </div>
          <div class="time">
            {{ item.publishTime }}
          </div>
        </div>
      </div>
      <!-- 中心内容 -->
      <div class="content" @click="to_article()">
        <div class="text van-multi-ellipsis--l3">
          {{ item.content }}
        </div>

        <div class="img" v-if="item.fileName[0]">
          <van-image
            width="100%"
            fit="cover"
            lazy-load
            :src="item.fileName[0]"
          />
        </div>
      </div>
      <!-- 通知内容 -->
      <div class="info">
        <div class="comment">
            <van-icon name="comment-o" size="20"/> {{item.commentNums}}
        </div>
        <div class="like">
            <div v-if="!isLike"><van-icon :name="unLike_icon" size="20" @click="like" /> {{item.praise}}</div>
            <div v-else><van-icon :name="like_icon" size="20" @click="like" /> {{item.praise}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var likeUrl = require('../assets/icon/Like_focus.png')
var unlikeUrl = require('../assets/icon/liked.png')
export default {
  props: ["item"],
  name: "contentbox",
  data() {
    return {
        like_icon: likeUrl,
        unLike_icon: unlikeUrl,
        isLike: false,
    };
  },
  computed:{
    imgUrl: {
      get(){
        return JSON.parse(JSON.stringify(this.item))
      }
    }
  },
  methods:{
    like(){
        this.$data.isLike = !this.$data.isLike
    },
    to_article(){
      console.log("点击");
      console.log(this.item.tid);
      this.$emit('to_article', this.item.tid)
    },
   
  },
  watch: {
    isLike(newval,oldval, ){
        if(newval){
            this.$data.num_like++
        }else{
            this.$data.num_like--
        }
    }
  },
  
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid #fff;
  border-radius: 5%;
  margin: 1rem 0.5rem;
  padding: 0.8rem 0.5rem;
  background-color: #fff;
  .top {
    display: flex;
    align-items: center;
    height: 5rem;

    .avatar {
    }
    .user {
      height: 70%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 00.5rem;
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
    
  }
  .content {
      display: flex;
      flex-direction: column;
      .text{
        margin: 0.7rem;
        letter-spacing: 0.2rem;
        line-height: 2rem;
      }
      .img{
        border-radius: 5%;
        overflow: hidden;
      }
    }
    .info{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 1.5rem;
        div{
            display: flex;
            .van-icon{
                margin-right: 0.2rem;
            }
            
        }
    }
}
</style>