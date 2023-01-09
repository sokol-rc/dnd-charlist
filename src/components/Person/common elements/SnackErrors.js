import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import {connect} from "react-redux";
import {removeErrorMessages} from "../../../redux/single-person-reducer";


const SnackErrors = (props) => {
    if (!props.message) {
        return '';
    }
    const handleClose = () => {
        props.removeErrorMessages();
    };
    let message =props.message;
    return (
        <Snackbar open={props.isErrors} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="error" onClose={handleClose} >
                {message}
            </Alert>
        </Snackbar>
    )
}
let mstp = (state) => {
    return {
        isErrors: state.personReducer.isErrorMessage,
        message: state.personReducer.errorMessage
    }
}

export default connect(mstp,{removeErrorMessages})(SnackErrors);