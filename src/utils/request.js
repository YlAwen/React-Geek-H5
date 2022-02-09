import axios from "axios";
import { Toast } from "antd-mobile";
import { getTokenInfo } from "./storage";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0/",
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
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
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (!error.response) {
      Toast.show({
        content: "网络繁忙，请稍后重试",
      });
    } else {
      return Promise.reject(error.response);
    }
  }
);

export default http;
