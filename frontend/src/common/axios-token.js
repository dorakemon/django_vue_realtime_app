import axios from 'axios'

const getAuthorization = () => {
    if (localStorage.getItem('jwt') === null){
        return null
    }
    else {
        return `JWT ${localStorage.getItem('jwt').slice(1).slice(0,-1)}`
    }
};

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': getAuthorization()
    },
    data: {}
})

export default instance;
