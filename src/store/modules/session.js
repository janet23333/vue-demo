import request from '@/utils/requests'
import { loginByUsername } from '@/api/hello_world'
import { setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
const session = {
  state: {
    user: {},
    token: ''
  },
  // getters
  getters: {
    user: state => state.user,
    token: state => state.token
  },

  // actions
  actions: {
    setSessionInfo({ commit, state }, user) {
      commit('setUser', user)
    },
    login({ commit, state }, loginParams) {
      return new Promise((resolve, reject) => {
        request
          .post(loginByUsername, loginParams)
          .then(data => {
            if (data.code !== 200) {
              this.$message({
                message: data.msg,
                type: 'error'
              })
              reject(data.msg)
            } else {
              setToken(data.res.token)
              resolve()
            }
          })
          .catch(error => {
            Message.closeAll()
            Message({
              message: '账号/密码输入错误',
              type: 'error',
              duration: 5 * 1000,
              showClose: true
            })
            reject(error)
          })
      })
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeToken()
        commit('setUser', {})
        resolve()
      })
    }
  },

  // mutations
  mutations: {
    setToken(state, token) {
      state.token = token
    },

    setUser(state, user) {
      state.user = user
    }
  }
}

export default session
