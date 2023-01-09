import Person from "./Person";
import {connect} from "react-redux";
import {
    changeEditMode,
    getPerson,
    savePersonData,
    setCurrentHPApi,
    setNewAvatar,
    setPerson, setTextContent
} from "../../redux/single-person-reducer";
import {withRouter} from "react-router-dom";
import {addNewMessage} from "../../redux/dice-roller-reducer";

const mstp = (state) => {
    return {
        isFetching: state.personReducer.isFetching,
        editMode: state.personReducer.editMode,
        isPersonDataSaved: state.personReducer.isPersonDataSaved,
        isPersonDataFetching: state.personReducer.isPersonDataFetching,
        diceRollNotify: state.diceRollerReducer.diceRollNotify,
        person: state.personReducer.person,
        DEVELOPER_MODE: state.personReducer.DEVELOPER_MODE
    }
}

const WithRouterPersonContainer = withRouter(Person)
const PersonContainer = connect(mstp, {setPerson, setCurrentHPApi, getPerson,changeEditMode, savePersonData, addNewMessage,setNewAvatar,setTextContent})(WithRouterPersonContainer);
export default PersonContainer;