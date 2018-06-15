<template>
  <div class="comment-list" v-if="comments.length > 0">
    <div class="page-title">
      我的评论
    </div>
    <div
      class="comment"
      v-for="comment in comments"
      :key="comment.id"
      @click="handleClick(comment)">
      <div class="user">
        <div class="inline">
          <img :src="comment.avatarUrl" alt="" v-model="aspectFit" class="avatar" />
            {{comment.nickName}}
          <div class="right">
            {{comment.location || ''}}
            {{comment.phone || ''}}
          </div>
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['comments', 'type'],
  methods: {
    handleClick(comment) {
      console.log('click', this.type);

      if (this.type === 'user') {
        wx.navigateTo({ url: `/pages/detail/main?id=${comment.bookId}` });
      }
    },
  },
};
</script>
<style lang="less">
.comment-list {
  background-color: #eee;
  font-size: 14px;
  padding: 10px 0;

  .comment {
    background-color: white;
    margin-bottom: 10px;
    padding: 5px 20px;
    // width: 90%;

    .content {
      margin: 10px 0;
    }

    .user {
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>
