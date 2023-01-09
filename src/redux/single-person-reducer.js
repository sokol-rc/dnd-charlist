import {personAPI} from "../components/Api/Api";
import {getPreset} from "./dice-roller-reducer";
import {developerMode} from "./developer_mode";
import {esc_quot} from "../components/helpers/personHelper";

const TEST = 'TEST';
const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';
const REMOVE_ERRORS = 'REMOVE_ERRORS';
const SET_NEW_PERSON = 'SET_NEW_PERSON';
const SET_NEW_CURRENT_HP = 'SET_NEW_CURRENT_HP';
const SET_NEW_AVATAR_URL = 'SET_NEW_AVATAR_URL';
const CHANGE_EDIT_MODE = 'CHANGE_EDIT_MODE';
const CHANGE_IS_PERSON_DATA_FETCHING = 'CHANGE_IS_PERSON_DATA_FETCHING';
const CHANGE_IS_PERSON_DATA_SAVED = 'CHANGE_IS_PERSON_DATA_SAVED';
const SET_TEXT_CONTENT_TO_STORE = 'SET_TEXT_CONTENT_TO_STORE';
const ADD_NEW_WEAPON = 'ADD_NEW_WEAPON';
const REMOVE_NEW_WEAPON = 'REMOVE_NEW_WEAPON';
const ADD_CONSUMED_SLOT = 'ADD_CONSUMED_SLOT';
const DELETE_CONSUMED_SLOT = 'DELETE_CONSUMED_SLOT';
const ADD_NEW_SLOT_CIRCLE = 'ADD_NEW_SLOT_CIRCLE';
const DELETE_SLOT_CIRCLE = 'DELETE_SLOT_CIRCLE';
//edit mode
const SAVE_NEW_PERSON_DATA = 'SAVE_NEW_PERSON_DATA';

//комментируй всё пока не забыл!!!!!
const DEVELOPER_MODE = developerMode;

let initialState = {
    DEVELOPER_MODE: DEVELOPER_MODE,
    editMode: false,
    isPersonDataSaved: false,
    isPersonDataFetching: false,
    isFetching: false,
    person: null,
    errorMessage: null,
    isErrorMessage: false
}
if (DEVELOPER_MODE) {
    initialState = {
        ...initialState,
        person: {
            id: 9,
            name: "Немаг",
            class: "Волшебник",
            level: 8,
            race: "Гном",
            avatarUrl: "http://mrcoko0y.beget.tech/assets/images/avatar.jpg",
            textContent: "<p>Editor</p><br /><p><strong>asdasd</strong></p>",
            lifeStats: {
                ac: 16,
                maxHP: 88,
                currentHP: 44,
                diceHP: "2d8",
                masterBonus: 3,
                passiveAttention: 21,
                inspiration: 0,
                initiative: 3
            },
            stats: [
                {
                    value: 9,
                    translate: "Сила",
                    skills: [
                        {
                            translate: "Атлетика", value: 0, picked: true
                        },
                    ],
                },
                {
                    value: 18,
                    translate: "Телосложение",
                    skills: [],
                },
                {
                    value: 10,
                    translate: "Интеллект",
                    skills: [
                        {translate: "Магия", value: 7, picked: false},
                        {translate: "История", value: -2, picked: false},
                        {translate: "Анализ", value: 0, picked: false},
                        {translate: "Природа", value: 0, picked: false},
                        {translate: "Религия", value: 0, picked: false},
                    ],
                },
                {
                    value: 9,
                    translate: "Ловкость",
                    skills: [
                        {translate: "Акробатика", value: 0, picked: false},
                        {translate: "Ловкость рук", value: 0, picked: false},
                        {translate: "Скрытность", value: 0, picked: false},
                    ],
                },
                {
                    value: 9,
                    translate: "Мудрость",
                    skills: [
                        {translate: "Уход за животными", value: 0, picked: false},
                        {translate: "Проницательность", value: 0, picked: false},
                        {translate: "Медицина", value: 0, picked: false},
                        {translate: "Внимание", value: 0, picked: false},
                        {translate: "Выживание", value: 0, picked: false},
                    ],
                },
                {
                    value: 9,
                    translate: "Харизма",
                    skills: [
                        {translate: "Обман", value: 0, picked: false},
                        {translate: "Запугивание", value: 0, picked: false},
                        {translate: "Представление", value: 0, picked: false},
                        {translate: "Убеждение", value: 0, picked: false},
                    ],
                },
            ],
            savingThrows: [
                {value: -1, translate: "Сила"},
                {value: -4, translate: "Телосложение"},
                {value: 0, translate: "Интелект"},
                {value: "-44", translate: "Ловкость"},
                {value: 1, translate: "Мудрость"},
                {value: 3, translate: "Харизма"},
            ],
            weapons: [
                {id: 1, name: 'Дубинка-валынка', accuracy: 8, damage: '2d8'},
                {id: 1, name: 'Дубинка', accuracy: 8, damage: '3d8'}
            ],
            spellSlots: [
                {
                    id: 1,
                    name: 'Героические кубы',
                    slots: [
                        {id: 1, name: '', max: 9, consumed: 4}
                    ]
                },
                {
                    id: 2,
                    name: 'Ячейки заклинаний',
                    slots: [
                        {id: 1, name: '1', max: 4, consumed: 0},
                        {id: 2, name: '2', max: 3, consumed: 0},
                        {id: 3, name: '3', max: 3, consumed: 0}
                    ]
                }
            ]
        }
    }
}

