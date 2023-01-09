//sending result text
import {pushAPI} from "../Api/Api";
import {developerMode} from "../../redux/developer_mode";

export const sendPush = (personID, text, result, cubeValuesArr, statName = '') => {
    let beforeText = statName ? `${statName}: ` : '';
    let cubeValues = cubeValuesArr ? ` ( ${cubeValuesArr} )` : '';
    if (!developerMode) {
        pushAPI.sendPushFirebase(personID, `${beforeText}${text} = ${result} ${cubeValues}`);
    }
}