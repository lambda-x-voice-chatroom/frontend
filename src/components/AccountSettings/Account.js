import React from 'react';
import DeleteModal from '../Modal/DeleteModal';
import MessageModal from '../Modal/MessageModal';

// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
// import {  } from './store/constants';

const Account = props => {
    const [state] = useStateValue(globalContext);

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="col-xs-4 col-sm-4 col-md-4 acct-header">
                    <h3>Account</h3>
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8">
                    <div className="row acct-row">
                        <div className="pull-right">
                            {state.user.accountBalance > 0 ? (
                                <DeleteModal
                                    deleteMessage={
                                        'Confirm your email address.'
                                    }
                                    target={state.user.id}
                                    targetName={state.user.email}
                                    handleTarget={state.handleTarget}
                                    type={'Delete Account'}
                                />
                            ) : (
                                <MessageModal type={'Delete Account'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
