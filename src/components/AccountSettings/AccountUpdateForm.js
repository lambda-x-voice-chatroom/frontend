import React, { Component } from 'react';
import host from '../../host.js';
import axios from 'axios';

/* .currency:before {
    z-index: 100;
    position: absolute;
     top: 10px;
    content: '$';
    content:"\f155";
    font-family: FontAwesome;
} */

/* .currency .fa-rocket {
    z-index: 100;
    color: #666;
    top: 10px;
    left: 5px;
    position: absolute;
} */

const AccountUpdateForm = props => {
    // handleNameInput = e => {
    //     e.preventDefault();
    //     this.setState({ [e.target.name]: e.target.value })
    // }

    // updateUser = async (e) => {
    //     const id = localStorage.getItem('userId');
    //     e.preventDefault();
    //     const userData = {
    //         displayName: this.state.displayName,
    //     }
    //     try {
    //         const res = await axios.put(`${host}/api/users/${id}`, userData)
    //         this.setState({
    //             displayName: res.data.displayName
    //         })
    //         this.props.toggleChangeName();
    //     } catch (err) {
    //         console.log(err);
    //     };

    //     this.props.updateUser();
    // };

    return (
        <>
            <div className="col-md-8">
                <div className="row acct-row update-row">
                    <div className="pull-left">
                        <form
                            onSubmit={props.handleUpdate}
                            className="input-group searchbar">
                            <input
                                autoComplete="off"
                                className="form-control searchbar form-control-sm"
                                type="text"
                                name="displayName"
                                placeholder=" New display name..."
                                maxLength="20"
                                onChange={e => props.handleChange(e)}
                                value={props.displayName}
                            />
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-default"
                                    type="button"
                                    onClick={props.handleUpdate}
                                    disabled={props.value === ''}>
                                    Update
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountUpdateForm;
