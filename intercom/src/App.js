import React from 'react';
import { Router, Route } from 'react-router-dom';
import axios from 'axios';
import AddToBalance from './components/Billing/AddToBalance';
import GroupMembersView from './components/GroupMembers/GroupMembersView';
import AccountSettings from './components/AccountSettings/AccountSettings';
import GroupChatroomView from './components/GroupChatroom/GroupChatroomView';
import LandingPageView from './components/LandingPage/LandingPageView';
import Navigation from './components/Navigation/Navigation';
import User from './components/User/User';

// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from './store/contexts';
import { SET_TOKEN } from './store/constants';

import history from './history';

// Firebase
import firebaseConfig from './firebaseConfig';
let firebase = require('firebase/app');
require('firebase/auth');
firebase.initializeApp(firebaseConfig);
let provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();

const App = () => {
    const [state, dispatch] = useStateValue(globalContext);

    const handleLogin = async () => {
        try {
            let result = await firebase.auth().signInWithPopup(provider);
            let idToken = await firebase
                .auth()
                .currentUser.getIdToken(/* forceRefresh */ true);
            console.log(result);
            console.log(idToken);
            // let user = result.user;

            dispatch({ type: SET_TOKEN, payload: { token: idToken } });

            // let data = JSON.stringify({
            //     displayName: user.displayName,
            //     email: user.email,
            //     avatar: user.photoURL
            // });

            // const url = 'http://localhost:3300/api/auth';
            const url = 'https://lambda-voice-chat-auth.herokuapp.com/api/auth';
            // const url = 'https://lambda-voice-chat.herokuapp.com/api/auth';
            await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: idToken
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        firebase
            .auth()
            .signOut()
            .then(function() {
                // Sign-out successful.
                let userProfile = {
                    uid: '',
                    email: '',
                    photo: '',
                    name: ''
                };
                dispatch({ type: SET_TOKEN, payload: userProfile });
                // history.push('/');
                console.log('Signout success!');
            })
            .catch(function(error) {
                // An error happened.
                console.error('Signout Error', error);
            });
    };

    return (
        <Router history={history} component={App}>
            <Route
                path="/"
                render={props => (
                    <Navigation
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                        {...props}
                    />
                )}
            />
            <Route exact path="/" component={LandingPageView} />
            <Route exact path="/user/" component={User} />
            <Route exact path="/user/account" component={AccountSettings} />
            <Route exact path="/group/:id" component={GroupChatroomView} />
            <Route
                exact
                path="/group/:id/members"
                component={GroupMembersView}
            />
            <Route exact path="/user/:id/billing" component={AddToBalance} />
        </Router>
    );
};

export default App;
