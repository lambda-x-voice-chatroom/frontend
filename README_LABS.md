# Voice Chatroom (Front-End)
Front-End repo for labs11-intercomApp-FE a/k/a Voice Chatroom.<br><br>
![Voice Chatroom](https://i.imgur.com/OlTQ8Dh.png)

## Table of Contents
-   [Overview](#overview)
    -   [Introduction](#introduction)
    -   [Mission Statement](#mission-statement)
-   [Getting Started](#getting-started)
    -   [Install](#install)
        -   [Dependencies](#dependencies)
        -   [Dev-Dependencies](#dev-dependencies)
    -   [Package Scripts](#package-scripts)
        -   [Test App](#test-app)
        -   [Development App](#development-app)
        -   [Production App](#production-app)
    -   [Environment Variables](#environment-variables)
-   [PUBLIC Directory](#public-directory)
    -   [HTML file](#html-file)
        -   [Project Stylesheets Links](#project-stylesheets-links)
        -   [Project Scripts](#project-scripts)
-   [SRC Directory](#src-directory)
    -   [Main JavaScript Files](#main-javascript-files)
    -   [Authorization Components](#authorization-components)
    -   [App Components](#app-components)
-   [Color Palette](#color-palette)
-   [License](#license)

# Overview
Front-end React application powered by a back-end Node and Express server.<br>
Demo application is deployed to Netlify at <a href="https://intercom.netlify.com/" target="_blank" rel="noopener">https://intercom.netlify.com</a>.

## Introduction
Using your phone and headphones, you will have the ability to create voice chatrooms groups, talk directly into your group’s ears, and hear others talk into your ears. You can manage the group, see who is in the group and start up a voice call.

## Mission Statement
Our mission is to assist a wide variety of users ranging from those who may be hearing impaired or elderly to anyone who finds themselves as a group having difficulty conversing with others with overbearing background noise. We provide our users to opportunity to easily create and join personal groups and initiate voice chats within those groups to keep a clear communication link with their family and friends. Don't lose your voice, find your Voice Chatroom!

# Getting Started
**Package Manager:** `yarn`
- Fork and clone this repository
- Change directory into the project directory folder `intercom`.

## Install
`yarn install`

### Dependencies 
`auth0-js` `axios` `bootstrap` `fuse` `fuse.js` `jquery` `popper.js` `react` `react-dom` `react-loader-spinner` `react-router-dom` `react-scripts` `react-stripe-elements`
### Dev-Dependencies 
`jest-dom` `react-test-renderer` `react-testing-library`

## Package Scripts
In the project directory, you can run:

### Test App
```yarn test```  
  
Launches the test runner in the interactive watch mode. 
- App testing completed with `jest-dom` `react-test-renderer` and `react-testing-library`.

### Development App
```yarn start```  
  
Runs the app in the development mode.
- Open `http://localhost:3000` to view it in the browser.
- The page will reload if you make edits.

### Production App
```yarn build```  
  
Builds the app for production.
- Our production application is deployed to Netlify at <a href="https://intercom.netlify.com/" target="_blank" rel="noopener">https://intercom.netlify.com</a>.

## Environment Variables
Environments variables set within local .env file for testing and development. For production variables are set within the Netlify's application `Environment Variables` settings.
- **Local/Production:** `REACT_APP_HOST` `REACT_APP_AUTH_CB_DEV` `REACT_APP_AUTH_CB_PROD` `REACT_APP_CONTACT_EMAIL`
- **Auth0:** `REACT_APP_AUTH_DOMAIN` `REACT_APP_AUTH_CLIENT_ID` `REACT_APP_AUTH_AUD`
- **Stripe:** `REACT_APP_PK_TEST`

# PUBLIC Directory
Located within the `public` folder:
- Application's html file `index.html`
- CSS stylesheets
- JavaScript files
- Images and logos
- Font packages
- Webtemplate documentation

## HTML file
React application rendered through `<div id="root"></div>` located within the body script of `index.html`.

### Project Stylesheets Links
- **Custom CSS:** `<link rel="stylesheet" href="/css/intercom.css">`
- **Bootstrap CSS:** `<link href="/css/bootstrap.min.css" rel="stylesheet">`
- **Font Awesome:** `<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">`
- **Material Icons:** `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`

### Project Scripts
- **Bootstrap JS:** `<script src="/js/bootstrap.min.js"></script>`
- **jQuery JS:** `<script src="/js/jquery.js"></script>`
- **Popper JS:** `<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>`
- **Stripe:** `<script src="https://js.stripe.com/v3/"></script>`

# SRC Directory
Located within the `src` folder:
- Application's main `index.js` file
- App, History, Host, and Routes files
- Authorization Components directory
- Custom Components directory
- Default Images directory

## Main JavaScript Files

| File Name    | Purpose                                                                                                   |
| -------------|-----------------------------------------------------------------------------------------------------------|
| `index.js`   | React application rendered through `index.js` and renders all routes located within the `routes.js` file. |
| `routes.js`  | Renders `App.js` as main Router and all sub-components as routes within App.                              |
| `App.js`     | `App.js` is this main Router and always renders a `Navigations.js` sub-component.                         |
| `history.js` | Creates a browser history.                                                                                |
| `host.js`    | Exports the process environment's host variable.                                                          |

## Authorization Components
All authorization components are located within the `src/Auth` directory.<br>
Authorization powered by <a href="https://auth0.com/" target="_blank" rel="noopener">Auth0</a>.
- When a user logs in or signs up that user's email and password is first verfied by Auth0
- Once verified Auth0 provides a user with an authorization token and provides the App with that user's Auth0 account information
- The account information is then passed to our back-end server to verify or create a user
- Once the user is verified or created a logged in session is set and the user can begin using the App

## App Components
All other routes and sub-components are located within the `src/components` directory which include:
- Navigation Component
- Landing Page View and components
- All App Page Views and components
- All Error and Unauthorized Page Views and components
- All Modal components

# Color Palette
![Color Palette](https://i.imgur.com/Kq60M74.png)

# License 
[View License Details](LICENSE)<br>
MIT © [Intercom App](https://github.com/intercom-app/labs11-IntercomApp-FE)
