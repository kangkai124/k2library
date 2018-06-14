import config from './config';

export const showSuccess = (title) => {
  wx.showToast({
    title,
    icon: 'success',
  });
};

export const showFail = (title) => {
  wx.showToast({
    title,
    icon: 'none',
  });
};

export const showModal = (title, content) => {
  wx.showModal({
    title,
    content,
    showCancel: false,
  });
};

const request = (url, method, data) => new Promise((resolve, reject) => {
  wx.request({
    data,
    method,
    url: config.host + url,
    success(res) {
      if (res.data.code === 0) {
        resolve(res.data);
      } else {
        // showModal('失败', res.data.data.msg);
        reject(res.data);
      }
    },
  });
});

const get = (url, data) => request(url, 'GET', data);

export const post = (url, data) => request(url, 'POST', data);

export default get;
