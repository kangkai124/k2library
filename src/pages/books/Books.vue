<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <Card :key='book.id' v-for="book in books" :book='book'></Card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
import get from '@/utils';
import Card from '@/components/Card';
import TopSwiper from '@/components/TopSwiper';

export default {
  data() {
    return {
      books: [],
      pageNum: 0,
      more: true,
      tops: [],
    };
  },
  components: { Card, TopSwiper },
  mounted() {
    this.getList(true);
    this.getTop();
    console.log('mounted');
  },
  // onShow() {
  //   this.getList();
  //   console.log('show');
  // },
  onPullDownRefresh() {
    this.getList(true);
    this.getTop();
  },
  onReachBottom() {
    if (this.more) {
      this.pageNum = this.pageNum + 1;
      this.getList();
    }
  },
  methods: {
    async getList(init) {
      if (init) {
        this.pageNum = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const books = await get('/weapp/booklist', { pageNum: this.pageNum });
      if (books.data.list.length < 10 && this.pageNum > 0) this.more = false;
      if (init) {
        this.books = books.data.list;
        wx.stopPullDownRefresh();
      } else {
        this.books = this.books.concat(books.data.list);
      }
      wx.hideNavigationBarLoading();
    },
    async getTop() {
      const tops = await get('/weapp/top');
      this.tops = tops.data.list;
    },
  },
};
</script>

<style>

</style>

