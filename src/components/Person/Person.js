import React from "react";
import Grid from "@material-ui/core/Grid";
import "./person.css";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import MainStatsContainer from "./Stats/MainStatsContainer";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import CurrentHitts from "./common elements/CurrentHitts";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import SaveBtn from "./common elements/SaveBtn";
import Fade from "@material-ui/core/Fade";
import {Field} from "redux-form";
import MaterialTextField from "./common elements/MaterialTextField";
import FileUploadForm from "./common elements/FileUploadField";
import SnackWithRollResult from "./common elements/SnackWithRollResult";
//import Editor from "./common elements/Editor";
import SnackErrors from "./common elements/SnackErrors";
import EditorContainer from "./common elements/EditorContainer";



const number = value => value && isNaN(Number(value)) ? 'ЧИСЛО!' : undefined
class Person extends React.Component {

    componentWillMount() {
        let personUrl = this.props.match.params.personUrl;
        //uncomment this for release build
        if (!this.props.DEVELOPER_MODE) {
            this.props.getPerson(personUrl);

        }
    }

    editBtnClick = () => {
        this.props.changeEditMode();
    }
    saveBtnClick = () => {
        this.props.savePersonData();
    }

    render() {
        if (this.props.person === null) {
            return '';
        }
        return (
            <>
                <SnackErrors/>
                <Grid container spacing={3} alignItems="center" className="head">
                    <Grid item xs={12} sm={4}>
                        <Box className="person">
                            {this.props.editMode && <>
                                <Field
                                    component={FileUploadForm}
                                    className="avatarInput"
                                    name="avatarUrl"
                                    id="contained-button-file"
                                    personID={this.props.person.id}
                                    setNewAvatar={this.props.setNewAvatar}

                                />
                                <label htmlFor="contained-button-file">
                                    <Avatar alt="personName" src={this.props.person.avatarUrl} className="avatar"/>
                                </label>
                            </>}
                            {!this.props.editMode &&
                            <Avatar alt="personName" src={this.props.person.avatarUrl} className="avatar"/>}

                            <Box className="personInfoWrapper">
                                <div className="titleWrapper">
                                    {this.props.editMode ?
                                        <Typography variant="h4" component="h2">
                                        <Field name="name" component={MaterialTextField} type="text" /></Typography>
                                                          :
                                        <Typography variant="h4" component="h2">{this.props.person.name}</Typography>
                                    }
                                    {this.props.editMode ?
                                        <Typography variant="caption" display="block" gutterBottom>
                                            <Field name="level" component={MaterialTextField} type="text" />ур.</Typography>
                                        :
                                        <Typography variant="caption" display="block" gutterBottom>{this.props.person.level} ур.</Typography>
                                    }
                                    {this.props.editMode ?
                                        <><Field name="race" component={MaterialTextField} type="text" />
                                            <Field name="class" component={MaterialTextField} type="text" /></>
                                        :
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {this.props.person.race} {this.props.person.class}
                                        </Typography>
                                    }

                                </div>
                                <Box>
                                    {!this.props.editMode && <Fade in>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className="editBtn"
                                            onClick={this.editBtnClick}
                                            startIcon={<EditIcon/>}
                                        >
                                        </Button>
                                    </Fade>}
                                    {this.props.editMode &&
                                    <Fade in>
                                        <SaveBtn />
                                    </Fade>
                                    }

                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} className="lifeStatsWrapper">
                        <Box className="lifeStats">
                            <Paper elevation={3} className="armorClass">
                                <div className="name">
                                    КД
                                </div>
                                <div className="mainStatValue">
                                    {this.props.editMode ?
                                        <Field name="lifeStats.ac" component={MaterialTextField} type="text" />
                                        :
                                        <>{this.props.person.lifeStats.ac}</>
                                    }
                                </div>
                            </Paper>
                            <Paper elevation={3} className="hits">
                                <div className="name">
                                    Текущие хиты
                                </div>
                                {this.props.editMode ?
                                    <Field name="lifeStats.currentHP" component={MaterialTextField} type="text" />
                                    :
                                    <CurrentHitts hp={this.props.person.lifeStats.currentHP}
                                                  setCurrentHP={this.props.setCurrentHPApi}
                                                  personID={this.props.person.id}/>
                                }

                                <Box>
                                    <Divider/>
                                    <div className="mainStatValue maxHP">
                                        {this.props.editMode ?
                                            <Field name="lifeStats.maxHP" component={MaterialTextField} type="text" />
                                            :
                                            <>{this.props.person.lifeStats.maxHP}</>
                                        }

                                    </div>
                                </Box>

                            </Paper>
                            <Paper elevation={3} className="hitDice">
                                <div className="name">
                                    Кость хитов
                                </div>
                                <div className="value">
                                    {this.props.editMode ?
                                        <Field name="lifeStats.diceHP" component={MaterialTextField} type="text" />
                                        :
                                        <div onClick={ () => {
                                            this.props.addNewMessage(this.props.person.lifeStats.diceHP, 'Кость хитов');
                                        }}>{this.props.person.lifeStats.diceHP}</div>
                                    }
                                </div>
                            </Paper>
                        </Box>
                        <Box className="lifeStats">
                            <Paper elevation={3} className="masterBonus">
                                <div className="name">
                                    БМ
                                </div>
                                <div className="value">
                                    {this.props.editMode ?
                                        <>+<Field name="lifeStats.masterBonus" component={MaterialTextField} type="text" validate={[ number ]}/></>
                                        :
                                        <>+{this.props.person.lifeStats.masterBonus}</>
                                    }
                                </div>
                            </Paper>
                            <Paper elevation={3} className="savingThrowsDead">
                                <div className="name">
                                    Спасы от смерти
                                </div>
                                <FormGroup row className="row">
                                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>
                                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>
                                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>
                                </FormGroup>
                                <FormGroup row className="row">
                                    <Checkbox name="checkedH"/>
                                    <Checkbox name="checkedH"/>
                                    <Checkbox name="checkedH"/>
                                </FormGroup>

                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                <Divider variant="middle"/>
                <MainStatsContainer/>

                <EditorContainer />
                <SnackWithRollResult/>
            </>
        )
    }

}
export default Person;