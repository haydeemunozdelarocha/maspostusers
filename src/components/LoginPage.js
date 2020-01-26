import React from 'react';
import LoginForm from "./LoginForm";
import { withCookies } from 'react-cookie';
import LandingPage from "./LandingPage";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
    // const  errorMessage = props.history.location.state.errorMessage;
    // console.log('errors?', {...props.history.location.state}, errorMessage)
    return (
        <LandingPage>
            <LoginForm errorMessage={props.errorMessage} isAdmin={props.isAdmin} cookies={props.cookies}/>
        </LandingPage>
    );
}

export default withRouter(withCookies(LoginPage));
