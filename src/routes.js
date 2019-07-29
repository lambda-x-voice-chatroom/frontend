// import React from 'react';
// import { Router, Route } from 'react-router-dom';
// import AddToBalance from './components/Billing/AddToBalance';
// import GroupMembersView from './components/GroupMembers/GroupMembersView';
// import AccountSettings from './components/AccountSettings/AccountSettings';
// import GroupChatroomView from './components/GroupChatroom/GroupChatroomView';

// // State Management
// import { StateProvider } from 'react-conflux';
// import { globalReducer } from './store/reducers/globalReducer';
// import { globalContext } from './store/contexts';

// import history from './history';

// // Main Router
// import App from './App';

// // Auth Routes
// import Auth from './Auth/Auth';
// // import Authenticating from './Auth/Authenticating';
// import User from './components/User/User';

// // Landing Page
// import LandingPageView from './components/LandingPage/LandingPageView';

// // Create new Auth session
// // const auth = new Auth();

// export const makeMainRoutes = () => {
//     return (
//         <StateProvider reducer={globalReducer} stateContext={globalContext}>
//             <Router history={history} component={App}>
//                 <>
//                     <Route path="/" render={props => <App {...props} />} />
//                     <Route
//                         exact
//                         path="/"
//                         render={props => <LandingPageView {...props} />}
//                     />
//                     {/* <Route exact path="/authenticating" render={(props) => {
//           handleAuthentication(props);
//           return <Authenticating {...props} />
//         }} /> */}
//                     <Route
//                         exact
//                         path="/user/:id"
//                         render={props => <User {...props} />}
//                     />
//                     <Route
//                         exact
//                         path="/user/:id/account"
//                         render={props => <AccountSettings {...props} />}
//                     />
//                     <Route
//                         exact
//                         path="/group/:id"
//                         render={props => <GroupChatroomView {...props} />}
//                     />
//                     <Route
//                         exact
//                         path="/group/:id/members"
//                         render={props => <GroupMembersView {...props} />}
//                     />
//                     <Route
//                         exact
//                         path="/user/:id/billing"
//                         render={props => <AddToBalance {...props} />}
//                     />
//                 </>
//             </Router>
//         </StateProvider>
//     );
// };
