import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store.js';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import "firebase/auth";
import firebase from "firebase";
import "firebase/firestore";
import 'firebase/messaging';
import {initializePush} from "./components/Api/initializePush";
import {developerMode} from "./redux/developer_mode";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

if (!developerMode) {
    //firebase.initializeApp(firebaseConfig);
    initializePush();

}
const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
}
let rerenderEntireTree = (state) => {

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                <App/>
                </ReactReduxFirebaseProvider>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();