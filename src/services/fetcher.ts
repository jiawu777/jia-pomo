import axios from 'axios';
import { APIBasePathArr } from '@/constants/common';
import { authTokenAtom, store, LOCAL_STORAGE_KEY } from '@/store';

type RejectedResponseType = {
  /**API data code */
  code: string | number;
  /**錯誤訊息 */
  message: string;
};

const apiPath = APIBasePathArr[0];
// instance
const fetcher = axios.create({
  baseURL: apiPath,
  headers: { 'Content-Type': 'application/json' },
});

// request interceptors
fetcher.interceptors.request.use((config) => {
  const authToken = store.get(authTokenAtom);
  const newAPIIndex = localStorage.getItem(LOCAL_STORAGE_KEY.Retry)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.Retry) as string)
    : 0;
  if (authToken) {
    config.headers['Auth-Token'] = authToken;
  }
  const newAPIPath = APIBasePathArr[newAPIIndex];
  fetcher.defaults.baseURL = newAPIPath;
  return config;
});

// response interceptors
fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.msg || '未知問題';
    const status = error?.response?.status;
    switch (status) {
      case 404:
        console.error('你要找的頁面不存在');
        break;
      case 413:
        console.error('資料量過大');
        break;
      case 429:
        console.error('太多請求');
        break;
      case 403:
        console.error('伺服器文件或目的拒絕訪問');
        break;
      case 500:
        console.error('內部伺服器錯誤');
        break;
      default:
    }
    return Promise.reject({
      status: status,
      msg: message,
    });
  }
);

export { fetcher };
export type { RejectedResponseType };
