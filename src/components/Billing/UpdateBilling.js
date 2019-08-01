import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements'; // The injectStripe HOC provides the this.props.stripe property that manages your Elements groups. You can call this.props.stripe.createToken or this.props.stripe.createSource within a component that has been injected to submit payment data to Stripe.
// State Management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';

import { SET_USER } from '../../store/constants';
import API from '../../utils/API';

const UpdateBilling = props => {
    const [state, dispatch] = useStateValue(globalContext);
    const [localState, setLocalState] = useState({
        last4: '',
        errorMessage: null,
        processing: false,
        buttonText: 'Update'
    });

    const createSource = async () => {
        const sourceInfo = {
            type: 'card',
            currency: 'usd',
            usage: 'reusable'
        };

        try {
            const createSourceResponse = await props.stripe.createSource(
                sourceInfo
            );
            // console.log('createSourceResponse: ', createSourceResponse);

            if (createSourceResponse.error) {
                setLocalState({
                    ...localState,
                    errorMessage: createSourceResponse.error.message,
                    processing: false,
                    buttonText: 'Update'
                });
            } else {
                setLocalState({ ...localState, errorMessage: null });
                const source = createSourceResponse.source;
                // console.log('source: ', source);
                return source;
            }
        } catch (err) {
            console.log('err: ', err);
            return err;
        }
    };

    const updateDefaultSource = async source => {
        try {
            const res = await API.get(`/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: state.token
                }
            });
            const userStripeId = res.data.stripeId;
            // console.log('userStripeId: ', userStripeId);

            const updatedSource = await API.post(
                `/billing/updateDefaultSource`,
                {
                    userStripeId: userStripeId,
                    sourceId: source.id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: state.token
                    }
                }
            );
            if (updatedSource.error) {
                setLocalState({
                    ...localState,
                    errorMessage: updatedSource.error.message
                });
            }
            // console.log('updatedSource: ', updatedSource);

            const last4 = updatedSource.data.sources.data[0].card.last4;
            await API.put(
                `/api/users/last4`,
                { last4: last4 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: state.token
                    }
                }
            );
            props.handleBillingUpdate();
            return updatedSource;
        } catch (err) {
            console.log('err: ', err);
            return err;
        }
    };

    const updateBilling = async () => {
        try {
            // Step 1, create a source from the entered credit card information.
            const source = await createSource();

            // Step 2, update the customer's default source.
            // const newDefaultSource = await this.updateDefaultSource(source);
            await updateDefaultSource(source);

            props.toggleChangeBilling();
        } catch (err) {
            console.log('err: ', err);
            return err;
        }
    };

    const updateCreditCard = async () => {
        try {
            setLocalState({
                ...localState,
                processing: true,
                buttonText: 'Processing...'
            });
            const source = await createSource();
            // console.log('source: ', source);
            const sourceId = source.id;

            // const updateCreditCardRes = await axios.post(`${host}/api/billing/updateCreditCard`, {'userId': userId, 'sourceId':sourceId});
            const user = await API.post(
                `/api/billing/updateCreditCard`,
                {
                    sourceId: sourceId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: state.token
                    }
                }
            );
            dispatch({ type: SET_USER, payload: user });

            setLocalState({
                ...localState,
                processing: false,
                buttonText: 'Update'
            });

            props.handleBillingUpdate();
            props.toggleChangeBilling();
        } catch (err) {
            console.log('err: ', err);
            return err;
        }
    };

    return (
        <div className="input-group searchbar">
            <CardElement className="form-control form-control-sm" />
            <span className="input-group-btn">
                <button
                    className="btn btn-default input-but"
                    type="button"
                    onClick={updateCreditCard}
                    disabled={
                        localState.last4 === null ||
                        localState.processing === true
                    }>
                    {localState.buttonText}
                </button>
            </span>
            <div style={{ marginBottom: '10px' }}>
                {localState.errorMessage}
            </div>
            {localState.errorMessage ? (
                <div style={{ color: 'red', height: '20px' }}>
                    {localState.errorMessage}
                </div>
            ) : null}
        </div>
    );
};

export default injectStripe(UpdateBilling);
