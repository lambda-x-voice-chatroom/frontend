import React from 'react';
import UpdateBillingWrapper from '../Billing/UpdateBillingWrapper.js';
import AddToBalanceWrapper from '../Billing/AddToBalanceWrapper.js';
// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';

const AccountBilling = props => {
    const [state, dispatch] = useStateValue(globalContext);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4 acct-header">
                    <h3>Billing</h3>
                </div>

                <div className="col-md-8">
                    <div className="row acct-row">
                        <div className="pull-left">
                            <strong>{`Account Balance: $${
                                props.accountBalance
                            }`}</strong>
                        </div>
                        <div
                            className="pull-right color-elements"
                            onClick={props.toggleChangeAddToBalance}>
                            {props.addToBalance ? 'Cancel' : 'Add Money'}
                        </div>
                    </div>
                </div>

                {props.addToBalance ? (
                    <div className="col-md-8">
                        <div className="row acct-row">
                            <div className="pull-left">
                                <AddToBalanceWrapper
                                    handleAddToBalance={
                                        props.handleAddToBalance
                                    }
                                    toggleChangeAddToBalance={
                                        props.toggleChangeAddToBalance
                                    }
                                    updateUserAccountBalance={
                                        props.updateUserAccountBalance
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="col-md-8 fl-r">
                    <div className="row acct-row">
                        <div className="pull-left">
                            {state.user.last4 === null
                                ? `No credit card on file`
                                : `•••• •••• •••• ${state.user.last4}`}
                        </div>
                        <div
                            className="pull-right color-elements"
                            onClick={props.toggleChangeBilling}>
                            {props.updateBilling ? 'Cancel' : 'Update'}
                        </div>
                    </div>
                </div>

                {/* UPDATING PAYMENT INFO */}
                {props.updateBilling ? (
                    <div className="col-md-8 fl-r">
                        <div className="row acct-row">
                            <div className="pull-left">
                                <UpdateBillingWrapper
                                    handleBillingUpdate={
                                        props.handleBillingUpdate
                                    }
                                    toggleChangeBilling={
                                        props.toggleChangeBilling
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AccountBilling;
