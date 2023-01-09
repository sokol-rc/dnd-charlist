import React from "react";
import TextField from "@material-ui/core/TextField";
import style from "./common.module.css";
const MaterialTextField = ({
                             label,
                             input,
                             meta: { touched, invalid, error },
                             ...custom
                         }) => (
    <TextField
        label={label}
        className={style.textField}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)
export default MaterialTextField;