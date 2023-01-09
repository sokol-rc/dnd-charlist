import React from "react";
import singlePersonReducer, {addNewSlotCircle, deleteSlotCircle} from "../single-person-reducer";
let initialState = {
    person: {
        id: 1,
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

test('add new slot in slots array', () => {
    //1. test data
    let action = addNewSlotCircle(1);
    //2. action
    let newState = singlePersonReducer(initialState, action)
    //3.expectation
    expect(newState.person.spellSlots[0].slots.length).toBe(2)
})
test('add new slot set correct values', () => {
    //1. test data
    let action = addNewSlotCircle(1);
    //2. action
    let newState = singlePersonReducer(initialState, action)
    //3.expectation
    expect(newState.person.spellSlots[0].slots[1].name).toBe(2)
})
test('after deleting slots array should be decrement', () => {
    //1. test data
    let action = deleteSlotCircle(1);
    //2. action
    let newState = singlePersonReducer(initialState, action)
    //3.expectation
    expect(newState.person.spellSlots[0].slots.length).toBe(0)
})
