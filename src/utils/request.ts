import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import { Toast } from "antd-mobile";
import { getTokenInfo, removeTokenInfo } from "./storage";
const baseURL = "http://geek.itheima.net/v1_0/";
const http = axios.create({
  baseURL,
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    const token = getTokenInfo().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error: AxiosError) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    // 网络错误
    if (!error.response) {
      Toast.show({
        content: "网络繁忙，请稍后重试",
      });
      return Promise.reject(error);
    }
    // 网络正常
    // 不是token失效
    if (error.response.status !== 401) {
      Toast.show({
        content: error.response.data.message,
      });
      return Promise.reject(error);
    }
    removeTokenInfo();
  }
);

export default http;
