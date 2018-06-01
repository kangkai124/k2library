<template>
  <div>
    <div class="container">
      <div class="user">
        <img :src="userInfo.avatarUrl" alt="user-avatar">
        <p>{{userInfo.avatarUrl}}</p>
        <p v-if="!showLogin">{{userInfo.nickName}}</p>
        <button
          v-if="showLogin"
          class="login"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="doLogin">
            登录
        </button>
      </div>
    </div>

    <YearProgress></YearProgress>

    <button v-if="!showLogin" @click="scanBook" class="add-book">添加图书</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk';
import { path } from 'ramda';
import YearProgress from '@/components/YearProgress';
import { showSuccess, showFail } from '../../utils';

export default {
  data() {
    return {
      showLogin: true,
      userInfo: {
        avatarUrl: '../../../static/img/unlogin.png',
      },
    };
  },
  components: {
    YearProgress,
  },
  created() {
    console.log(this.userInfo.avatarUrl)
    this.checkLogin();
    wx.setNavigationBarTitle({ title: '个人中心' });
  },
  methods: {
    checkLogin() {
      const userInfo = wx.getStorageSync('user');
      this.showLogin = !userInfo;
      this.userInfo = userInfo;
    },
    scanBook() {
      wx.scanCode({
        onlyFromCamera: false, // 是否只能从相机扫码，不允许从相册选择图片,
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
          showFail('无效的信息');
        },
      });
    },
    doLogin(options) {
      console.log(options);

      const that = this;
      const detail = path(['mp', 'detail'], options);
      wx.login({
        success(loginResult) {
          const loginParams = {
            code: loginResult.code,
            encryptedData: detail && detail.encryptedData,
            iv: detail && detail.iv,
          };
          qcloud.requestLogin({
            loginParams,
            success() {
              console.log('登录成功');
              showSuccess('登录成功');

              that.userInfo = detail && detail.userInfo;
              that.showLogin = false;

              wx.setStorageSync('user', detail && detail.userInfo);
              // console.log(that)；
            },
            fail(error) {
              // console('登录失败', error)
              console.log('登录失败', error);
              showFail('登录失败');
            },
          });
        },
        fail(loginError) {
          // util.showModel('登录失败', loginError)
          console.log('登录失败', loginError);
        },
      });
    },
  },
};
</script>

<style lang="less">
  .container {
    padding: 0 30rpx;

    .user {
      padding-top: 100rpx;
      text-align: center;

      img {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
      }
    }
  }
  .login {
    background-color: transparent;
    color: #999;

    &:active {
      background-color: transparent;
    }

    &::after {
      border: 0;
    }
  }
</style>

