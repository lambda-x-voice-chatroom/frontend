import React, { useEffect } from 'react';

const AccountPlanDetails = () => {
    useEffect(() => {
        window.$('[data-toggle="tooltipDetails"]').tooltip();
        window.$('[data-toggle="tooltipDetails"]').tooltip();
    });

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4 acct-header">
                    <h3>Plan Details</h3>
                </div>
                <div className="col-md-8">
                    <div className="row acct-row">
                        <div className="pull-left">Pre-Pay Chat</div>
                        <div className="pull-right info-link">
                            <div
                                data-toggle="tooltipEmail"
                                data-placement="left"
                                data-html="true"
                                title="Add money to your account as needed. Call charges are then deducted from your balance after each Chat has ended. <br> No monthly bills -- No hassles!">
                                <i className="fa fa-question-circle" /> Details
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPlanDetails;
