<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Chat />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Chat from '../components/Chat.vue'

export default {
  name: 'Home',
  components: {
    Chat
  }
}
</script>
