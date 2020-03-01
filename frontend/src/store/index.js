import Vue from 'vue'
import Vuex from 'vuex'

import axios from '../common/axios-auth.js'
import axios_token from '../common/axios-token.js'

import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: "",
    // idRefresh: "",
    loggedIn: false,
    username: '',
  },

  getters: {
    idToken: state => state.idToken,
    // idRefresh: state => state.idRefresh,
    loggedIn: state => state.loggedIn,

    username: state => state.username,
  },

  mutations : {
    storeIdToken(state, idToken){ //idRefresh) {
      state.idToken = idToken;
      //state.idRefresh = idRefresh // refreshの扱いはあとで 
      localStorage.setItem("jwt", JSON.stringify(idToken))
      state.loggedIn = true
    },
    clear (state) {
      state.idToken = '',
      state.idLoggedIn = false
    },
    set (state, payload) {
      state.username = payload.user.username
      state.isLoggedIn = true
    },
  },

  actions: {
    login({commit}, auth){
      axios.post("jwt/create/", {
        username: auth.username,
        password: auth.password,
      })
      .then(response => {
        commit('storeIdToken', response.data.access)
        router.push('/')
      });
    },
    logout ({commit}) {
      localStorage.removeItem('jwt')
      commit('clear')
    },
    reload ({commit}) {
      return axios_token.get('auth/users/me/')
        .then(response => {
          const user = response.data
          // storeのユーザー情報を更新
          commit('set', { user: user })
          return user
        })
    }
  }
})
