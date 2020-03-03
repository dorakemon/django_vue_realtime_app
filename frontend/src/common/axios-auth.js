import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://52.194.254.106/api/auth/'
})

export default instance;
