<template>
  <div class="swiper">
    <swiper
      indicator-dots="true"
      indicator-color="#EA5A49"
      autoplay="true"
      interval="10000"
      duration="1000"
      circular="true">
      <div :key="i" v-for="(top, i) in imgUrls">
        <swiper-item>
          <img
            @click="toBookDetail(img.id)"
            :key="img.id"
            class="slide-image"
            :src="img.image"
            mode="aspectFit"
            v-for="img in top" />
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>
<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls() {
      const res = this.tops;
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
    },
  },
  methods: {
    toBookDetail(id) {
      wx.navigateTo({ url: `/pages/detail/main?id=${id}` });
    },
  },
};
</script>
<style lang="less">
.swiper {
  margin-top: 6px;

  .slide-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>
