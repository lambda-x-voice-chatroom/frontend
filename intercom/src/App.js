import React from 'react';
import { Router, Route } from 'react-router-dom';
import AddToBalance from './components/Billing/AddToBalance';
import GroupMembersView from './components/GroupMembers/GroupMembersView';
import AccountSettings from './components/AccountSettings/AccountSettings';
import GroupChatroomView from './components/GroupChatroom/GroupChatroomView';
import LandingPageView from './components/LandingPage/LandingPageView';
import Navigation from './components/Navigation/Navigation';
import User from './components/User/User';

// State Management
import { StateProvider } from 'react-conflux';
import { useStateValue } from 'react-conflux';
import { globalReducer } from './store/reducers/globalReducer';
import { globalContext } from './store/contexts';
import { SET_USER } from './store/constants';

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

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                let token = result.user.getIdToken();
                console.log(token);
                dispatch({ type: SET_USER, payload: { token: token } });
                // dispatch to store to save the token for later use
                return token;
            })
            .then(token => {
                // Need to get data from database with this fetch/axios call
                const url = 'http://localhost:3300';
                fetch(url, {
                    method: 'GET', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                        application: token
                    }
                })
                    .then(response =>
                        // Once fetch is done store the data via dispatch to the store
                        // dispatch({ type: SET_USER, payload: userProfile });
                        console.log('Success:', JSON.stringify(response))
                    )
                    .catch(error => console.error('Error:', error));
            })
            .catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;
                // ...
            });
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
                dispatch({ type: SET_USER, payload: userProfile });
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
            <>
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
                <Route exact path="/user/:id" component={User} />
                <Route
                    exact
                    path="/user/:id/account"
                    component={AccountSettings}
                />
                <Route exact path="/group/:id" component={GroupChatroomView} />
                <Route
                    exact
                    path="/group/:id/members"
                    component={GroupMembersView}
                />
                <Route
                    exact
                    path="/user/:id/billing"
                    component={AddToBalance}
                />
            </>
        </Router>
    );
};

export default App;
