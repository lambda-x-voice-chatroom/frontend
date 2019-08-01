import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import host from '../../host.js';

import UnAuth from '../UnAuth/UnAuth';
import AccountProfile from './AccountProfile';
import Account from './Account';
import AccountPlanDetails from './AccountPlanDetails';
import AccountBilling from './AccountBilling';
import Footer from '../LandingPage/Footer';

// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
// import {  } from './store/constants';

import history from '../../history';

const AccountSettings = () => {
    const [state, dispatch] = useStateValue(globalContext);

    const [localState, setLocalState] = useState({
        updateUserName: false,
        updateUserImage: false,
        updateBilling: false,
        last4: 1234,
        selectedFile: '',
        addToBalance: false,
        accountBalance: 0,
        unAuth: false
    });

    const fileSelectedHandler = e => {
        setLocalState({
            selectedFile: e.target.files[0]
        });
    };

    const fileUploadHandler = async e => {
        const id = localStorage.getItem('userId');
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', state.selectedFile);
        toggleChangeImage();
        try {
            const res = await axios.post(`${host}/api/upload`, formData);
            if (res.status === 200) {
                const userData = {
                    avatar: res.data.image
                };
                axios
                    .put(`${host}/api/users/${id}`, userData)
                    .then(res => {
                        setLocalState({ user: res.data, selectedFile: '' });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const toggleChangeImage = () => {
        setLocalState(prevState => ({
            updateUserImage: !prevState.updateUserImage
        }));
    };

    const toggleChangeName = () => {
        setLocalState(prevState => ({
            updateUserName: !prevState.updateUserName
        }));
    };

    const toggleChangeBilling = () => {
        setLocalState(prevState => ({
            updateBilling: !prevState.updateBilling
        }));
    };

    const toggleChangeAddToBalance = () => {
        setLocalState(prevState => ({
            addToBalance: !prevState.addToBalance
        }));
    };

    // const handleUpdate = () => {
    //     const id = state.user.id;
    //     axios
    //         .get(`${host}/api/users/${id}`)
    //         .then(res => setState({ user: res.data }))
    //         .catch(err => console.log(err));
    // };

    // const handleBillingUpdate = () => {
    //     const id = state.user.id;
    //     axios
    //         .get(`${host}/api/users/${id}/last4`)
    //         .then(res => setState({ last4: res.data.last4 }))
    //         .catch(err => console.log(err));
    // };
    // const handleAddToBalance = () => {
    //     const id = state.user.id;
    //     axios
    //         .get(`${host}/api/users/${id}/accountBalance`)
    //         .then(res => setState({ accountBalance: res.data.accountBalance }))
    //         .catch(err => console.log(err));
    // };

    // const handleDelete = () => {
    //     // First delete Groups Owned if any, then delete user
    //     const userId = localStorage.getItem('userId');
    //     axios
    //         .get(`${host}/api/users/${userId}/groupsOwned`)
    //         .then(res => {
    //             if (res.data.length === 0) {
    //                 deleteAccount();
    //             } else {
    //                 const originalGroups = res.data.length;
    //                 let updatedGroups = 0;
    //                 res.data.forEach(group => {
    //                     axios
    //                         .delete(`${host}/api/groups/${group.groupId}`)
    //                         .then(() => {
    //                             updatedGroups++;
    //                             if (updatedGroups === originalGroups) {
    //                                 deleteAccount();
    //                             }
    //                         })
    //                         .catch(err => console.log(err));
    //                 });
    //             }
    //         })
    //         .catch(err => console.error(err));
    // };

    // const deleteAccount = () => {
    //     axios
    //         .delete(`https://lambda-voice-chat-dev.herokuapp.com/api/users/`)
    //         .then(() => props.auth.logout())
    //         .catch(err => console.log(err.response));
    // };

    // getSumOfGroupTwilioCharges = async(groupId) => {
    //     try {
    //         // console.log("groupId: ", groupId);
    //         const groupTwilioChargesRes = await axios.post(`${host}/api/billing/groupTwilioCharges`, {'groupId':groupId});
    //         // console.log("groupTwilioChargesRes: ", groupTwilioChargesRes);

    //         const sumOfGroupTwilioCharges = groupTwilioChargesRes.data.sumOfGroupTwilioCharges;
    //         // console.log("sumOfGroupTwilioCharges: ", sumOfGroupTwilioCharges);

    //         return sumOfGroupTwilioCharges
    //     } catch(err) {
    //       console.log(err)
    //     }
    // }

    // getSumOfUserTwilioCharges = async() => {
    //     const id = this.state.user.id
    //     try {
    //         const userOwnedGroupsRes = await axios.get(`${host}/api/users/${id}/groupsOwned`);
    //         const userOwnedGroups = userOwnedGroupsRes.data
    //         // console.log("userOwnedGroups: ", userOwnedGroups);

    //         const userOwnedGroupsIds = userOwnedGroups.map(group => {
    //             return group.groupId
    //         })
    //         // console.log("userOwnedGroupsIds: ", userOwnedGroupsIds);

    //         let sumOfUserTwilioCharges = 0;

    //         for (let i = 0; i < userOwnedGroupsIds.length;i++) {
    //             sumOfUserTwilioCharges += await this.getSumOfGroupTwilioCharges(userOwnedGroupsIds[i]);
    //         }
    //         // console.log("sumOfUserTwilioCharges (exact): ", sumOfUserTwilioCharges);
    //         sumOfUserTwilioCharges = Math.round(sumOfUserTwilioCharges*100)/100;
    //         // console.log("sumOfUserTwilioCharges (rounded): ", sumOfUserTwilioCharges);
    //         return sumOfUserTwilioCharges

    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    // getSumOfUserStripeCharges = async() => {
    //     const id = this.state.user.id
    //     try {
    //         const userRes= await axios.get(`${host}/api/users/${id}`);
    //         // const user = userRes.data;
    //         const userStripeId = userRes.data.stripeId;
    //         // console.log('stripeId: ', stripeId);

    //         const userStripeChargesRes = await axios.post(`${host}/api/billing/userStripeCharges`, {'userStripeId': userStripeId});
    //         // console.log('userStripeChargesRes: ' , userStripeChargesRes);
    //         let sumOfUserStripeCharges = userStripeChargesRes.data.sumOfUserStripeCharges; // in dollars
    //         // console.log('sumOfUserStripeCharges [dollars]: ', sumOfUserStripeCharges); //in dollars
    //         return sumOfUserStripeCharges

    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    // getAllTwilioCharges = async() => {
    //     try {
    //         const allTwilioChargesRes = await axios.get(`${host}/api/billing/allTwilioCharges`);
    //         let allTwilioCharges = allTwilioChargesRes.data.allTwilioCharges;
    //         console.log('allTwilioCharges: ', allTwilioChargesRes);
    //     } catch(err) {
    //         console.log('err: ', err)
    //     }
    // }

    // updateUserAccountBalance = async() => {
    //     const id = this.state.user.id
    //     try{
    //         const sumOfUserStripeCharges = await this.getSumOfUserStripeCharges();
    //         // console.log('sumOfUserStripeCharges [dollars]: ', sumOfUserStripeCharges);

    //         const sumOfUserTwilioCharges = await this.getSumOfUserTwilioCharges();
    //         // console.log('sumOfUserTwilioCharges: ', sumOfUserTwilioCharges);

    //         const updatedAccountBalance = sumOfUserTwilioCharges + sumOfUserStripeCharges;
    //         // console.log('updatedAccountBalance: ', updatedAccountBalance);

    //         await axios.put(`${host}/api/users/${id}/accountBalance`,{accountBalance:updatedAccountBalance});
    //         this.setState({'accountBalance':updatedAccountBalance});
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    // render() {

    const {
        unAuth,
        user,
        updateUserName,
        updateBilling,
        addToBalance,
        accountBalance,
        last4,
        updateUserImage
    } = localState;

    return (
        <>
            <div className="container blog page-container">
                <div className="row">
                    <div className="col-md-offset-1 col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="page-icon-flex">
                                    <img
                                        className="avatar-img-users"
                                        src={
                                            state.user.avatar ||
                                            require('../../images/avatar1.png')
                                        }
                                        alt="user avatar"
                                    />
                                    <h2>Account</h2>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <AccountProfile
                            // user={user}
                            updateUserName={updateUserName}
                            toggleChangeName={toggleChangeName}
                            toggleChangeImage={toggleChangeImage}
                            // handleUpdate={handleUpdate}
                            updateUserImage={updateUserImage}
                            fileSelectedHandler={fileSelectedHandler}
                            fileUploadHandler={fileUploadHandler}
                            selectedFile={state.selectedFile}
                        />
                        <hr />
                        <AccountPlanDetails />
                        <hr />
                        <AccountBilling
                            accountBalance={accountBalance}
                            addToBalance={addToBalance}
                            updateBilling={updateBilling}
                            last4={last4}
                            toggleChangeAddToBalance={toggleChangeAddToBalance}
                            toggleChangeBilling={toggleChangeBilling}
                            // handleAddToBalance={handleAddToBalance}
                            // handleBillingUpdate={handleBillingUpdate}
                            // updateUserAccountBalance={updateUserAccountBalance}
                            // getSumOfUserTwilioCharges={getSumOfUserTwilioCharges}
                            // getSumOfUserStripeCharges={getSumOfUserStripeCharges}
                            // getAllTwilioCharges= {getAllTwilioCharges}
                        />

                        <hr />
                        <Account
                        // user={user}
                        // handleTarget={handleDelete}
                        />

                        <hr />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AccountSettings;
