<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea
        v-model="comment"
        class="textarea"
        maxlength="100"
        placeholder="...">
        </textarea>
        <div class="location">
          <span class="label">地理位置：</span>
          <switch color="#EA5A49" @change="getGeo"></switch>
          <span class="text-primary">{{location}}</span>
        </div>
        <div class="phone">
          <span class="label">手机型号：</span>
          <switch color="#EA5A49" @change="getPhone"></switch>
          <span class="text-primary">{{phone}}</span>
        </div>
        <button class="btn" @click="addComment">
          评论
        </button>
    </div>
    <div v-else class="page-title">
      未登录 或已经评论过
    </div>
  </div>
</template>
<script>
import BookInfo from '@/components/BookInfo';
import CommentList from '@/components/CommentList';
import get, { showModal, post } from '../../utils';

export default {
  data() {
    return {
      bookId: 0,
      info: {},
      location: '',
      phone: '',
      userInfo: {},
      comments: [],
    };
  },
  components: {
    BookInfo,
    CommentList,
  },
  mounted() {
    this.bookId = this.$root.$mp.query.id;
    this.getDetail();
    this.getComments();
    const userInfo = wx.getStorageSync('user');
    if (userInfo) this.userInfo = userInfo;
  },
  onShareAppMessage() {

  },
  onUnload() {
    this.reset();
  },
  computed: {
    showAdd() {
      if (!this.userInfo.openId) return false;
      if (this.comments.findIndex(c => c.openId === this.userInfo.openId) > -1) return false;
      return true;
    },
  },
  methods: {
    async getDetail() {
      const info = await get('/weapp/bookdetail', { id: this.bookId });
      wx.setNavigationBarTitle({ title: info.data.title });
      this.info = info.data;
    },
    async getComments() {
      const comments = await get('/weapp/commentlist', { bookId: this.bookId });
      this.comments = comments.data.list;
    },
    getGeo(e) {
      const ak = 'pcP80bC4Ee109neF9ZCmZyuNM70oamGA';
      const url = 'http://api.map.baidu.com/geocoder/v2/';
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            const { latitude, longitude } = res;
            wx.request({
              url,
              data: {
                ak,
                output: 'json',
                location: `${latitude},${longitude}`,
              },
              success: (info) => {
                const address = info.data.result.addressComponent;
                const { city, district } = address;
                this.location = `${city} ${district}`;
              },
            });
          },
          fail: () => {
            showModal('获取地理位置失败', '获取地理位置失败,请稍后重试');
          },
        });
      } else {
        this.location = '';
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        this.phone = phoneInfo.model;
      } else {
        this.phone = '';
      }
    },
    async addComment() {
      if (!this.comment) return;
      const data = {
        bookId: Number(this.bookId),
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        openId: this.userInfo.openId,
      };
      try {
        await post('/weapp/comment', data);
        this.comment = '';
        this.getComments();
      } catch (err) {
        showModal('失败', err.msg);
      }
    },
    reset() {
      this.info = {};
      this.bookId = 0;
      this.info = {};
      this.location = '';
      this.phone = '';
      this.userInfo = {};
    },
  },
};
</script>
<style lang="less" scoped>
.comment {
  font-size: 14px;
  margin-top: 10px;
  .textarea {
    width: 700rpx;
    height: 200rpx;
    background-color: #eee;
    margin: 15rpx;
    border-radius: 4px;
    padding: 10rpx;
    font-size: 12px;
  }

  .location {
    margin-top: 10px;
    padding-left: 10px;
  }

  .phone {
    margin: 10px 0;
    padding-left: 10px;
  }

  .label {
    display: inline-block;
    width: 140rpx;
  }
}
</style>
