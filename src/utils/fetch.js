<<<<<<< HEAD
// import { Platform } from 'react-native';
import { message } from 'antd';
import { SERVER } from '../app-config/nework';
// import { APP_NAME, APP_VERSION } from '../app-config/basic';
=======
import { message } from 'antd';
import { SERVER } from '../config/nework';
>>>>>>> 221d4161d45ca7bda652b5d3569233dd19af5360

/**
 * 基本 POST 请求
 * @param {String} url - 以 '/' 开头; 或者完整带 http/https 的路径
 * @param {Object} data - 包体
 * @param {Function} sucCB - 请求成功的回调
 * @param {Function} errCB - 请求失败的回调
 * @param {Function} finallyCB - 完成后一定会执行的, 比如让菊花图消失
 * @param {Function} timeoutCB - 超时回调
 * @param {Object} header - 自定义包头
 */

function myFetch(url, data, sucCB, errCB = () => { console.log('error'); }, finallyCB = () => { console.log('finally'); }, timeoutCB = () => { console.log('timeout'); }, header) {
  const fullUrl = url.indexOf('http') === -1 ? (SERVER + url) : url;
  const body = JSON.stringify(data);
  const postPromise = Promise.race([
    fetch(fullUrl, {
      method: 'POST',
      headers: {
        ...header,
        'Content-Type': 'application/json',
      },
      body,
    }),
    new Promise(((resolve, reject) => {
      setTimeout(() => reject(new Error('timeout')), 10000);
    })),
  ]);

  postPromise.then((res) => {
    if (res && res.status === 200) {
      return res.json();
    }
    throw new Error('server error');
  }).then((res) => {
    if (res.code === 200 && res.enmsg === 'ok') {
      finallyCB();
      sucCB(res);
    } else if (res.code === 401) {
      finallyCB();
      // log out
    } else {
      finallyCB();
      errCB(res);
    }
  }).catch((err) => {
    if (err.message === 'server error') {
      finallyCB();
      message.error('服务器内部错误');
      errCB({
        code: 500, enmsg: 'server error', cnmsg: '服务器内部错误', data: null,
      });
    } else if (err.message === 'timeout') {
      finallyCB();
      message.error('请求超时，请检查您的网络设置');
      timeoutCB();
    } else {
      finallyCB();
<<<<<<< HEAD
      message.error('客户端错误');
=======
      messgae.error('客户端错误');
>>>>>>> 221d4161d45ca7bda652b5d3569233dd19af5360
      console.log(err);
      errCB({
        code: 200, enmsg: 'client error', cnmsg: '客户端错误', data: null,
      });
    }
  });
}


export default myFetch;
