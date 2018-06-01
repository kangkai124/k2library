<template>
  <div class="year-progress">
    <progress :percent="percent" activeColor="#EA5A49"></progress>
    <p>{{year}}已经过了{{passDays}}天...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    passDays() {
      const start = new Date();
      start.setMonth(0);
      start.setDate(1);
      const offset = new Date().getTime() - start.getTime();
      return Math.floor(offset / 1000 / 60 / 60 / 24) + 1;
    },
    percent() {
      return this.getPercent();
    },
  },
  methods: {
    isLeapYear() {
      const year = new Date().getFullYear();
      let isLeap = false;
      if (year % 400 === 0 && (year % 4 === 0 && year % 100 !== 0)) isLeap = true;
      return isLeap;
    },
    getPercent() {
      let days = 365;
      if (this.isLeapYear) days = 366;
      return ((this.passDays / days) * 100).toFixed(2);
    },
  },
};
</script>

<style lang="less">
  .year-progress {
    padding: 20rpx 60rpx;
    text-align: center;
    font-size: 16px;

    p {
      height: 80rpx;
      line-height: 80rpx;
    }
  }
</style>
