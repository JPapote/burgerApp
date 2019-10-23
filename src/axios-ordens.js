import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-my-app-7a9ed.firebaseio.com/'
});

export default instance;