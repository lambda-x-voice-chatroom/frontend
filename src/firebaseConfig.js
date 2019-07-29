require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FBASE_APIKEY,
    authDomain: 'voicechatroom-1874e.firebaseapp.com',
    databaseURL: 'https://voicechatroom-1874e.firebaseio.com',
    projectId: 'voicechatroom-1874e',
    storageBucket: 'voicechatroom-1874e.appspot.com',
    messagingSenderId: '656800191394',
    appId: '1:656800191394:web:24dbeca9410cb921'
};
module.exports = firebaseConfig;
