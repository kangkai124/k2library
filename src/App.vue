<script>
import qcloud from 'wafer2-client-sdk';
// import get from './utils';
import conf from './config';

export default {
  created() {
    // get('/weapp/demo')
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.err(err);
    //   });

    // 设置登录地址
    qcloud.setLoginUrl(conf.loginUrl);
    qcloud.login({
      success(userInfo) {
        console.log('登录成功', userInfo);
      },
      fail(err) {
        console.log('登录失败', err);
      }
    });

    console.log('app created ');
  },
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
