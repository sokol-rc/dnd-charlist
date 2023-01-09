import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import singlePersonReducer from "./single-person-reducer";
import diceRollerReducer from "./dice-roller-reducer";
import { reducer as formReducer } from 'redux-form'
import thunk from "redux-thunk";
import personCardsReducer from "./person-cards-reducer";
import {firebaseReducer, getFirebase, reactReduxFirebase} from "react-redux-firebase";
import {firestoreReducer, getFirestore, reduxFirestore} from "redux-firestore";
import fbConfig from '../components/Api/firebaseConfig';

let reducers = combineReducers({personReducer: singlePersonReducer, diceRollerReducer, personCardsReducer, form: formReducer, firebase: firebaseReducer, firestore: firestoreReducer});

let store = createStore(reducers, compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig)
));
export default store;