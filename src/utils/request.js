import axios from 'axios';
import qs from 'qs';

//mint UI 框架，若不需要请全部注释掉
// import {Indicator, Toast} from 'mint-ui'
import {Message} from "element-ui"
import Router from "../router"

const ct1 = 'application/x-www-form-urlencoded;charset=UTF-8';
const ct2 = "application/json"
const api_base_url = "http://localhost:8083/"
//const api_base_url = "http://101.132.145.51:8080"
// const api_base_url = 'http://139.129.14.127:9090/'
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//开启跨域请求携带session
axios.defaults.withCredentials = true

axios.defaults.baseURL = api_base_url

//添加请求拦截器
// axios.interceptors.request.use(config => {
//   Indicator.open({
//     text: '加载中...',
//     spinnerType: 'fading-circle'
//   })
//   return config
// },
// err => {
//   Indicator.close()
//   Toast({
//     message: '加载超时',
//     position: 'middle',
//     duration: 3000
//   })
//   return Promise.reject(err)
// })

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
axios.interceptors.response.use(response => {
  let timetp = null
  clearTimeout(timetp)
  timetp = setTimeout(() => {
    //Indicator.close()
    clearTimeout(timetp)
  }, 500)
  // 只将请求结果的data字段返回 
  // if(response.data.code=="403"){
  //   localStorage.removeItem("userInfo")
  //   Router.push('/login');
  // }
  // else
    return response.data
},
error => {
  Message.error("服务器异常，请稍后重试！")
  return Promise.reject(error);
  // 发生网络错误后会走到这里
  // promise.resolve("ssss")
})

//返回一个Promise
function fetch(url, params,type,ct_type = false) {
  if(ct_type)
    axios.defaults.headers.post['Content-Type'] = ct2
  else
    axios.defaults.headers.post['Content-Type'] = ct1
  return new Promise((resolve, reject) => {
    if(type=='post'){
      axios.post(url,ct_type?params:qs.stringify(params))
      .then(response => {
          resolve(response);
      }, err => {
          reject(err);
      })
      .catch((error) => {
          reject(error)
      })
    } else{
      axios.get(url,{params})
      .then(response => {
          resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
          reject(error)
      })
    }   
  })
}

export default{
  fetch,
  api_base_url
}