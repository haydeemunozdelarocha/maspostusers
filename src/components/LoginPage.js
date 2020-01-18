import React from 'react';
import LoginForm from "./LoginForm";
import { withCookies } from 'react-cookie';
import LandingPage from "./LandingPage";

const LoginPage = (props) => {
    return (
        <LandingPage>
            <LoginForm isAdmin={props.isAdmin} cookies={props.cookies}/>
        </LandingPage>
    );
}

export default withCookies(LoginPage);
