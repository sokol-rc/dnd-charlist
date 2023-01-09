import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Container from "@material-ui/core/Container";
import PersonBodyContainer from "./components/Person/PersonEditModeForm";
import {PersonCardsContainer} from "./components/PersonCards/PersonCardsContainer";
import "firebase";
import "firebase/firestore";
import firebase from "firebase/app";
const App = (props) => {


    return (
        <>
        <BrowserRouter>
            <Container maxWidth={false} disableGutters className="App">
                <Header/>
                <Container maxWidth="lg">
                <Switch>
                    <Route exact path="/" component={PersonCardsContainer} />
                    <Route path="/charnik/:personUrl" component={PersonBodyContainer}/>
                </Switch>
            </Container>
        </Container>
        </BrowserRouter>
        </>
    );
}

export default App;
