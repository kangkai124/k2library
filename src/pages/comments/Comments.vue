<template>
  <div class="comments">
    <div v-if="userInfo.openId">
      <CommentList :comments="comments" type="user"></CommentList>
    <div>
      <div class="page-title">
        我的图书
      </div>
      <Card v-for="book in books" :key="book.id" :book="book"></Card>
      <div v-if="!books.length">暂时还未添加过图书</div>
    </div>
    </div>
  </div>
</template>
<script>
import CommentList from '@/components/CommentList';
import Card from '@/components/Card';
import get from '@/utils';

export default {
  data() {
    return {
      comments: [],
      books: [],
      userInfo: {},
    };
  },
  components: {
    CommentList,
    Card,
  },
  onShow() {
    if (!this.userInfo.openId) {
      const userInfo = wx.getStorageSync('user');
      if (userInfo.openId) {
        this.userInfo = userInfo;
        this.init();
      }
    }
  },
  onPullDownRefresh() {
    this.init();
    wx.setPullDownRefresh();
  },
  methods: {
    init() {
      wx.showNavigationBarLoading();
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading();
    },
    async getComments() {
      const comments = await get('/weapp/commentlist', {
        openId: this.userInfo.openId,
      });
      this.comments = comments.data.list;
    },
    async getBooks() {
      const books = await get('/weapp/booklist', {
        openId: this.userInfo.openId,
      });
      console.log(books.data.list)
      this.books = books.data.list;
    },
  },
};
</script>

<style lang="less" scoped>

</style>

