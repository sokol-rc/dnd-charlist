import MainStats from "./MainStats";
import {connect} from "react-redux";
import {rollDiceFromStats} from "../../../redux/dice-roller-reducer";
import {setTextContent, setTextContentToStore} from "../../../redux/single-person-reducer";
const mstp = (state) => {
    return {
        lifeStats: state.personReducer.person.lifeStats,
        editMode: state.personReducer.editMode,
        stats: state.personReducer.person.stats,
        savingThrows : state.personReducer.person.savingThrows,
        textContent: state.personReducer.person.textContent,
        personID: state.personReducer.person.id
    }
}

const MainStatsContainer = connect(mstp,{rollDiceFromStats,setTextContent,setTextContentToStore})(MainStats);
export default MainStatsContainer;