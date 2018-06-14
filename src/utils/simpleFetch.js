import { message } from 'antd';
import { SERVER } from '../config/nework';

/**
 * 基本 POST 请求
 * @param {String} url - 以 '/' 开头; 或者完整带 http/https 的路径
 * @param {Object} data - 包体
 */

function simpleFetch(url, data) {
  const fullUrl = url.indexOf('http') === -1 ? (SERVER + url) : url;
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch(fullUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => {
        if (res && res.status === 200) {
          return res.json();
        }
        throw new Error('server error');
      })
      .then((res) => {
        console.log(res);
        if (res.code === 200 && res.enmsg === 'ok') {
          resolve(res);
        } else if (res.code === 401) {
          // log out
          reject(new Error('authorization'));
        } else {
          console.log('err');
          reject(new Error(res.enmsg));
        }
      })
      .catch((err) => {
        console.log(err);
        reject(new Error('server error'));
      });
  });
}

export default simpleFetch;
