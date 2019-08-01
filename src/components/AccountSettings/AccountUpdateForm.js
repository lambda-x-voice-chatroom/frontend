import React from 'react';

const AccountUpdateForm = props => {
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
