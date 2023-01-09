import React, {useEffect} from "react";
import style from "./DiceRoller.module.css";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChatFormRedux from "./ChatForm";
import {reset} from 'redux-form';
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import {generateKey} from "../helpers/commonHelpers";


let DiceRoller = (props) => {

    let messages = props.message.map((message, index) => {
        let customClass = '';
        let otherPlayer = style.otherPlayer;
        let personName = message.personName;;
        if(message.isCrit) customClass = style.critical;
        if(message.isLose) customClass = style.lose;
        if (message.personId === props.personID) {
            otherPlayer = '';
            personName = 'Вы';
        }
        return (
            <div  key={generateKey(message.id)} className={[customClass, otherPlayer].join(' ')}>
                <Typography variant="caption" className={otherPlayer}>{personName}: {message.statCategory} {message.statName && `${message.statName}: `}</Typography>
                {message.text} = <strong>{message.result}</strong> {message.cubeValues && "(" + message.cubeValues.join(', ') + ")"}
            </div>
        )
    });
    let conversationField = React.createRef();
    useEffect(() => {
        if (conversationField) {
            //conversationField.scrollTo(0, conversationField.scrollHeight)
                 conversationField.current.scrollTop = conversationField.current.scrollHeight;
        }

    });
    const onSubmit = (formData, dispatch) => {
        props.addNewMessage(formData.message,'','',props.personID);
        dispatch(reset('chat'));
    }

    const clickPresetButtonD4 = () => {
        props.trowPresetDice('1d4',props.personID);
    }
    const clickPresetButtonD6 = () => {
        props.trowPresetDice('1d6',props.personID);
    }
    const clickPresetButtonD8 = () => {
        props.trowPresetDice('1d8',props.personID);
    }
    const clickPresetButtonD10 = () => {
        props.trowPresetDice('1d10',props.personID);
    }
    const clickPresetButtonD12 = () => {
        props.trowPresetDice('1d12',props.personID);
    }
    const clickPresetButtonD20 = () => {
        props.trowPresetDice('1d20',props.personID);
    }
    const clickPresetButtonD100 = () => {
        props.trowPresetDice('1d100',props.personID);
    }
    const handleDelete = (index) => {
        props.deletePresetDice(props.personID, index);
    };
    const handleClick = (preset) => {
        props.addNewMessage(preset,'','',props.personID);
    };
    const preset = props.preset.map((item, index) => {
        let label = item.text;
        return <Chip variant="outlined" color="primary" label={label} onDelete={() => handleDelete(index)}
                     clickable={true} onClick={() => handleClick(label)}/>;
    })

    return (
        <>
            <CssBaseline/>
            <Box className={style.diceRollerWrapper}>
                <Box>
                    Кубикокидалка
                </Box>
                <Box className={style.chat} ref={conversationField}>
                    <Box className={style.conversation} >
                        {messages}
                    </Box>

                </Box>
                <ChatFormRedux onSubmit={onSubmit} addToPreset={props.addToPreset} personID={props.personID} preset={props.message}/>
                <div className={style.presetWrapper}>
                    <Button variant="contained" color="secondary" className={style.singleDiceBtn}
                            onClick={clickPresetButtonD4}>
                        1d4
                    </Button>
                    <Button variant="contained" color="secondary" className={style.singleDiceBtn}
                            onClick={clickPresetButtonD6}>
                        1d6
                    </Button>
                    <Button variant="contained" color="secondary" className={style.singleDiceBtn}
                            onClick={clickPresetButtonD8}>
                        1d8
                    </Button>
                    <Button variant="contained" color="secondary" className={style.singleDiceBtn}
                            onClick={clickPresetButtonD10}>
                        1d10
                    </Button>
                    <Button variant="contained" color="secondary" className={style.singleDiceBtn}
                            onClick={clickPresetButtonD12}>
                        1d12
                    </Button>
                    <Button variant="contained" color="secondary" className={style.singleDiceBtn}
                            onClick={clickPresetButtonD20}>
                        1d20
                    </Button>
                    <Button variant="contained" color="secondary" className={style.singleDiceBtn}
                            onClick={clickPresetButtonD100}>
                        1d100
                    </Button>
                </div>
                <Box className={style.presetWrapper}>
                    {preset}
                </Box>
            </Box>
        </>
    );
}
export default DiceRoller;