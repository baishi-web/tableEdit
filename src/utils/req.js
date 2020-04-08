import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "http://127.0.0.1:5000";
// 请求拦截器
axios.interceptors.request.use(
  req => {
    if (req.method === "post") {
      req.data = qs.stringify(req.data);
    }
    return req;
  },
  err => {
    Promise.reject(err);
  }
);
// 响应拦截
axios.interceptors.response.use(
  res => {
    switch (res.status) {
      case 200:
        return res.data;
      case 500:
        break;
      default:
        return res.data;
    }
  },
  err => Promise.reject(err)
);
