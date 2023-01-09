import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import {connect} from "react-redux";
import {removeNotificationMessage} from "../../../redux/dice-roller-reducer";
import style from "./common.module.css";


const SnackWithRollResult = (props) => {
    if (props.message.length === 0) {
        return '';
    }
    const handleClose = () => {
        props.removeNotificationMessage();
    };
    let beforeText = props.message[props.message.length - 1].statName ? `${props.message[props.message.length - 1].statName}: ` : '';
    let statCategory = props.message[props.message.length - 1].statCategory ? `${props.message[props.message.length - 1].statCategory}: ` : '';
    let cubeValues = props.message[props.message.length - 1].cubeValues ? `${props.message[props.message.length - 1].cubeValues}` : '';
    let result = props.message[props.message.length - 1].result ? `${props.message[props.message.length - 1].result}` : '';
    let text = props.message[props.message.length - 1].text ? `${props.message[props.message.length - 1].text}` : '';
    let message =`${beforeText}${statCategory}${text} = ${result} (${cubeValues})`;
    return (
    <Snackbar open={props.diceRollNotify} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose} className={style.xsBlock}>
            {message}
        </Alert>
    </Snackbar>
    )
}
let mstp = (state) => {
    return {
        diceRollNotify: state.diceRollerReducer.diceRollNotify,
        message: state.diceRollerReducer.message
    }
}

export default connect(mstp,{removeNotificationMessage})(SnackWithRollResult);