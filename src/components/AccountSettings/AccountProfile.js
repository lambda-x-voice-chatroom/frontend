import React, { Component, useState } from 'react';
import AccountUpdateForm from './AccountUpdateForm';

// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
// import {  } from './store/constants';

const AccountProfile = props => {
    const [state, dispatch] = useStateValue(globalContext);

    // componentDidMount() {
    //     window.$('[data-toggle="tooltipEmail"]').tooltip();
    // }

    // componentDidUpdate() {
    //     window.$('[data-toggle="tooltipEmail"]').tooltip();
    // }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4 acct-header acct-header-profile">
                    <h3>Profile</h3>
                </div>

                <div className="col-md-8">
                    <div className="row acct-row">
                        <div className="pull-left">
                            <strong>{state.user.displayName}</strong>
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
                        updateUser={props.handleUpdate}
                        toggleChangeName={props.toggleChangeName}
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
