//引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/utils/api'
// 获取token|设置token|删除token的函数
import { getToken, setToken, removeToken, getToken2, setToken2, removeToken2 } from '@/utils/auth'



//箭头函数
const getDefaultState = () => {
    return {    
        //获取token
        token: '',
        // 用户id
        id: '',
        // 账号
        account: '',
        //存储用户名
        name: ' ',
        //存储用户头像
        avatar: '',
        //邮箱
        email: '',
        // 手机号码
        phoneNumber: '',
        //性别
        sex: '',
        //年龄
        age: '',
        // 身份
        role: '',
        // 生日
        birthday: '',
        // 角色
        roles: ''


    }
}

const state = getDefaultState()

//唯一修改state的地方
const mutations = {
    //重置state
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    //存储token
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    //存储用户信息
    SET_USERINFO: (state, userInfo) => {
        //用户id
        state.id = userInfo.id
        //用户名
        state.name = userInfo.username;
        //用户头像
        state.avatar = userInfo.userImg;
        //用户邮箱
        state.email = userInfo.email
        //角色
        state.roles = userInfo.permissions;
        // 年龄
        state.age = userInfo.age;
        // 账号
        state.account = userInfo.account;
        // 生日
        state.birthday = userInfo.birthday;
        // 性别
        state.sex = userInfo.sex
        // 手机号码
        state.phoneNumber = userInfo.phoneNumber
    },
}

//actions
const actions = {
    //这里在处理登录业务
    async login( {commit} , userInfo) {
        let res = await login(JSON.stringify(userInfo));
        //注意：当前登录请求现在使用mock数据，mock数据code是20000
        if (res.data.code == 200) {
            //vuex存储token
            commit('SET_TOKEN', res.data.data.token);
            //本地持久化存储token
            setToken(res.data.data.token);
            setToken2(res.data.data2.id);
            //vuex存储用户全部的信息
            commit('SET_USERINFO', res.data.data2)
            return res;
        } else {
            return Promise.reject(res.data.data);
        }
    },


    //获取用户信息
    getInfo({ commit }, userId) {
        return new Promise((resolve, reject) => {
            getInfo(userId).then(res => {
                // const { data } = response;
                //vuex存储用户全部的信息
                commit('SET_USERINFO', res.data.data[0]);
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        console.log("退出了");
        return new Promise((resolve, reject) => {
            
                removeToken() // must remove  token  first
                removeToken2() // must remove  token  first
                commit('RESET_STATE')
                resolve("退出成功")
            
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

const getters = {
    token: state => state.token,
    userInfo: state => state
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

