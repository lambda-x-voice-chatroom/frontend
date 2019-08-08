import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import host from '../../host';

// import UnAuth from '../UnAuth/UnAuth';
import Error from '../Error/Error';
import GroupChatroomActivities from './GroupChatroomActivities';
import GroupChatroomCall from './GroupChatroomCall';
import DeleteModal from '../Modal/DeleteModal';
import Footer from '../LandingPage/Footer';
import API from '../../utils/API';

// State Mangement
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { SET_CURRENT_GROUP } from '../../store/constants';
// import GroupMembersView from '../GroupMembers/GroupMembersView';

const GroupChatroomView = props => {
    const [state, dispatch] = useStateValue(globalContext);
    const [localState, setLocalState] = useState({
        userId: localStorage.getItem('userId'),
        user: {},
        group: {},
        groupName: '',
        isOwner: false,
        unAuth: false,
        error: false
    });
    useEffect(() => {
        if (!state.token) {
            props.auth();
        }
        if (!state.currentGroup && state.token) {
            getGroup(props.match.params.id);
        }
    }, [state.token]);

    // checkIfUnAuth = () => {
    //     const groupId = parseInt(this.state.groupId)
    //     const userId = localStorage.getItem('userId')
    //     axios
    //         .get(`${host}/api/users/${userId}/groupsBelongedTo`)
    //         .then(res => {
    //             const groupIds = res.data.map(group => group.groupId)
    //             if (!groupIds.includes(groupId)){
    //                 this.setState({ unAuth: true })
    //             }
    //         })
    //         .catch(err => {
    //             this.setState({ error: {code: err.response.status, message: err.response.statusText} })
    //         });
    // }

    // getUser = id => {
    //     axios
    //         .get(`${host}/api/users/${id}`)
    //         .then(res => this.setState({ user: res.data }))
    //         .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    // }

    const getGroup = async id => {
        let group = await API.get(`/groups/${props.match.params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: state.token
            }
        });
        dispatch({ type: SET_CURRENT_GROUP, payload: group.data.data });
        // axios
        //     .get(`${host}/api/groups/${id}`)
        //     .then(res => this.setState({ group: res.data }))
        //     .catch(err =>
        //         this.setState({
        //             error: {
        //                 code: err.response.status,
        //                 message: err.response.statusText
        //             }
        //         })
        //     );
    };

    // updateGroup = changes => {
    //     const id = this.state.groupId;
    //     const originalGroupName = this.state.group.name;
    //     // First Update Group
    //     axios
    //         .put(`${host}/api/groups/${id}`, changes)
    //         .then(res => {
    //             // Update Group state and Add to activities
    //             this.setState({ group: res.data })
    //             const activity = { userId: this.state.userId, activity: `Updated group name from ${originalGroupName} to ${res.data.name}.` }
    //             axios
    //                 .post(`${host}/api/groups/${id}/activities`, activity)
    //                 .then(res => this.setState({ activities: res.data }))
    //                 .catch(() => this.getActivities()) // If error posting get original activities
    //         })
    //         // If error updating still want to try and get original group information
    //         .catch(() => this.getGroup(id))
    // }

    // deleteGroup = () => {
    //     const groupId = this.state.groupId;
    //     const userId = this.state.userId;
    //     // First get any active call participants
    //     axios
    //     .get(`${host}/api/groups/${groupId}/callParticipants`)
    //     .then(res => {
    //         // If no active participants go right to delete
    //         if (res.data.length === 0) {
    //             axios
    //             .delete(`${host}/api/groups/${groupId}`)
    //             .then(() => this.props.history.push(`/user/${userId}`) ) // Go back to user main view
    //             .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    //         } else {
    //             // If call participants, update user's call status to false
    //             let updatedCallParticipants = 0;
    //             res.data.forEach( user => {
    //                 axios
    //                 .put(`${host}/api/users/${user.userId}`, { callStatus: false })
    //                 .then(() => {
    //                     updatedCallParticipants++
    //                     // Once all participants updated, then delete group
    //                     if (updatedCallParticipants === res.data.length) {
    //                         axios
    //                         .delete(`${host}/api/groups/${groupId}`)
    //                         .then(() => this.props.history.push(`/user/${userId}`) ) // Go back to user main view
    //                         .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    //                     }
    //                 })
    //                 .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    //             })
    //         }
    //     })
    //     .catch(() => this.getGroup())
    // }

    // leaveGroup = () => {
    //     const groupId = this.state.groupId;
    //     const userId = this.state.userId;
    //     // First delete member and throw error if not able
    //     axios
    //     .delete(`${host}/api/groups/${groupId}/groupMembers/${userId}`)
    //     // If deleted update group activities in db
    //     .then(() => {
    //         const activity = { userId: userId, activity: `Left group.` }
    //         axios
    //         .post(`${host}/api/groups/${groupId}/activities`, activity)
    //         .then(() => this.props.history.push(`/user/${userId}`)) // once activity db updated send user back to main page
    //         .catch(() => this.getActivities()) // If error posting get origin activities
    //     })
    //     .catch(err => this.setState({ error: {code: err.response.status, message: err.response.statusText} }))
    // }

    // checkIfOwner = id => {
    //     const userId = parseInt(localStorage.getItem('userId'));
    //     axios
    //         .get(`${host}/api/groups/${id}/groupOwners`)
    //         .then(res => {
    //             res.data[0].userId === userId
    //             ? this.setState({ isOwner: true })
    //             : this.setState({ isOwner: false })
    //         })
    //         .catch(() => this.setState({ isOwner: false }))
    // }

    const handleInputChange = e => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.name]: e.target.value });
    };

    // const handleGroupUpdate = e => {
    //     e.preventDefault();
    //     // updateGroup({ name: localState.groupName });
    //     setLocalState({ ...localState, groupName: '' });
    // };

    let {
        // unAuth,
        user,
        // group,
        groupId,
        groupName,
        isOwner,
        error
    } = localState;

    return (
        <>
            {!state.currentGroup ? (
                <Error error={error} />
            ) : (
                <>
                    <section className="container blog page-container">
                        <div className="row">
                            <div className="col-md-12 page-header-flex">
                                <div className="page-icon-flex">
                                    <i className="fa fa-users fa-4x" />
                                    <h2>{state.currentGroup.group.name}</h2>
                                </div>
                                <Link
                                    to={`/group/${
                                        props.match.params.id
                                    }/members`}
                                    className="blog-title"
                                    style={{
                                        textDecoration: 'underline'
                                    }}>
                                    <h4>
                                        {isOwner
                                            ? 'Manage Members'
                                            : 'View Members'}
                                    </h4>
                                </Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <GroupChatroomCall
                                    groupId={props.match.params.id}
                                />
                                <GroupChatroomActivities
                                    groupId={props.match.params.id}
                                />
                            </div>

                            <aside className="col-md-4 sidebar-padding">
                                <div className="blog-sidebar">
                                    <h3 className="sidebar-title">
                                        Group Settings
                                    </h3>
                                    <hr />
                                    {isOwner ? (
                                        <>
                                            <h4 className="sidebar-title">
                                                Update Group Name:{' '}
                                            </h4>
                                            <div className="input-group">
                                                <input
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    id="groupName"
                                                    name="groupName"
                                                    maxLength="20"
                                                    value={localState.groupName}
                                                    placeholder="New Name..."
                                                />
                                                <span className="input-group-btn">
                                                    {groupName === '' ? (
                                                        <button
                                                            className="btn btn-default"
                                                            type="button"
                                                            disabled>
                                                            Update
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-default"
                                                            type="button"
                                                            // onClick={
                                                            //     handleGroupUpdate}
                                                        >
                                                            Update
                                                        </button>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="btn-delete-margin">
                                                <DeleteModal
                                                    deleteMessage={
                                                        'Confirm your email'
                                                    }
                                                    target={groupId}
                                                    targetName={user.email}
                                                    // handleTarget={deleteGroup}
                                                    type={'Delete Group'}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <DeleteModal
                                                deleteMessage={
                                                    'Confirm the email'
                                                }
                                                target={groupId}
                                                targetName={user.email}
                                                // handleTarget={leaveGroup}
                                                type={'Leave Group'}
                                            />
                                        </>
                                    )}
                                </div>
                            </aside>
                        </div>
                    </section>

                    <Footer />
                </>
            )}
        </>
    );
};

export default GroupChatroomView;
