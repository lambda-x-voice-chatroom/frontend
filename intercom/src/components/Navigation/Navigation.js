import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebaseConfig from './firebaseConfig';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { SET_USER } from '../../store/constants';

//firebase
let firebase = require('firebase/app');
require('firebase/auth');

firebase.initializeApp(firebaseConfig);
let provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();

const Navigation = () => {
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
        <nav className="navbar navbar-inverse navbar-fixed-top navbar-container">
            <div className="navbar-header">
                <button
                    type="button"
                    className="navbar-toggle navbar-loggedin"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <Link to={`/`} className="navbar-brand" id="navbar-logo">
                    <span className="navbar-logo-v">V</span>
                    <span className="navbar-logo-text">oice </span>
                    <i className="material-icons navbar-logo-icon">hearing</i>
                    <span className="navbar-logo-text">hatroom</span>
                </Link>
            </div>
            <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1">
                {/* {this.props.isAuthenticated() ? (
                    <ul className="nav navbar-nav navbar-right custom-menu">
                        <li>
                            <NavLink exact to={`/user/${this.props.id}`}>
                                My Groups
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                exact
                                to={`/user/${this.props.id}/account`}>
                                Account
                            </NavLink>
                        </li>
                        <li>
                            <Link to={`/`} onClick={this.props.logout}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                ) : ( */}
                <ul className="nav navbar-nav navbar-right custom-menu">
                    <li className="active">
                        <a href="#home">Home</a>
                    </li>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#services">Services</a>
                    </li>
                    <li>
                        <a href="#meet-team">Team</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                    <li>
                        <p onClick={handleLogin}>Login</p>
                    </li>
                    <li>
                        {/* <Link
                                to={`/authenticating`}
                                onClick={this.props.login}>
                                Sign Up
                            </Link> */}
                    </li>
                </ul>
                {/* )} */}
            </div>
        </nav>
    );
};

export default Navigation;
