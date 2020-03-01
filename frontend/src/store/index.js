import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/common/axios-auth'

import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: "",
    // idRefresh: "",
    loggedIn: false
  },

  getters: {
    idToken: state => state.idToken,
    // idRefresh: state => state.idRefresh,
    loggedIn: state => state.loggedIn
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
    }
  },
  actions: {
    login({commit}, auth){
      axios.post("jwt/create/", {
        username: auth.username,
        password: auth.password,
      })
      .then(response => {
        commit('storeIdToken', response.data.access)

        // reload何？
        router.push('/')
      });
    },
    logout ({commit}) {
      localStorage.removeItem('jwt')
      commit('clear')
    },
    reload (context) {
      return axios.get('users/me/')
        .then(response => {
          const user = response.data
          // storeのユーザー情報を更新
          context.commit('set', { user: user })
          return user
        })
    }
  }
})
