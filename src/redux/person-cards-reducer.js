import {personAPI} from "../components/Api/Api";
import {developerMode} from "./developer_mode";

const TEST = 'TEST';
const SET_CARDS = 'SET_CARDS';
const DEVELOPER_MODE = developerMode;

let initialState = {
    DEVELOPER_MODE: DEVELOPER_MODE,
};
if (DEVELOPER_MODE) {
    initialState = {
        ...initialState,
        cards: [
            {
                url: "/charnik/nemag",
                person: {
                    id: 1,
                    name: "Немаг",
                    class: "Волшебник",
                    level: 8,
                    race: "Гном",
                    avatarUrl: "http://mrcoko0y.beget.tech/assets/images/avatar.jpg"
                }
            },
            {
                url: "/1",
                person: {
                    id: 2,
                    name: "Невоин",
                    class: "Воин",
                    level: 8,
                    race: "Человек",
                    avatarUrl: "http://mrcoko0y.beget.tech/assets/images/avatar.jpg"
                }
            },
        ]
    }
}

const personCardsReducer = (state = initialState, action) => {

    let stateCopy = {...state}

    switch (action.type) {
        case TEST:
            return stateCopy;
        case SET_CARDS:
            stateCopy.cards = action.cards.cards;
            return stateCopy;
        default:
            return stateCopy;
    }
};
export const setCards = (cards) => ({type: SET_CARDS, cards: cards})

export const getCards = () => {
    return (dispatch) => {
        personAPI.getCards().then(response => {
            dispatch(setCards(response.data));
        })
    }
}

export default personCardsReducer;