import React, { useState, useEffect } from 'react';
import GroupForm from '../Groups/GroupForm';
import GroupsBelonged from '../Groups/GroupsBelonged';
import GroupsInvited from '../Groups/GroupsInvited';
import GroupsOwned from '../Groups/GroupsOwned';
import RecentActivity from '../RecentActivity/RecentActivity';
import Footer from '../LandingPage/Footer';

// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { SET_GROUPS } from '../../store/constants';
import API from '../../utils/API';

const User = () => {
    const [state, dispatch] = useStateValue(globalContext);
    const [localState, setLocalState] = useState({
        user: {},
        groupsOwned: [],
        groupsBelongedTo: [],
        groupsInvitedTo: [],
        recentActivities: [],
        unAuth: false,
        error: false
    });

    useEffect(() => {
        if (state.token) {
            getGroups();
        }
    }, [state.token]);

    const getGroups = async () => {
        let response = await API.get('/groups', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: state.token
            }
        });
        dispatch({ type: SET_GROUPS, payload: response.data.data });
    };

    // state = {
    //     user: {},
    //     groupsOwned: [],
    //     groupsBelongedTo: [],
    //     groupsInvitedTo: [],
    //     recentActivities: [],
    //     unAuth: false,
    //     error: false,
    // }

    // interval = 0

    // componentDidMount() {
    //     this.checkIfUnAuth()
    //     this.getUserDetailed();
    //     // Get User Data when component mounts and every 5 seconds while on page
    //     this.interval = setInterval(() => this.getUserDetailed(), 5000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    // const checkIfUnAuth = () => {
    //     const userId = parseInt(localStorage.getItem('userId'));
    //     const paramsId = parseInt(props.match.params.id);
    //     if (userId !== paramsId) {
    //         setLocalState({ unAuth: true });
    //     }
    // };

    // const getUserDetailed = () => {
    //     const id = localStorage.getItem('userId');
    //     const userEndpoint = `${host}/api/users/${id}/detailed`;
    //     axios
    //         .get(userEndpoint)
    //         .then(res => {
    //             setLocalState({ user: res.data });
    //             getGroupsOwned(res.data);
    //             getGroupsBelongedTo(res.data);
    //             getGroupsInvitedTo(res.data);
    //             getRecentActivity(res.data);
    //         })
    //         .catch(err => {
    //             setLocalState({
    //                 error: {
    //                     code: err.response.status,
    //                     message: err.response.statusText
    //                 },
    //                 user: {},
    //                 groupsOwned: [],
    //                 groupsBelongedTo: [],
    //                 groupsInvitedTo: [],
    //                 recentActivities: [],
    //                 unAuth: false
    //             });
    //         });
    // };

    // const getGroupsOwned = user => {
    //     // Sort groups owned by when the ownership was created
    //     let groupsOwned = [...user.groupsOwned].sort(
    //         (a, b) =>
    //             new Date(a.ownershipCreatedAt) - new Date(b.ownershipCreatedAt)
    //     );
    //     setLocalState({ groupsOwned });
    // };

    // const getGroupsBelongedTo = user => {
    //     // Filter out groups owned
    //     const groupsOwnedIds = user.groupsOwned.map(group => group.groupId);
    //     const groupsNotOwned = user.groupsBelongedTo.filter(
    //         group => !groupsOwnedIds.includes(group.groupId)
    //     );

    //     // Sort groups belonged to by when the membership was created
    //     const groupsBelongedTo = [...groupsNotOwned].sort(
    //         (a, b) =>
    //             new Date(a.membershipCreatedAt) -
    //             new Date(b.membershipCreatedAt)
    //     );
    //     setLocalState({ groupsBelongedTo });
    // };

    // const getGroupsInvitedTo = user => {
    //     // Filter out groups belonged to
    //     const groupsBelongedToIds = user.groupsBelongedTo.map(
    //         group => group.groupId
    //     );
    //     const groupsNotBelongedTo = user.groupsInvitedTo.filter(
    //         group => !groupsBelongedToIds.includes(group.groupId)
    //     );

    //     // Sort groups belonged to by when the invitation was created
    //     const groupsInvitedTo = [...groupsNotBelongedTo].sort(
    //         (a, b) => new Date(a.inviteCreatedAt) - new Date(b.inviteCreatedAt)
    //     );
    //     setLocalState({ groupsInvitedTo });
    // };

    // const getRecentActivity = user => {
    //     let activities = [];
    //     // Collect every activity from each group and add group info to activities
    //     user.groupsOwned.forEach(group =>
    //         group.activities.forEach(activity =>
    //             activities.push({
    //                 ...activity,
    //                 groupId: group.groupId,
    //                 groupName: group.groupName
    //             })
    //         )
    //     );
    //     user.groupsBelongedTo.forEach(group =>
    //         group.activities.forEach(activity =>
    //             activities.push({
    //                 ...activity,
    //                 groupId: group.groupId,
    //                 groupName: group.groupName
    //             })
    //         )
    //     );
    //     user.groupsInvitedTo.forEach(group =>
    //         group.activities.forEach(activity =>
    //             activities.push({
    //                 ...activity,
    //                 groupId: group.groupId,
    //                 groupName: group.groupName
    //             })
    //         )
    //     );

    //     // Filter out duplicates
    //     const filteredActivities = activities.filter(
    //         (activity, index, self) =>
    //             index ===
    //             self.findIndex(i => i.activityId === activity.activityId)
    //     );

    //     // Sort Activities by latest activity first
    //     filteredActivities.sort(
    //         (a, b) =>
    //             new Date(b.activityCreatedAt) - new Date(a.activityCreatedAt)
    //     );

    //     // Take latest 5 actvities
    //     const recentActivities = filteredActivities.slice(0, 5);
    //     setLocalState({ recentActivities });
    // };

    // const getDateTime = date => {
    //     const today = new Date().toLocaleDateString(undefined, {
    //         day: 'numeric',
    //         month: 'short',
    //         year: 'numeric'
    //     });
    //     const dateStr = new Date(date).toLocaleDateString(undefined, {
    //         day: 'numeric',
    //         month: 'short',
    //         year: 'numeric'
    //     });
    //     const todayYear = new Date().toLocaleDateString(undefined, {
    //         year: 'numeric'
    //     });
    //     const dateStrYear = new Date(date).toLocaleDateString(undefined, {
    //         year: 'numeric'
    //     });

    //     if (dateStr === today) {
    //         // if activity happened today, return time
    //         return new Date(date).toLocaleTimeString(undefined, {
    //             hour: '2-digit',
    //             minute: '2-digit'
    //         });
    //     } else if (todayYear === dateStrYear) {
    //         // if activity happened this year, return month and day
    //         return new Date(date).toLocaleDateString(undefined, {
    //             day: 'numeric',
    //             month: 'short'
    //         });
    //     } else {
    //         // if activity happened before this year, return month day and year
    //         return dateStr;
    //     }
    // };

    // render() {
    let {
        groupsOwned,
        groupsBelongedTo,
        groupsInvitedTo,
        recentActivities
    } = localState;
    const avatar = state.user.avatar || require('../../images/avatar1.png');
    return (
        <>
            <section className="container blog page-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-icon-flex">
                            <img
                                className="avatar-img-users"
                                src={avatar}
                                alt="user avatar"
                            />
                            <h2>Welcome {state.user.displayName}!</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <GroupsOwned groupsOwned={groupsOwned} />
                        <GroupsBelonged groupsBelonged={groupsBelongedTo} />
                        <GroupsInvited
                            groupsInvited={groupsInvitedTo}
                            // getUserDetailed={getUserDetailed}
                        />
                    </div>

                    <aside className="col-md-4 sidebar-padding">
                        <GroupForm
                        // updateGroups={getUserDetailed}
                        />
                        <RecentActivity
                            recentActivities={recentActivities}
                            // getDateTime={getDateTime}
                        />
                    </aside>
                </div>
            </section>

            <Footer />
        </>
        // }</>
        // }</>
    );
    // }
};

export default User;
