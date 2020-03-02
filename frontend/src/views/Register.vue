<template>
  <v-app style="background:linear-gradient(-135deg, #667eea, #764ba2)">
    <v-card width="400" color="#EEEEEE" class="mx-auto my-auto elevation-12">
      <v-card-title>
        <h1 class="display-1 mx-auto">Registration</h1>
      </v-card-title>
      <v-card-text>
        <v-text-field 
          label="Username"
          v-model="username"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field 
          label="E-mail"
          v-model="email"
          prepend-icon="mdi-email"
          :rules="emailRules"
        />
        <v-text-field 
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model.lazy="password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
          required
        />
        <v-text-field 
          label="Confirm Password"
          :type="showPassword2 ? 'text' : 'password'"
          v-model.lazy="password2"
          prepend-icon="mdi-lock"
          :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword2 = !showPassword2"
          :rules="passwordConfirmRules"
          required
        />
        <v-alert 
          v-if="registerError"
          color="red" 
          text="true"
          class="elevation-2"
          icon="mdi-alert"
        >you cannot sign up!</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-row align="center" justify="center" class="mb-5" >
          <v-btn  to="login" color="success" class="mr-5">Login</v-btn>
          <v-btn  @click.prevent="registration">Sign Up</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import axios from '@/common/axios-auth.js'
import router from '@/router'

export default {
  name: "Register",
  data () {
    return {
      //  すべて完璧な登録状態ならclickable
      username: "",
      email: "",
      password: "",
      password2: "",
      clickable: false,

      registerError: false,

      showPassword: false,
      showPassword2: false,

      emailRules: [
        v => !!v || 'Email is required.',
        v => (v || '').length <= 20 || 'Max 20 characters',
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Invalid e-mail.'
        },
      ],

      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
      passwordConfirmRules: [
        v => !!v || 'Password Confirm is required',
        v => v === this.password || 'Password confirm is equal to password',
      ],
    }
  },
  methods: {
    registration() {
      axios.post("users/",
                  // {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
                  {"email": `${this.email}`,
                   "username": `${this.username}`,
                   "password": `${this.password}`})
        //.then(response => {
          //console.log(response.data)
          .then(() => {
            //const response_data = response.data
            this.registerError = false
            router.push('/')
          })
          .catch(() => {
            //console.log("errorhappen",error)
            this.registerError = true
            //state.error=true
          })
    }
  }
}
</script>

<style scoped>

</style>