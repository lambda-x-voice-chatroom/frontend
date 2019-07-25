import axios from 'axios';

const token = localStorage.getItem('token');

const request = axios.create({
    baseURL: 'https://lambda-voice-chat-auth.herokuapp.com/api'
});

export default request;
