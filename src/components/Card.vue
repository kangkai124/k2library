<template>
  <a :href="detailUrl">
    <div class="book-card">
    <div class="thumb">
      <img
        :src="book.image"
        alt="book image"
        mode="aspectFit">
    </div>
    <div class="detail">
      <div class="row text-primary">
        <div class="right">
          {{book.rating}} <Rate :value="book.rating"></Rate>
        </div>
        <div class="left">
          {{book.title}}
        </div>
      </div>
      <div class="row">
        <div class="right text-primary">
          浏览量：{{book.count}}
        </div>
        <div class="left">
          {{book.author}}
        </div>
      </div>
      <div class="row">
        <div class="right">
          {{book.user_info.nickName}}
        </div>
        <div class="left">
          {{book.publisher}}
        </div>
      </div>

    </div>
  </div>
  </a>
</template>

<script>
import Rate from './Rate';

export default {
  props: ['book'],
  components: { Rate },
  computed: {
    detailUrl() {
      return `/pages/detail/main?id=${this.book.id}`;
    },
  },
};
</script>

<style lang='less' scoped>
  .book-card {
    padding: 5px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;

    .thumb {
      width: 90px;
      height: 90px;
      float: left;
      margin: 0 auto;
      overflow: hidden;

      img {
        max-height: 100%;
        max-width: 100%;
      }
    }

    .detail {
      margin-left: 100px;

      .row {
        line-height: 20px;
        margin-bottom: 4px;
        font-size: 14px;
      }

      .right {
        float: right;
        padding-right: 10px;
      }

      .left {
        margin-right: 80px;
      }
    }
  }
</style>
