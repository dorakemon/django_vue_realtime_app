import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('jwt').slice(1).slice(0,-1)}` 
    },
    data: {}
})

export default instance;
