import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from 'react-conflux';

import App from './App';

import { globalReducer } from './store/reducers/globalReducer';
import { globalContext } from './store/contexts';

// import { makeMainRoutes } from './routes';
// loadjs('./styling/js/jquery.js')

// const routes = makeMainRoutes();

ReactDOM.render(
    <StateProvider reducer={globalReducer} stateContext={globalContext}>
        <App />
    </StateProvider>,
    document.getElementById('root')
);
