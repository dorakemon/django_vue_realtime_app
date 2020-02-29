<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>Todo Group</h3>
              <hr>
          </div>
          <div class="card-body">
            <div class="test" v-for="(msg, index) in test" :key="index">
                <p><span class="font-weight-bold">{{ msg.username }}: </span>{{ msg.content }}</p>
            </div>
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
              </div>
          </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="gorm-group">
                  <label for="user">User:</label>
                  <input type="text" v-model="user" class="form-control">
              </div>
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
          </form>
            <!-- <p>{{messages}}</p> -->
      </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import io from 'socket.io-client';
import axios from "axios";

export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            socket : io('localhost:3001'),

            test: ""
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        }
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
        
        axios.get("http://localhost:8000/api/todo/")
            .then(response => {
            this.test = response.data;
        });
    }
}
</script>

<style>

</style>
