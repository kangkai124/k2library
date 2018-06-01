import Vue from 'vue';
import App from './App';
import './styles/index.less';

Vue.config.productionTip = false;
// App.mpType = 'app';
const app = new Vue(App);
app.$mount();

export default {
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页
    pages: [
      'pages/books/main',
      'pages/comments/main',
      '^pages/me/main',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#EA5149',
      navigationBarTitleText: 'K2 library',
      navigationBarTextStyle: 'light',
    },
    tabBar: {
      selectedColor: '#EA5149',
      list: [
        {
          text: '图书',
          pagePath: 'pages/books/main',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book_active.png',
        },
        {
          text: '评论',
          pagePath: 'pages/comments/main',
          iconPath: 'static/img/comment.png',
          selectedIconPath: 'static/img/comment_active.png',
        },
        {
          text: '个人中心',
          pagePath: 'pages/me/main',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me_active.png',
        },
      ],
    },
  },
};
