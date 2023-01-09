import React from "react";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import style from "./SpellSlots.module.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Box from "@material-ui/core/Box";
import {addNewSlotCircle, deleteSlotCircle, setConsumedSlotApi} from "../../../redux/single-person-reducer";
import {Field, FieldArray} from "redux-form";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    slotsCategory: {
        paddingRight: "5px",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0px"
    }
});
const SelectField = ({
                         input,
                         label,
                         meta: {touched, error},
                         children,
                         ...custom
                     }) => {
    return <>
        <FormControl error={touched && error}>
            <NativeSelect {...input} {...custom}>
                {children}

            </NativeSelect>
        </FormControl>
    </>
}
const SpellSlotsFields = (props) => {
    const classes = useStyles();
    let slotsArray = props.fields.map((slotsCategory, categoryIndex) => {
        let row = slotsCategory.slots.map((slotRow, index) => {
            let optionsArr = [...Array(20)].map((item, index) => {
                return <option key={index + 1000} value={index}>{index}</option>
            })
            return <>
                <div className={style.slotsFieldWrapper}>
                    <div className={style.slotrowname}>Круг: {slotRow.name === '' ? 1 : slotRow.name}</div>
                    <Field
                        name={`spellSlots.${categoryIndex}.slots.${index}.max`}
                        type="text"
                        value={1}
                        component={SelectField}
                    >
                        {optionsArr}
                    </Field>

                </div>
            </>;
        })

        return <>
            <div className={classes.slotsCategory}>
                <div>
                    <div className={style.slotsCategoryIconWrapper}>
                        {slotsCategory.name && <div className={style.slostCategory}>{slotsCategory.name}</div>}
                        <IconButton aria-label="Добавить круг" className={style.iconAdd}
                                    onClick={() => props.addNewSlotCircle(slotsCategory.id)}>
                            <AddCircleIcon/>
                        </IconButton>
                        <IconButton aria-label="Удалить круг" className={style.iconAdd}
                                    onClick={() => props.deleteSlotCircle(slotsCategory.id)}>
                            <RemoveCircleIcon/>
                        </IconButton>
                    </div>
                    {row}
                </div>
                <IconButton aria-label="Удалить категорию ячеек" className={style.iconDelete}
                            onClick={() => props.deleteSlotCircle(slotsCategory.id)}>
                    <DeleteIcon/>
                </IconButton>
            </div>


        </>
    })
    return (
        <>
            {slotsArray}
        </>
    )
}

const SpellSlots = (props) => {
    if (props.spellSlots === null) {
        return '';
    }
    let slotsCategory = props.spellSlots.map((slotsCategory, index) => {

        let row = slotsCategory.slots.map((slotRow, index) => {
            const unCheck = () => {
                props.setConsumedSlotApi(slotsCategory.id, slotRow.id, false, props.personID)
            }
            const Check = () => {
                props.setConsumedSlotApi(slotsCategory.id, slotRow.id, true, props.personID)
            }
            let consumedSlots = [...Array(slotRow.consumed)].map((slot, index) => {
                return <FormControlLabel key={`11${index}`} className={style.heroDice} checked onChange={unCheck}
                                         control={<Checkbox icon={<RadioButtonUncheckedIcon/>}
                                                            checked={true}
                                                            checkedIcon={<RemoveCircleIcon/>}
                                                            name="checkedH"/>}/>
            });
            let emptySlots = [...Array(slotRow.max - slotRow.consumed)].map((slot, index) => {
                return <FormControlLabel key={`12${index}`} className={style.heroDice} onChange={Check}
                                         control={<Checkbox icon={<RadioButtonUncheckedIcon/>}
                                                            checked={false}
                                                            checkedIcon={<RemoveCircleIcon/>}
                                                            name="checkedH"/>}/>
            });
            let slots = consumedSlots.concat(emptySlots);
            return <>
                <Box className={style.slotsRowInside}>
                    <div className={style.slotsCircle}>{slotRow.name}</div>
                    <Box className={style.row}>
                        {slots}
                    </Box>

                </Box>
            </>
        });

        return <>
            <FormGroup key={index} column className={style.slotsRow}>
                {slotsCategory.name && <div className={style.slotsLabel}>{slotsCategory.name}</div>}
                {row}
            </FormGroup>
        </>
    });
    return (
        <Paper elevation={3} className={style.slotsWrapper}>
            {props.editMode ?
                <FieldArray name="spellSlots" fields={props.spellSlots} addNewSlotCircle={props.addNewSlotCircle}
                            deleteSlotCircle={props.deleteSlotCircle} component={SpellSlotsFields}/>
                :
                <>{slotsCategory}</>
            }

        </Paper>
    );
}
const mstp = (state) => {
    return {
        spellSlots: state.personReducer.person.spellSlots,
        personID: state.personReducer.person.id,
        editMode: state.personReducer.editMode
    }
}
export default connect(mstp, {setConsumedSlotApi, addNewSlotCircle, deleteSlotCircle})(SpellSlots);