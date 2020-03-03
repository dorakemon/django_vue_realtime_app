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
    baseURL: 'http://52.194.254.106/api/',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': getAuthorization()
    },
    data: {}
})

export default instance;
