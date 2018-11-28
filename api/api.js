import request from '../utils/request.js'

export const login = params => request('POST', '/user/login', params) // 登录