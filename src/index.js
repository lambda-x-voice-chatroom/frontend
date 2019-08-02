import React from 'react';
import ReactDOM from 'react-dom';

// State Management
import { StateProvider } from 'react-conflux';
import { globalReducer } from './store/reducers/globalReducer';
import { globalContext } from './store/contexts';

// Components
import App from './App';

ReactDOM.render(
    <StateProvider reducer={globalReducer} stateContext={globalContext}>
        <App />
    </StateProvider>,
    document.getElementById('root')
);
