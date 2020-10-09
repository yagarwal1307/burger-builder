import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-60cd1.firebaseio.com/'
});

export default instance;