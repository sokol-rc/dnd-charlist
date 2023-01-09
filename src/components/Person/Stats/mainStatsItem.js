import React from "react";
import Paper from "@material-ui/core/Paper";

const MainStatsItem = (props) => {
const handleClick = () => {
    props.rollDiceFromStats(props.modifier, props.statName, '', props.personID);
}
    return (
        <Paper elevation={3} className="mainStatItem" onClick={handleClick}>
            <div className="name">
                {props.statName}
            </div>
            <div className="mainStatValue">
                {props.value}
            </div>
            <Paper elevation={3} className="mainStatModifier">
                {props.modifier}
            </Paper>
        </Paper>
    )
}
export default MainStatsItem;