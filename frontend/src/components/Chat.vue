<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Todo Group</h3>
        <hr />
      </div>
      <div class="card-body">
        <div class="test" v-for="(msg, index) in test" :key="index">
          <p>
            <span class="font-weight-bold">{{ msg.username }}:</span>
            {{ msg.content }}
          </p>
        </div>
        <div class="messages" v-for="(msg, index) in messages" :key="index">
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
          <v-btn type="submit" class="success ml-3">Send</v-btn>
          <v-spacer/>
          <Logout class="mb-3 mr-3"/>
        </v-row>
      </form>
      <!-- <p>{{messages}}</p> -->
    </div>
  </div>
    <!-- <div class="btn btn-danger mt-4" @click="logout">ログアウト</div> -->

</template>

<script>
/* eslint-disable no-console */

import io from "socket.io-client";
import axios from "../common/axios-token.js";
import Logout from "./Logout.vue"

export default {
  name: "Chat",
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      // socket: io("3.112.235.240:3001"),
      socket: io("localhost:3001"),

      test: ""
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
    }
  },
  created() {
    axios.get("todo/").then(response => {
      this.test = response.data;
    });
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  }
};
</script>

<style>

</style>
