import {connect} from "react-redux";
import PersonCards from "./PersonCards";
import {getCards} from "../../redux/person-cards-reducer";

let mapStateToProps = (state) => ({
    person: state.personReducer.person,
    cards: state.personCardsReducer.cards,
    DEVELOPER_MODE: state.personReducer.DEVELOPER_MODE
});

export const PersonCardsContainer = connect(mapStateToProps, {getCards})(PersonCards);