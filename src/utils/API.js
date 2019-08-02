// utils/API.js

import axios from 'axios';

export default axios.create({
    baseURL: 'https://lambda-voice-chat-dev.herokuapp.com/api/',
    timeout: 1000,
    responseType: 'json'
});