const singlePersonReducer = (state = initialState, action) => {
    let stateCopy = {...state}
    if (state.person !== null) {
        stateCopy = {
            ...state,
            lifeStats: {
                ...state.person.lifeStats
            }
        }
    }

    switch (action.type) {
        case TEST:
            return state;
        case SET_NEW_PERSON:
            stateCopy.person = action.person.person;
            return stateCopy;
        case SHOW_ERROR_MESSAGE:
            stateCopy.errorMessage = action.message;
            stateCopy.isErrorMessage = true;
            return stateCopy;
        case REMOVE_ERRORS:
            stateCopy.isErrorMessage = false;
            return stateCopy;
        case SET_NEW_CURRENT_HP:
            stateCopy.person.lifeStats.currentHP = action.currentHP
            return stateCopy;
        case SET_NEW_AVATAR_URL:
            stateCopy.person.avatarUrl = action.avatarUrl
            return stateCopy;
        case CHANGE_EDIT_MODE:
            stateCopy.editMode = !stateCopy.editMode;
            return stateCopy;
        case CHANGE_IS_PERSON_DATA_FETCHING:
            stateCopy.isPersonDataFetching = !stateCopy.isPersonDataFetching;
            return stateCopy;
        case CHANGE_IS_PERSON_DATA_SAVED:
            stateCopy.isPersonDataSaved = !stateCopy.isPersonDataSaved;
            return stateCopy;
        case SAVE_NEW_PERSON_DATA:
            stateCopy.person = action.newPerson;
            return stateCopy;
        case SET_TEXT_CONTENT_TO_STORE:
            stateCopy.person.textContent = action.textContent;
            return stateCopy;
        case ADD_NEW_WEAPON:
            const id = stateCopy.person.weapons[stateCopy.person.weapons.length - 1].id + 1;
            stateCopy.person.weapons.push({id: id, name: 'Оружие', accuracy: 0, damage: '1d4'});
            return stateCopy;
        case ADD_CONSUMED_SLOT:
            let newState = stateCopy.person.spellSlots.map((item) => {
                let slots = item.slots;
                if (item.id === action.spellSlotID) {
                    slots = item.slots.map(slot => {
                        let newSlot = {...slot};
                        if (slot.id === action.slotsId) {
                            newSlot.consumed = Number.parseInt(slot.consumed) + 1;
                            console.log(newSlot.consumed);
                        }
                        return newSlot;
                    });
                }
                item.slots = slots;
                return item;
            });
            stateCopy.person.spellSlots = newState;
            return stateCopy;
            case DELETE_CONSUMED_SLOT:
            let newStateDelete = stateCopy.person.spellSlots.map((item) => {
                let slots = item.slots;
                if (item.id === action.spellSlotID) {
                    slots = item.slots.map(slot => {
                        let newSlot = {...slot};
                        if (slot.id === action.slotsId) {
                            newSlot.consumed = Number.parseInt(slot.consumed) - 1;
                            console.log(newSlot.consumed);
                        }
                        return newSlot;
                    });
                }
                item.slots = slots;
                return item;
            });
            stateCopy.person.spellSlots = newStateDelete;
            return stateCopy;
        case ADD_NEW_SLOT_CIRCLE:
            stateCopy.person.spellSlots.forEach((item, index) => {
                if (item.id === action.spellSlotID) {
                    let slotId = item.slots[item.slots.length-1].id + 1;
                    stateCopy.person.spellSlots[index].slots.push({id: slotId, name: slotId, max: 1, consumed: 0})
                }
            })
            return stateCopy;
        case DELETE_SLOT_CIRCLE:
            stateCopy.person.spellSlots.forEach((item, index) => {
                if (item.id === action.spellSlotID) {
                    stateCopy.person.spellSlots[index].slots.pop();
                }
            })
            return stateCopy;
        case REMOVE_NEW_WEAPON:
            stateCopy.person.weapons.splice(action.id, 1);
            return stateCopy;
        default:
            return stateCopy;
    }
};
//ERRORS

