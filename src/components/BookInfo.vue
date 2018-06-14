<template>
  <div class="book-info">
    <div class="thumb">
      <img
      class="back"
      :src="info.image"
      alt="info.title"
      mode="aspectFill" />

      <img
      class="img"
      :src="info.image"
      @click.stop="previewImg(info)"
      alt="info.title"
      mode="aspectFit" />

      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <img
        class="avatar"
        :src="userInfo.avatarUrl"
        alt="userInfo.nickName">
        {{userInfo.nickName}}
      <div class="right text-primary">
        {{info.rating}}分 <Rate :value="info.rating"></Rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>

    <div class="tags">
      <div
        class="badge"
        :key='i'
        v-for="(tag, i) in info.tags">
        {{tag}}
      </div>
    </div>

    <div class="summary">
      <p  :key="i" v-for="(sum, i) in info.summary">{{sum}}</p>
    </div>

  </div>
</template>
<script>
import Rate from '@/components/Rate';

export default {
  props: ['info'],
  computed: {
    userInfo() {
      return this.info.user_info || {};
    },
  },
  components: {
    Rate,
  },
  methods: {
    previewImg(img) {
      wx.previewImage({
        current: img.image,
        urls: [img.image],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.book-info {
  font-size: 12px;

  .right {
    float: right;
  }

  .detail {
    padding: 6px 10px;
    font-size: 14px;

    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .badge {
    display: inline-block;
    padding: 2px 4px;
    margin: 6px;
    border-radius: 10px;
    border: 1px #EA5A49 solid;
    color: #EA5A49;
  }

  .summary {
    margin-top: 10px;
    padding: 0 16px;
    p {
      text-indent: 2em;
    }
  }

  .thumb {
    width: 750rpx;
    height: 470rpx;
    // overflow: hidden;
    position: relative;
    top: -40rpx;

    .back {
      filter: blur(15px);
      width: 100%;
    }

    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 70rpx
    }

    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 390rpx;
      text-align: center;

      .title {
        font-size: 18px;
      }

      .author {
        font-size: 14px;
      }
    }
  }
}
</style>
