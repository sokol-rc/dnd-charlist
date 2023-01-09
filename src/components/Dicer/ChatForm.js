import Box from "@material-ui/core/Box";
import style from "./DiceRoller.module.css";
import Paper from "@material-ui/core/Paper";
import {Field, reduxForm} from "redux-form";
import Divider from "@material-ui/core/Divider";
import DirectionsIcon from "@material-ui/icons/Directions";
import React from "react";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from '@material-ui/icons/Add';
const renderTextField = (
    { input, onChange, className, value, ...custom},
) => (
    <InputBase
        className={className}
        placeholder="2d8+6"
        onChange={input.onChange}
        value={input.value}
        {...custom}
    />
);

const ChatForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Box className={style.inputPanel}>
                <Paper component="form" className={style.inputForm}>
                    <Field name="message" component={renderTextField} className={style.input} />

                    <Divider className={style.divider} orientation="vertical"/>
                    <button type="button" color="primary" className={style.iconButton} aria-label="directions" onClick={() => {props.addToPreset(props.personID, props.preset)}} >
                        <AddIcon/>
                    </button>
                    <button type="submit" color="primary" className={style.iconButton} aria-label="directions" >
                        <DirectionsIcon/>
                    </button>

                </Paper>
            </Box>
        </form>
    );
}



const ChatFormRedux = reduxForm({
    // a unique name for the form
    form: 'chat'
})(ChatForm)
export default ChatFormRedux;