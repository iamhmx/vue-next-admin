/*
 * @Author: mingxing.huang
 * @Date: 2020-10-29 21:56:26
 */

const tokens = {
  admin: {
    token: 'admin-token'
  },
  guest: {
    token: 'guest-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    name: 'Super Admin'
  },
  'guest-token': {
    roles: ['guest'],
    name: 'Normal GUEST'
  }
}

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: config => {
      const { username, password } = config.body
      if (password !== '123456') {
        return {
          code: 500,
          message: '用户名密码错误'
        }
      }
      const token = tokens[username]
      if (!token) {
        return {
          code: 500,
          message: '用户名密码错误'
        }
      }
      return {
        code: 200,
        message: 'ok',
        data: token
      }
    }
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      if (!info) {
        return {
          code: 500,
          message: '找不到该用户'
        }
      }
      return {
        code: 200,
        data: info,
        message: 'ok'
      }
    }
  },
  // user logout
  {
    url: '/api/user/logout',
    method: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
