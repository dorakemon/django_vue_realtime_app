<template>
  <v-btn  @click="logout" color="error">Logout</v-btn>
</template>

<script>
export default {
  name: "Logout",

  data () {
    return {

    }
  },
  
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
  }
}
</script>