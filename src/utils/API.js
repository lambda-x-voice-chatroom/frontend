// utils/API.js

import axios from 'axios';

export default axios.create({
    baseURL: 'https://lambda-voice-chat-dev.herokuapp.com/api/',
    // baseURL: 'http://localhost:3300/api/',
    timeout: 1000,
    responseType: 'json'
});
