import React from "react";
import WeaponItem from "../common elements/WeaponItem";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import {Field, FieldArray} from "redux-form";
import Paper from "@material-ui/core/Paper";
import MaterialTextField from "../common elements/MaterialTextField";
import {addNewWeapon, removeCurrentWeapon} from "../../../redux/single-person-reducer";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";

const weaponFields = (props) => {
    return (
        <>
            {props.fields.map((weapon, index) => (
                <Paper elevation={3} className="weaponItem">
                    <box>
                        <div className="label">
                            Название оружия
                        </div>
                        <div>
                            <Field
                                name={`weapons.${index}.name`}
                                type="text"
                                label="Название оружия"
                                component={MaterialTextField}
                            />
                        </div>
                    </box>
                    <Box className="btnGroup">
                        <box>
                            <div className="label">
                                Попадание
                            </div>
                            <div>
                                <Field
                                    name={`weapons.${index}.accuracy`}
                                    type="text"
                                    label="Модификатор попадания"
                                    component={MaterialTextField}
                                />
                            </div>
                        </box>
                        <Box>
                            <div className="label">
                                Урон
                            </div>
                            <div>
                                <Field
                                    name={`weapons.${index}.damage`}
                                    type="text"
                                    label="Урон"
                                    component={MaterialTextField}
                                />
                            </div>
                        </Box>
                    </Box>
                    <IconButton aria-label="delete" onClick={() => props.removeCurrentWeapon(index)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Paper>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={() => props.addNewWeapon()}
                startIcon={<AddIcon />}
            >
                Добавить оружие
            </Button>
        </>
    )
}
const Weapons = (props) => {

    let weapons = props.weapons.map((weapon, index) => (
        <WeaponItem key={index + 99} name={weapon.name} accuracy={weapon.accuracy} damage={weapon.damage}/>));
    //TODO: ПОПРАВЬ ДИЗАЙН!!!!!
    return (
        <>
            {props.editMode ?
                <FieldArray name="weapons" removeCurrentWeapon={props.removeCurrentWeapon} addNewWeapon={props.addNewWeapon} fields={props.weapons} component={weaponFields}/>
                :
                <>{weapons}</>
            }

        </>
    );
}

const mstp = (state) => {
    return {
        weapons: state.personReducer.person.weapons,
        editMode: state.personReducer.editMode
    }
}
export default connect(mstp, {addNewWeapon, removeCurrentWeapon})(Weapons);