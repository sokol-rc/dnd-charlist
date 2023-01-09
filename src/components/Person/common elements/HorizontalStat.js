import Paper from "@material-ui/core/Paper";
import {Field} from "redux-form";
import MaterialTextField from "./MaterialTextField";
import React from "react";

export const HorizontalStat = (props) => {

    const handleClick = () => {
        props.rollDiceFromStats(props.value, props.name, '', props.personID);
    }
    const params = {};
    let customClass = 'mainStatTopSide';
    if(props.rollDiceFromStats) params.onClick = handleClick;
    if(props.rollDiceFromStats) customClass = customClass + ' cursorPointer';
    return (
        <Paper elevation={3} className={customClass} {...params}>

            <div className="name">
                {props.name}
            </div>
            <div className="mainStatValue">
                {props.editMode ?
                    <Field name={props.fieldName} component={MaterialTextField} type="text"/>
                    :
                    <>{props.value}</>
                }
            </div>
        </Paper>
    )
}
