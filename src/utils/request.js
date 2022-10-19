import axios from 'axios'
import store from '@/store'
import { getToken ,removeToken} from '@/utils/auth'


const api = axios.create({
    baseURL: "http://119.23.232.40:8081/",
    timeout: 3000
})

//设置请求头
api.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"

//登录之后需要携带token请求头
// api.defaults.headers.post["token"] = window.sessionStorage.token



//拦截器

// interceptors axios的拦截器对象
api.interceptors.request.use(config => {
    let token = getToken()
    // config 请求的信息

    if (token) {
        config.headers["token"] = token
    }
    return config // 将配置完成的config对象返回出去 如果不返回 请求则不会进行
}, err => {
    // 请求发生错误时的处理 抛出错误
    Promise.reject(err)
})



api.interceptors.response.use(res => {
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    // res 是所有相应的信息
    console.log("回复头",res)
    return Promise.resolve(res)
}, err => {
    // 服务器响应发生错误时的处理
    Promise.reject(err)
    
})



export default api