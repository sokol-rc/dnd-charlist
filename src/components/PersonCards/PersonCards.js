import React, {useEffect} from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: 10,
    },

    card: {
        display: 'flex',
        alignItems: 'center'

    },
    name: {},
    cardInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    additionalInfo: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            paddingRight: theme.spacing(1)
        },
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2)
    }
}));


const PersonCards = (props) => {
    useEffect(() => {
        if (!props.DEVELOPER_MODE) {
            if (!props.cards) {
                props.getCards();
            }
        }
    });
    const classes = useStyles();
if (!props.cards) {
    return null;
}
    let personCardsList = props.cards.map((card) => {
        return (<>
                <Link to={card.url} underline="none">
                    <Paper className={classes.root} elevation={3}>
                        <CardContent className={classes.card}>
                            <Avatar alt="personName" src={card.person.avatarUrl} className={classes.avatar}/>
                            <Box className={classes.cardInfo}>
                                <Box className={classes.name}>
                                    <Typography variant="h5" component="h2">
                                        {card.person.name}
                                    </Typography>
                                </Box>
                                <Box className={classes.additionalInfo}>
                                    <Typography color="textSecondary">
                                        {card.person.level} лвл
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {card.person.race}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {card.person.class}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Paper>
                </Link>
            </>
        )
    });

    return (
        <>
            <Box>
                <Typography variant="h3" align="center" color="textSecondary" gutterBottom>
                    Список персонажей
                </Typography>
            </Box>
            {props.cards && personCardsList}
        </>
    )
}
export default PersonCards;