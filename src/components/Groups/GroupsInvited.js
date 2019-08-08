import React, { useState } from 'react';
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts.js';

const GroupsInvited = props => {
    const [state, dispatch] = useStateValue(globalContext);
    const [localState, setLocalState] = useState({ display: true });

    const toggleDisplay = () => {
        setLocalState(prevState => ({
            display: !prevState.display
        }));
    };

    // const acceptInvite = (event, groupId) => {
    //     event.preventDefault();
    //     const userId = { userId: localStorage.getItem('userId') };
    //     const activity = {
    //         userId: localStorage.getItem('userId'),
    //         activity: 'Joined group.'
    //     };

    //     // add the user to the groupMembers table first
    //     axios
    //         .post(`${host}/api/groups/${groupId}/groupMembers`, userId)
    //         .then(() => {
    //             // if user added, delete the user from groupInvitees table
    //             axios
    //                 .delete(
    //                     `${host}/api/groups/${groupId}/groupInvitees/${
    //                         userId.userId
    //                     }`
    //                 )
    //                 .then(() => {
    //                     // add the activity to the group's log;
    //                     axios
    //                         .post(
    //                             `${host}/api/groups/${groupId}/activities`,
    //                             activity
    //                         )
    //                         .then(() => this.props.getUserDetailed())
    //                         .catch(() => this.props.getUserDetailed());
    //                 })
    //                 .catch(() => this.props.getUserDetailed());
    //         })
    //         .catch(() => this.props.getUserDetailed());

    //     // Any error will prompt parent view to try to re-update user if error there it will throw error
    // };

    // const declineInvite = (event, groupId) => {
    //     event.preventDefault();
    //     const userId = { userId: localStorage.getItem('userId') };
    //     const activity = {
    //         userId: localStorage.getItem('userId'),
    //         activity: 'Declined to join to group.'
    //     };

    //     // delete the user from groupInvitees first
    //     axios
    //         .delete(
    //             `${host}/api/groups/${groupId}/groupInvitees/${userId.userId}`
    //         )
    //         .then(() => {
    //             // if delete worked then post to group's activities and update groups even if error in posting
    //             axios
    //                 .post(`${host}/api/groups/${groupId}/activities`, activity)
    //                 .then(() => props.getUserDetailed())
    //                 .catch(() => props.getUserDetailed());
    //         })
    //         .catch(() => this.props.getUserDetailed());

    //     // Any error will prompt parent view to try to re-update user if error there it will throw error
    // };

    return (
        <>
            <h1 className="page-header sidebar-title groups-title">
                Groups Invited To
                <span data-toggle="collapse" data-target="#groups-invited">
                    {localState.display ? (
                        <i
                            className="fa fa-angle-up pull-right"
                            style={{ fontSize: '1.2em' }}
                            onClick={toggleDisplay}
                        />
                    ) : (
                        <i
                            className="fa fa-angle-down pull-right"
                            style={{ fontSize: '1.2em' }}
                            onClick={toggleDisplay}
                        />
                    )}
                </span>
            </h1>

            <div className="collapse in" id="groups-invited">
                {state.groupsInvited.length === 0 ? (
                    <p className="no-groups">
                        You have no invites at this time.
                    </p>
                ) : (
                    <>
                        {state.groupsInvited.map(group => (
                            <div key={group.id} className="groups-row">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <h3
                                            className="blog-title"
                                            style={{ marginBottom: '0px' }}>
                                            {group.name}
                                        </h3>
                                    </div>

                                    <div
                                        className="col-xs-12 col-sm-7 col-md-7 col-lg-7"
                                        style={{ padding: '8px 15px' }}>
                                        {`Invited By ${group.owner}`}
                                    </div>
                                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                                        <button
                                            className="btn btn-join"
                                            type="button"
                                            // onClick={e =>
                                            //     acceptInvite(e, group.id)}
                                        >
                                            Join Group
                                        </button>
                                        <span className="comments-padding" />
                                        <button
                                            className="btn btn-decline"
                                            type="button"
                                            // onClick={e =>
                                            //     declineInvite(e, group.id)}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                                <hr style={{ marginBottom: '0px' }} />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default GroupsInvited;
