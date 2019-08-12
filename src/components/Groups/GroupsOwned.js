import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';

// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';

const GroupsOwned = () => {
    const [state] = useStateValue(globalContext);
    const [localState, setLocalState] = useState({ display: true });

    const toggleDisplay = () => {
        setLocalState(prevState => ({
            display: !prevState.display
        }));
    };

    return (
        <>
            <h1 className="page-header sidebar-title groups-title">
                Groups Owned
                <span data-toggle="collapse" data-target="#groups-owned">
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

            <div className="collapse in" id="groups-owned">
                {state.groupsOwned.length === 0 ? (
                    <p className="no-groups">
                        You do not own any groups at this time.
                    </p>
                ) : (
                    <>
                        {state.groupsOwned.map(group => (
                            <div key={group.id} className="groups-row">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Link to={`/group/${group.id}`}>
                                            <h3 className="blog-title">
                                                {group.name}
                                            </h3>
                                        </Link>
                                    </div>

                                    <div
                                        className="col-xs-12 col-sm-9 col-md-9 col-lg-9"
                                        style={{ paddingBottom: '8px' }}>
                                        <CallStatus groupId={group.id} />
                                        <span className="comments-padding" />
                                        <CallParticipants
                                            groupId={group.groupId}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                        <Link to={`/group/${group.id}/members`}>
                                            Manage Members
                                        </Link>
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

export default GroupsOwned;
