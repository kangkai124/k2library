import config from './config';

const get = url => new Promise((resolve, reject) => {
  wx.request({
    url: config.host + url,
    success(res) {
      if (res.data.code === 0) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    },
  });
});

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

export default get;
