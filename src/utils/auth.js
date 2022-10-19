import Cookies from 'js-cookie'

const TokenKey = 'token'
const TokenId = 'id'

export function getToken() {
  // return Cookies.get(TokenKey)
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}

// 存在localStorage里面
export function getToken2() {
  // return Cookies.get(TokenKey)
  return window.localStorage.getItem(TokenId)
}

export function setToken2(id) {
  return window.localStorage.setItem(TokenId, id)
}

export function removeToken2() {
  return window.localStorage.removeItem(TokenId)
}

