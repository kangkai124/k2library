<script>
import qcloud from 'wafer2-client-sdk';
import conf from './config';

export default {
  created() {
    qcloud.setLoginUrl(conf.loginUrl);
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
.text-primary {
  color: #ea5149;
}
.text-footer {
  text-align: center;
  font-size: 12px;
  margin-bottom: 10px;
}
</style>
