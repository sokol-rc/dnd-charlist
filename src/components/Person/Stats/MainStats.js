import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import "./mainStats.css";
import MainStatsItem from "./mainStatsItem";
import List from "@material-ui/core/List";
import SecondStatListItem from "../common elements/secondStatListItem";
import {Collapse} from "@material-ui/core/";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import DiceRollerContainer from "../../Dicer/DiceRollerContainer";
import {getMainStatModifier} from "../../helpers/DicerHelper";
import Box from "@material-ui/core/Box";
import {Field} from "redux-form";
import MaterialTextField from "../common elements/MaterialTextField";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import {HorizontalStat} from "../common elements/HorizontalStat";
import Weapons from "../weapons/Weapons";
import SpellSlots from "../SpellSlots/SpellSlots";

//validation fields
const number = value => value && isNaN(Number(value)) ? 'ЧИСЛО!' : undefined

const MainStats = (props) => {
    const [open, setOpen] = useState({0: false, 1: false, 2: false, 3: false, 4: false, 5: false});


    let getMainStats = props.stats.map((stat, index) => {
        let modifier = getMainStatModifier(stat.value);
        return <MainStatsItem key={index + 10} statName={stat.translate} value={stat.value} modifier={modifier} rollDiceFromStats={props.rollDiceFromStats} personID={props.personID}/>
    });
    let getMainStatsForm = props.stats.map((stat, index) => {
        let input = <Field key={index + 1100} name={'stats.' + index + '.value'} className="littleField"
                           validate={[number]}
                           component={MaterialTextField} type="text"/>
        return <MainStatsItem key={index + 10} statName={stat.translate} value={input}/>
    });

    let getSavingThrows = props.savingThrows.map((stat, index) => {

        return <SecondStatListItem key={index + 1000} name={stat.translate} category="Спас" modifier={stat.value}
                                   personID={props.personID}
                                   rollDiceFromStats={props.rollDiceFromStats}/>
    });
    let getSavingThrowsForm = props.savingThrows.map((stat, index) => {
        let input = <Field key={index + 1100} name={'savingThrows.' + index + '.value'} className="littleField"
                           validate={[number]}
                           component={MaterialTextField} type="text"/>
        return <SecondStatListItem key={index + 1000} name={stat.translate} modifier={input}/>

    });

    let getSkills = props.stats.map((stat, index) => {
        if (stat.skills.length === 0) {
            return '';
        }
        let modifier = getMainStatModifier(stat.value);
        let skills = stat.skills.map((skill) => {
            return <SecondStatListItem key={index + 2100} name={skill.translate} category="" validate={[number]}
                                       personID={props.personID}
                                       modifier={skill.value} picked={skill.picked}
                                       rollDiceFromStats={props.rollDiceFromStats}/>
        });
        return <>
            <SecondStatListItem key={index} name={stat.translate} modifier={modifier}
                                customClickEvent={() => {
                                    setOpen(state => (
                                            {...state, [index]: !state[index]}
                                        )
                                    )
                                }
                                }/>
            <Collapse key={index + 100} in={open[index]} timeout="auto" unmountOnExit>
                {skills}
            </Collapse>
            <Divider/>
        </>
    });
    let getSkillsForm = props.stats.map((stat, index) => {
        if (stat.skills.length === 0) {
            return '';
        }

        let modifier = getMainStatModifier(stat.value);
        let skills = stat.skills.map((skill, indexSkill) => {
            let input = <Field key={indexSkill + 1100} name={'stats.' + index + '.skills.' + indexSkill + '.value'}
                               validate={[number]}
                               className="littleField" component={MaterialTextField} type="text"/>
            return <SecondStatListItem name={skill.translate} modifier={input} picked={skill.picked}/>
        });
        return <>
            <SecondStatListItem key={index} name={stat.translate} modifier={modifier}
                                customClickEvent={() => {
                                    setOpen(state => (
                                            {...state, [index]: !state[index]}
                                        )
                                    )
                                }
                                }/>
            <Collapse key={index + 100} in={open[index]} timeout="auto" unmountOnExit>
                {skills}
            </Collapse>
            <Divider/>
        </>
    });

    if (!props.lifeStats) {
        return <></>
    }
    return (
        <>
            <Grid container spacing={3} className="head">
                <Grid item xs={12} sm={3}>
                    <HorizontalStat name="Пассивная внимательность" editMode={props.editMode}
                                    fieldName="lifeStats.passiveAttention" value={props.lifeStats.passiveAttention}/>
                    <HorizontalStat name="Вдохновение" editMode={props.editMode} fieldName="lifeStats.inspiration"
                                    value={props.lifeStats.inspiration}/>
                    <HorizontalStat name="Инициатива" editMode={props.editMode} fieldName="lifeStats.initiative"
                                    value={'+'+props.lifeStats.initiative} personID={props.personID}
                                    rollDiceFromStats={props.rollDiceFromStats}/>

                    <Divider variant="middle"/>
                    <Box className="mainStat">
                        {props.editMode ?
                            <>{getMainStatsForm}</>
                            :
                            <>{getMainStats}</>
                        }
                    </Box>

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Paper elevation={3}>
                        <List component="nav" className="savingThrows" aria-label="contacts" subheader="Спасброски">
                            {props.editMode ?
                                <>{getSavingThrowsForm}</>
                                :
                                <>{getSavingThrows}</>
                            }
                        </List>
                    </Paper>
                    <Paper elevation={3}>
                        <List component="nav" className="secondStats" aria-label="contacts" subheader="Умения">
                            {props.editMode ?
                                <>{getSkillsForm}</>
                                :
                                <>{getSkills}</>
                            }
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="lifeStats">
                    {/*Weapons block start*/}
                    <Grid item xs={12} lg={6}>
                        <Weapons/>
                            <SpellSlots/>
                    </Grid>
                    {/*Spell slots block*/}

                    <Grid item xs={12} lg={6}>
                        <DiceRollerContainer/>
                    </Grid>
                    <Grid item xs={12}>
                        {/*<FroalaEditorComponent model={props.textContent} config={config} onModelChange={handleChangeTextContent} />*/}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default MainStats;