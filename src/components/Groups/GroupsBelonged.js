import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CallParticipants from './CallParticipants';
import CallStatus from './CallStatus';

import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';

const GroupsBelonged = () => {
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
                Groups Belonged To
                <span data-toggle="collapse" data-target="#groups-belonged">
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

            <div className="collapse in" id="groups-belonged">
                {state.groupsBelongTo.length === 0 ? (
                    <p className="no-groups">
                        You are not a member of any groups at this time.
                    </p>
                ) : (
                    <>
                        {state.groupsBelongTo.map(group => (
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
                                        <CallParticipants groupId={group.id} />
                                    </div>
                                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                        <Link
                                            to={`/group/${
                                                group.groupId
                                            }/members`}>
                                            View Members
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

export default GroupsBelonged;
