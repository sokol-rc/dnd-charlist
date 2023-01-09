import React, {useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import "firebase/auth";
import firebase from "firebase";
import {firebaseConfig} from "../Api/firebaseConfig";


const auth = firebase.auth();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,

    },
    logo: {
        color: '#fff',
        textDecoration: 'none'
    },
}));

const SignIn = () => {
    const SignInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    const classes = useStyles();
    return <>
        <Button className={classes.btnSignIn} onClick={SignInWithGoogle}>Войти в чат через Google</Button>
    </>
}
const SignOut = () => {
    const classes = useStyles();
    return auth.currentUser && (
        <Button className={classes.btnSignOut} onClick={() => auth.signOut()}>Выйти из чата</Button>
    )
}

const Header = () => {
    const classes = useStyles();
    const [user] = useAuthState(auth);

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" underline="none" color="primary" className={classes.logo}>
                                Чарник
                            </Link>
                        </Typography>
                        <section>
                            {user ? <SignOut /> : <SignIn />}
                        </section>
                        <Button color="inherit" className={classes.loginBtn}>Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header;