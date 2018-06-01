<template>
  <div>
    个人中心
  <!-- <button class="no-border" open-type="getUserInfo">ddd</button> -->
  <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>

  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk';
import { path } from 'ramda';

export default {
  data() {
    return {

    };
  },
  methods: {
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
              that.userInfo = detail && detail.userInfo;
              that.logged = true;
              console.log(that)
            },
            fail(error) {
              // console('登录失败', error)
              console.log('登录失败', error);
            },
          });
        },
        fail(loginError) {
          // util.showModel('登录失败', loginError)
          console.log('登录失败', loginError);
        },
      });
    },
    hhh() {
      console.log('...')
    }
  },
};
</script>

<style>
  .no-border {
    border: none;
  }
</style>

