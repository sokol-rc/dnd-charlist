import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {connect} from "react-redux";
import {addNewMessage, rollDiceFromStats} from "../../../redux/dice-roller-reducer";

export let WeaponItem = (props) => {

    const accuracyClick = () => {
        props.rollDiceFromStats(props.accuracy, 'Попадание', props.name, props.personID);
    }
    const damageClick = () => {
        props.addNewMessage(props.damage, 'Урон', props.name, props.personID)
    }
    return (
        <Paper elevation={3} className="weaponItem">
            <box className="textWrapper">
                <div className="label">
                    Название оружия
                </div>
                <div className="name textBox">
                    {props.name}
                </div>
            </box>
            <Box className="btnGroup">
                <box className="textWrapper">
                    <div className="label">
                        Попадание
                    </div>
                    <Button variant="contained" color="secondary" className="accuracy weaponBtn"
                            onClick={accuracyClick}>
                        +{props.accuracy}
                    </Button>
                </box>
                <Box className="textWrapper">
                    <div className="label">
                        Урон
                    </div>
                    <Button variant="contained" color="secondary" className="damage weaponBtn" onClick={damageClick}>
                        {props.damage}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
let mstp = (state) => {
    return {
        personID: state.personReducer.person.id
    }
}

export default connect(mstp, {rollDiceFromStats, addNewMessage})(WeaponItem);