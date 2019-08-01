import React, { useState } from 'react';
import axios from 'axios';
import AccountUpdateForm from './AccountUpdateForm';

// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { SET_USER } from '../../store/constants';
// import {  } from './store/constants';

const AccountProfile = props => {
    const [state, dispatch] = useStateValue(globalContext);
    const [localState, setLocalState] = useState({ displayName: '' });

    // componentDidMount() {
    //     window.$('[data-toggle="tooltipEmail"]').tooltip();
    // }

    // componentDidUpdate() {
    //     window.$('[data-toggle="tooltipEmail"]').tooltip();
    // }
    const handleChange = e => {
        e.preventDefault();
        setLocalState({ [e.target.name]: e.target.value });
    };
    const handleUpdate = async e => {
        e.preventDefault();
        try {
            let user = await axios.put(
                `https://lambda-voice-chat-dev.herokuapp.com/api/users`,
                localState,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: state.token
                    }
                }
            );
            dispatch({ type: SET_USER, payload: user.data.data });
            props.toggleChangeName();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4 acct-header acct-header-profile">
                    <h3>Profile</h3>
                </div>

                <div className="col-md-8">
                    <div className="row acct-row">
                        <div className="pull-left">
                            {state.user.firstName || state.user.lastName ? (
                                <strong>
                                    {state.user.firstName} {state.user.lastName}
                                </strong>
                            ) : (
                                <strong>{state.user.displayName}</strong>
                            )}
                        </div>
                        <div
                            className="pull-right color-elements update-link"
                            onClick={props.toggleChangeName}>
                            {props.updateUserName ? 'Cancel' : 'Change'}
                        </div>
                    </div>
                </div>

                {props.updateUserName ? (
                    <AccountUpdateForm
                        displayName={localState.displayName}
                        handleChange={handleChange}
                        handleUpdate={handleUpdate}
                    />
                ) : null}

                <div className="col-md-8">
                    <div className="row acct-row">
                        <div className="pull-left">{state.user.email}</div>
                        <div className="pull-right info-link">
                            <div
                                data-toggle="tooltipEmail"
                                data-placement="left"
                                title="Email address cannot be updated for verficiation and authentication purposes.">
                                <i className="fa fa-question-circle" /> Email
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="row acct-row">
                        <div className="pull-left">Profile Image</div>
                        <div
                            className="pull-right color-elements update-link"
                            onClick={props.toggleChangeImage}>
                            {props.updateUserImage ? 'Cancel' : 'Change'}
                        </div>
                    </div>
                </div>

                {props.updateUserImage ? (
                    <div className="col-md-8 fl-r">
                        <div className="row acct-row update-row">
                            <div className="pull-left">
                                <div className="input-group update-pic">
                                    <input
                                        className="form-control form-control-sm"
                                        type="file"
                                        style={{ verticalAlign: 'middle' }}
                                        onChange={props.fileSelectedHandler}
                                    />
                                    <span className="input-group-btn">
                                        <button
                                            className="btn btn-default"
                                            type="button"
                                            onClick={e =>
                                                props.fileUploadHandler(e)
                                            }
                                            disabled={
                                                props.selectedFile === ''
                                            }>
                                            Update
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AccountProfile;
