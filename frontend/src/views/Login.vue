<template>
  <div>
    <h2>ログイン</h2>
    <!-- <form @submit.prevent="sendUserInfo"> -->
    <form @submit.prevent="login">
      <div class="username">
        <label for="username">ユーザーネーム</label>
        <input type="text" v-model="username" class="form-control">
      </div>
      <div class="password pb-3">
        <label for="password">パスワード</label>
        <input type="password" v-model="password" class="form-control">
      </div>
      <button type="submit" class="btn btn-success">ログイン</button>
  </form>
  </div>
</template>

<script>
// import axios from '@/common/axios-auth'
// import { CSRF_TOKEN } from "../common/csrf_token.js";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // sendUserInfo(){
    //   axios({
    //     method: "POST",
    //     url: "jwt/create/",
    //     data: {
    //       username: this.username,
    //       password: this.password
    //     },
    //     headers: {
    //       "content-type": "application/json",
    //       //"X-CSRFTOKEN": CSRF_TOKEN
    //     }
    //   });
    // },
    login() {
      this.$store.dispatch('login', {
        username : this.username,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>

</style>