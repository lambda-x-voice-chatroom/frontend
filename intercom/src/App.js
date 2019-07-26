import React, { useState, useEffect } from 'react';
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
import { SET_TOKEN, SET_USER, LOGOUT } from './store/constants';

import request from './utils/utils';

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
    const [localState, setLocalState] = useState(false);
    // const url = 'http://localhost:3300/api/auth';
    // const url = 'https://lambda-voice-chat-auth.herokuapp.com/api/auth';
    const url = 'https://lambda-voice-chat.herokuapp.com/api/auth';

    useEffect(() => {
        // firebase.auth().onAuthStateChanged(function(user) {
        let user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
            getUserToken();
            getUserData();
        } else {
            // No user is signed in.
            console.log('Not signed in!');
        }
        // });
    }, [dispatch, state.token]);

    const getUserToken = async () => {
        let idToken = await firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true);
        dispatch({ type: SET_TOKEN, payload: { token: idToken } });
    };
    const getUserData = async token => {
        const url = 'https://lambda-voice-chat.herokuapp.com/api/auth';
        try {
            if (state.token) {
                let response = await request.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: state.token
                    }
                });
                dispatch({ type: SET_USER, payload: response.data.data });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithPopup(provider);
            getUserToken();
            getUserData();
        } catch (err) {
            console.log(err);
        }
    };
    // handleLogout is not complete
    const handleLogout = async () => {
        setLocalState(true);
        try {
            await firebase.auth().signOut();

            dispatch({ type: LOGOUT, payload: '' });
            console.log('Signout success!');
            history.push('/');
        } catch (error) {
            console.log(error);
        }
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
