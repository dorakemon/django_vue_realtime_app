<template>
  <v-app class="card col-md-6 col-sm-7 mx-auto mt-8">
    <div class="card-body">
      <div class="card-title">
        <h3>Todo Group</h3>
        <hr />
      </div>
      <div class="card-body">
        <div class="test" v-for="(test, index) in tests" :key="`first-${index}`">
          <p>
            <span class="font-weight-bold">{{ test.username }}:</span>
            {{ test.content }}
          </p>
        </div>
        <div class="messages" v-for="(msg, index) in messages" :key="`second-${index}`">
          <p>
            <span class="font-weight-bold">{{ msg.user }}:</span>
            {{ msg.message }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input type="text" :value="this.$store.getters.username" class="form-control" readonly />
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control" />
        </div>
        <v-row>
          <v-btn type="submit" class="success ml-3" @click="postMessage">Send</v-btn>
          <v-spacer/>
          <Logout class="mb-3 mr-3"/>
        </v-row>
      </form>
    </div>
  </v-app>

</template>

<script>
/* eslint-disable no-console */

import io from "socket.io-client";
import axios from "../common/axios-token.js";
import Logout from "./Logout.vue";

export default {
  name: "Chat",
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      // socket: io("3.112.235.240:3001"),
      socket: io("3.112.235.240:3001"),

      tests: [],
    };
  },
  components: {
    Logout
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      if (this.message!="") {
        this.socket.emit("SEND_MESSAGE", {
          user: this.$store.getters.username,
          message: this.message
        });
        this.message = "";
      }
    },
    postMessage() {
        axios.post("todo/",
        {"username": `${this.$store.getters.username}`,
          "content": `${this.message}`})
    }
  },
  created() {
    axios.get("todo/").then(response => {
      this.tests = response.data;
    });
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      //this.messages = [...this.messages, data];
      this.messages.push(data)
      console.log(data)
    });
  }
}

</script>