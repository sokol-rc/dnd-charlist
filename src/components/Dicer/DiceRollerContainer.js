import DiceRoller from "./DiceRoller";
import {connect} from "react-redux";
import {addNewMessage, addToPreset, deletePresetDice, trowPresetDice} from "../../redux/dice-roller-reducer";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {getFirestoreMessages} from "../../redux/firebaseSelectors";

const mstp = (state) => {
    return {
       // message: state.diceRollerReducer.message,
        message: getFirestoreMessages(state),
        preset: state.diceRollerReducer.preset,
        personID: state.personReducer.person.id,
    }
}
const DiceRollerContainer = compose(
    connect(mstp, {addNewMessage, trowPresetDice,deletePresetDice,addToPreset}),
    firestoreConnect([
        {collection: 'messages',
        orderBy: 'createdAt',
        limit: 10000}
    ])
)(DiceRoller);
export default DiceRollerContainer;