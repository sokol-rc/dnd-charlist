import React from "react";
import Fab from "@material-ui/core/Fab";
import clsx from "clsx";
import green from "@material-ui/core/colors/green";
import {makeStyles} from "@material-ui/core/styles";
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import { submit } from 'redux-form'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
const SaveBtn = (props) => {

    let success = props.isPersonDataSaved;
    let loading = props.isPersonDataFetching;
    const classes = useStyles();
    const handleButtonClick = () => {
        props.dispatch(submit('PersonEditModeForm'));
    }
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    onClick={handleButtonClick}
                >
                    {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
        </div>
    )
}
export default connect(state => ({
    isPersonDataSaved: state.personReducer.isPersonDataSaved,
    isPersonDataFetching: state.personReducer.isPersonDataFetching,
}))(SaveBtn)