import api from './request'
import axios from 'axios'


// 登录
export const login = (params) => api.post('user/login', params)
//获取用户信息
export const getInfo = (params) => api.post('userInfo/get', params)
// 注册
export const sign = (params) => api.post('user/register', params)
//发送邮箱验证码
// export const code = (params) => api.post('user/sendEmailMsg', params: params)
export const code = (params) => api({
    method: 'POST',
    url: "user/sendEmailMsg",
    params: params
})
// 修改用户信息
export const updateUser = (params) => api.post('/userInfo/change', params)


// 发布动态
export const publish = (params) => api.post('publish/selfActive', params)

// 查询动态内容
export const getPublish = (params) => api.post('/publish/selectAllTPost', params)

//查询文章内容
export const getArticle = (params) => api.post('/publish/selectByTId', params)

// 发布评论
export const writeComment = (params) => api.post('/publish/writeComment', params)

// 查询文章评论
export const getComment = (params) => api.post('/publish/selectComments', params)

// 回复评论
export const writeReplies = (params) => api.post('/publish/writeReplies', params)

// 查评论
export const getReplies = (params) => api.post('/publish/selectReplies', params)

// 刷新
export const refurbish = (params) => api.post('/publish/refurbish', params)