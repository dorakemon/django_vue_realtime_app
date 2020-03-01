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

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
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