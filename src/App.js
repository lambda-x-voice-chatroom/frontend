import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
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

import history from './history';

// Firebase
import firebaseConfig from './firebaseConfig';
import 'firebase/performance';
import API from './utils/API';

let firebase = require('firebase/app');
require('firebase/auth');
firebase.initializeApp(firebaseConfig);
firebase.performance();
let provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();

const App = () => {
    const [state, dispatch] = useStateValue(globalContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                getUserToken();
                if (!state.user.id) {
                    getUserData();
                }
            } else {
                console.log('Not signed in!');
            }
        });
    }, [dispatch, state.token]);

    const getUserToken = async () => {
        let idToken = await firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true);
        dispatch({ type: SET_TOKEN, payload: { token: idToken } });
    };
    const getUserData = async () => {
        try {
            if (state.token) {
                let response = await API.get('/users', {
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

    const handleLogout = async () => {
        try {
            dispatch({ type: LOGOUT });
            await firebase.auth().signOut();
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
