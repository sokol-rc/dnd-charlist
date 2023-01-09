import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {getSignFromNum} from "../../helpers/DicerHelper";

const SecondStatListItem = (props) => {
    let classList = props.customClickEvent ? 'listItem' : 'listItem nested';
    let modifierSignValue = '';
    let modifierWithoutSign = props.modifier;

    if (!isNaN(Number(modifierWithoutSign))) {
        modifierSignValue = getSignFromNum(props.modifier);
        modifierWithoutSign = Math.abs(props.modifier);
    }

    let handleClick = () => {
        if (props.customClickEvent) {
            props.customClickEvent();
        } else {
            props.rollDiceFromStats(props.modifier, props.name, props.category, props.personID);
        }
    }
    //TODO: Cursor click on skills. Add hover effect like button.
    classList = props.picked === true ? classList + " colorPicked" : classList;
    return (
        <ListItem button className={classList} onClick={handleClick}>

            <ListItemText primary={props.name}/>
            <ListItemSecondaryAction>
                {modifierSignValue}{modifierWithoutSign}
            </ListItemSecondaryAction>
        </ListItem>
    )
}
export default SecondStatListItem;