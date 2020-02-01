import React from 'react';
import LoginForm from "./LoginForm";
import { withCookies } from 'react-cookie';
import LandingPage from "./LandingPage";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
    return (
        <LandingPage>
            <LoginForm errorMessage={props.errorMessage} isAdmin={props.isAdmin} cookies={props.cookies}/>
        </LandingPage>
    );
}

export default withRouter(withCookies(LoginPage));
