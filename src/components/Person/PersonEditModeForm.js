import React from 'react'
import {reduxForm} from 'redux-form'
import PersonContainer from "./PersonContainer";
import {connect} from "react-redux";
import {savePersonData} from "../../redux/single-person-reducer";


let PersonBody = (props) => {
    return (<>
            {props.editMode && <PersonEditModeForm component={<PersonContainer/>}/>}
            {!props.editMode && <PersonContainer/>}
        </>
    )
}
let PersonBodyContainer = connect(state => ({
    editMode: state.personReducer.editMode
}))(PersonBody)

const handleSubmit = (values, dispatch) => {
    console.log(values);
    dispatch(savePersonData(values));

}
let PersonEditModeForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {props.component}
        </form>
    )
}

PersonEditModeForm = reduxForm({
    form: 'PersonEditModeForm', // a unique identifier for this form
    onSubmit: handleSubmit // submit function must be passed to onSubmit
})(PersonEditModeForm)
let mstp = (state) => ({initialValues: state.personReducer.person})
PersonEditModeForm = connect(mstp, {savePersonData})(PersonEditModeForm)

export default PersonBodyContainer;