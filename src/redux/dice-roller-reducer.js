import {getFullResult, getPersonName, getSignFromNum, randomCubeRoll} from "../components/helpers/DicerHelper";
import {personAPI, pushAPI} from "../components/Api/Api";
import {sendPush} from "../components/helpers/pushHelper";
import {getFirestore} from "redux-firestore";
import firebase from "firebase";

const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
const TROW_PRESET_DICE = 'TROW_PRESET_DICE';
const DELETE_PRESET_ITEM = 'DELETE_PRESET_ITEM';
const ADD_LAST_TO_PRESET = 'ADD_LAST_TO_PRESET';
const PUSH_ROLL_TO_ALL = 'PUSH_ROLL_TO_ALL';
const REMOVE_NOTIFICATION_MESSAGE = 'REMOVE_NOTIFICATION_MESSAGE';

let initialState = {
    diceRollNotify: false,
    message: [],
    preset: []

}
const diceRollerReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        message: [...state.message],
        preset: [...state.preset]
    };
    let isCrit = false;
    let isLose = false;
    let id = 0;
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            let str = action.text;
            let regexp = /(\d{1,2})[d,д,в,l](\d{1,3})/g;
            let result = getFullResult(str, regexp);
            //let resultSum = eval(str.replace(regexp, cubeSideToInt));
            //TODO: переписать на 1 большйо парсинг. сейчас кубы рандомятся дважды
            //let resultOptions = getResultOptions(str, regexp);
            if (stateCopy.message.length !== 0) {
                id = stateCopy.message[stateCopy.message.length - 1].id + 1;
            }
            let newMessage = {
                id: id,
                text: action.text,
                result: result.sum,
                cubeValues: result.cubeValues,
                statCategory: action.statCategory,
                statName: action.statName,
                //  isCrit: resultOptions.isCrit,
                //  isLose: resultOptions.isLose
            };
            stateCopy.message.push(newMessage);

            //sending result text
            let rollFrom = `${action.statCategory} ${action.statName}`;
            stateCopy.diceRollNotify = !!action.fromButtonClick;
            const firestore = getFirestore();
            firestore.collection('messages').add({
                personId: action.personID,
                personName: getPersonName(action.personID),
                messageId: id,
                text: action.text,
                result: result.sum,
                cubeValues: result.cubeValues.toString(),
                statCategory: action.statCategory,
                statName: action.statName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            sendPush(action.personID, newMessage.text, newMessage.result, newMessage.cubeValues, rollFrom);


            return stateCopy;
        // let addition = action.text.split('+');
        //
        // subtraction = addition.split('-');
        //
        // let negativeValue = false;
        // if (~action.text.indexOf('-')) {
        //     splitValues = action.text.split('-');
        //     negativeValue = true;
        // }
        //
        // let additionalValue = splitValues[1];
        // let result = randomCubeRoll(cubeCount, cubeSide, additionalValue, negativeValue);
        // id = 0;
        // if (stateCopy.message.length !== 0) {
        //     id = stateCopy.message[stateCopy.message.length - 1].id + 1;
        // }
        // //critical shot
        // if (+cubeSide === 20 && +cubeCount === 1 && +cubeSide === +result.cubeValues) {
        //     isCrit = true;
        // }
        // //lose
        // if (+cubeSide === 20 && +cubeCount === 1 && +result.cubeValues === 1) {
        //     isLose = true;
        // }
        // let newMessage = {id: id, text: action.text, result: result.sum, cubeValues: result.cubeValues, statCategory: action.statCategory, statName: action.statName, isCrit, isLose};
        // stateCopy.message.push(newMessage);
        //
        // //sending result text
        // let rollFrom = `${action.statCategory} ${action.statName}`;
        // stateCopy.diceRollNotify = !!action.fromButtonClick;
        // sendPush(action.personID, newMessage.text, newMessage.result, newMessage.cubeValues, rollFrom);
        // return stateCopy;
        case TROW_PRESET_DICE:
            id = 0;
            if (stateCopy.message.length !== 0) {
                id = stateCopy.message[stateCopy.message.length - 1].id + 1;
            }
            let res = randomCubeRoll(1, action.dice);
            let text = "1d" + action.dice;
            //critical shot
            if (+action.dice === 20 && +action.dice === +res.cubeValues) {
                isCrit = true;
            }
            //lose
            if (+action.dice === 20 && +res.cubeValues === 1) {
                isLose = true;
            }
            let newM = {id: id, text: text, result: res.sum, cubeValues: res.cubeValues, isCrit, isLose};
            stateCopy.message.push(newM);
            //sending result text
            sendPush(action.personID, newM.text, newM.result, newM.cubeValues);
            return stateCopy;
        case DELETE_PRESET_ITEM:

            stateCopy.preset.splice(action.index, 1);
            return stateCopy;
        case ADD_LAST_TO_PRESET:
            let inputString = action.presetsCubes.split(",");
            let newPreset = inputString.map((preset, index) => {
                return {id: index, text: preset}
            })
            stateCopy.preset = newPreset;
            return stateCopy;
        case PUSH_ROLL_TO_ALL:
            pushAPI.sendPushFirebase();
            return stateCopy;
        case REMOVE_NOTIFICATION_MESSAGE:
            stateCopy.diceRollNotify = false;
            return stateCopy;
        default:
            return state;
    }
};

export const addNewMessage = (text, statName='', statCategory = '', personID, fromButtonClick = false) => ({
    type: ADD_NEW_MESSAGE,
    text,
    statName,
    statCategory,
    personID,
    fromButtonClick
});
export const rollDiceFromStats = (modifier, statName, statCategory = '', personID, fromButtonClick = true) => {
    let sign = getSignFromNum(modifier);
    let text = `1d20${sign}${Math.abs(modifier)}`;
    return (dispatch) => {
        dispatch(addNewMessage(text, statName, statCategory, personID, fromButtonClick));
    }
}
export const removeNotificationMessage = () => ({type: REMOVE_NOTIFICATION_MESSAGE});
export const trowPresetDice = (text, personID) => ({
      type: ADD_NEW_MESSAGE,
      text,
      statName: '',
      statCategory: '',
      personID
  });
export const deleteFromStatePresetDice = (index) => ({type: DELETE_PRESET_ITEM, index})
export const addToStatePresetDice = (presetsCubes) => ({type: ADD_LAST_TO_PRESET, presetsCubes})
export const getPreset = (personID) => {
    return (dispatch) => {
        personAPI.getPreset(personID).then(response => {
            if (response.data.resultCode === 1) {
                dispatch(addToStatePresetDice(response.data.presetCubes));
            }
        })
    }
}
export const addToPreset = (personID, preset) => {
    return (dispatch) => {
        let presetCube = preset[preset.length - 1].text;
        personAPI.setPresetCube(personID, presetCube).then(response => {
            if (response.data.resultCode === 1) {
                dispatch(addToStatePresetDice(response.data.presetCubes));
            }
        })
    }
}
export const deletePresetDice = (personID, presetCubeId) => {
    return (dispatch) => {
        personAPI.deletePresetCube(personID, presetCubeId).then(response => {
            if (response.data.resultCode === 1) {
                dispatch(deleteFromStatePresetDice(presetCubeId));
            }
        })
    }
}

export default diceRollerReducer;