export const showErrorMessage = (message) => ({type: SHOW_ERROR_MESSAGE, message});
export const removeErrorMessages = () => ({type: REMOVE_ERRORS});
//MAIN
export const setPerson = (person) => ({type: SET_NEW_PERSON, person});
export const setCurrentHP = (currentHP) => ({type: SET_NEW_CURRENT_HP, currentHP})
export const setNewAvatarUrl = (avatarUrl) => ({type: SET_NEW_AVATAR_URL, avatarUrl})
export const changeEditMode = () => ({type: CHANGE_EDIT_MODE})
export const changeIsPersonDataFetching = () => ({type: CHANGE_IS_PERSON_DATA_FETCHING})
export const personDataSaved = () => ({type: CHANGE_IS_PERSON_DATA_SAVED})
export const saveNewPersonData = (newPerson) => ({type: SAVE_NEW_PERSON_DATA, newPerson})
export const setTextContentToStore = (textContent) => ({type: SET_TEXT_CONTENT_TO_STORE, textContent})
//WEAPONS
export const addNewWeapon = () => ({type: ADD_NEW_WEAPON});
export const removeCurrentWeapon = (index) => ({type: REMOVE_NEW_WEAPON, id: index});

//SLOTS
export const setConsumedSlotToStore = (spellSlotID, slotsId) => ({type: ADD_CONSUMED_SLOT, spellSlotID, slotsId});
export const deleteonsumedSlotFromStore = (spellSlotID, slotsId) => ({type: DELETE_CONSUMED_SLOT, spellSlotID, slotsId});
export const addNewSlotCircle = (spellSlotID) => ({type: ADD_NEW_SLOT_CIRCLE, spellSlotID});
export const deleteSlotCircle = (spellSlotID) => ({type: DELETE_SLOT_CIRCLE, spellSlotID});
export const setConsumedSlotApi = (spellSlotID, slotsId, isConsumed, personId) => {
    return (dispatch) => {
        personAPI.setConsumedSlots(spellSlotID, slotsId, isConsumed, personId).then(response => {
            if (response.data.resultCode === 1) {
                if (isConsumed) {
                    dispatch(setConsumedSlotToStore(spellSlotID, slotsId));
                } else {
                    dispatch(deleteonsumedSlotFromStore(spellSlotID, slotsId));
                }

            }
        })
    }
}


export const savePersonData = (personData) => {
    return (dispatch) => {
        dispatch(changeIsPersonDataFetching());
        //uncomment this for release build
        personAPI.savePersonData(personData).then(response => {
            if (response.data.resultCode === 1) {
                setTimeout(() => {
                    dispatch(saveNewPersonData(personData));
                    dispatch(personDataSaved());
                    dispatch(changeIsPersonDataFetching());
                    setTimeout(() => {
                        dispatch(changeEditMode());
                        dispatch(personDataSaved());
                    }, 1000)
                }, 1500)
            }
        })
    }
}
export const setCurrentHPApi = (currentHP, inputHp, personID) => {
    //смотрим что вводит пользовтаель, если + то складываем, - вычитаем. Без знака заменяем
    //Предусматриваем отрицательное текущее hp
    let string = inputHp;
    let newHP = Math.abs(string);
    if (~string.indexOf('+')) {
        newHP = +currentHP + Math.abs(string);
    }
    if (~string.indexOf('-')) {
        newHP = +currentHP - Math.abs(string);
    }
    let data = {
        personID: personID,
        currentHP: newHP
    };
    return (dispatch) => {
        personAPI.setCurrentHP(data).then(response => {
            if (response.data.resultCode === 1) {
                dispatch(setCurrentHP(newHP));
            }
        })
    }
}
export const setNewAvatar = (personID, imageFile) => {

    return (dispatch) => {
        personAPI.setNewAvatar(personID, imageFile).then(response => {
            if (response.data.resultCode === 1) {
                dispatch(setNewAvatarUrl(response.data.avatarUrl));
            } else if (response.data.resultCode === 2) {
                dispatch(showErrorMessage(response.data.errorMessage))
            }
        });
    }
}
export const setTextContent = (personID, textContent) => {
    const text = esc_quot(textContent);
    return (dispatch) => {
        personAPI.setTextContent(personID, text).then(response => {
            if (response.data.resultCode === 1) {
                dispatch(setTextContentToStore(text));
            }
        })
    }
}
export const getPerson = (url) => {
    return (dispatch) => {
        personAPI.getPerson(url).then(response => {
            dispatch(setPerson(response.data));
            dispatch(getPreset(response.data.person.id))
        })
    }
}
export default singlePersonReducer;