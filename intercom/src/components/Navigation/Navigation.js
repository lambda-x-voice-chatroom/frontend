import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';

const Navigation = props => {
    const [state, dispatch] = useStateValue(globalContext);

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
                {state.token ? (
                    <ul className="nav navbar-nav navbar-right custom-menu">
                        <li>
                            <NavLink exact to={`/user`}>
                                My Groups
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to={`/user/account`}>
                                Account
                            </NavLink>
                        </li>
                        <li>
                            <Link to={`/`} onClick={props.logout}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                ) : (
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
                            {state.token ? (
                                <a href="#logout" onClick={props.handleLogout}>
                                    Logout
                                </a>
                            ) : (
                                <a href="#login" onClick={props.handleLogin}>
                                    Login
                                </a>
                            )}
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
