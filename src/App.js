import React from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { withCookies } from 'react-cookie';
import 'bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inventory from "./components/Inventory";
import InventoryCapture from "./components/InventoryCapture";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from "./components/AdminDashboard";
import AdminReports from "./components/AdminReports";
import ConfirmExpressPickup from "./components/ConfirmExpressPickup";
import Register from "./components/Register";
import {isSuperAdmin, getUserCookie, logOut, isLoggedIn} from './helpers/authentification';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: "https://3023cd63d3aa45af8b8b9b325f18dbe3@sentry.io/2357811",  environment: process.env.NODE_ENV});

const defaultTheme = createMuiTheme({
    typography: {
        fontFamily: "Montserrat",
        palette: {
            primary: 'rgb(28, 81, 198)',
            secondary: 'rgb(214, 223, 63)',
        },
    }
});

const App = (props) => {
    const { cookies } = props;
    Sentry.configureScope(function(scope) {
        scope.setUser(getUserCookie(cookies));
    });
    const userCookie = getUserCookie(cookies);
    const isUserLoggedIn = isLoggedIn(userCookie);
    const isUserLoggedInAndSuperAdmin = isSuperAdmin(userCookie) && isUserLoggedIn;
    const isUserRegistrationComplete = isSuperAdmin(userCookie) ? true : !!userCookie && (userCookie.profileStatus !== '0' && userCookie.profileStatus !== '1');
    const logoutAndRedirect = (e) => {
        logOut(cookies);
        console.log(userCookie);

        if (e.match && e.match.path && e.match.path.includes('admin')) {
            console.log('redirecting to admin');
            return <Redirect to={{ pathname: '/admin', props: {user: undefined} }} />;
        }

        return <Redirect to={{ pathname: '/', props: {user: undefined} }} />;
    };

    const checkAdminUser = (e) => {
        if (isUserLoggedIn) {
            console.log('wha', isUserLoggedIn, isSuperAdmin(userCookie));
            if (!isSuperAdmin(userCookie)) {
                console.log('loggin out an redirect')
                return logoutAndRedirect(!isUserLoggedIn);
            }
        }

        return getAdminComponent(e.match.path);
    };

    const getAdminComponent = (route) => {
        if (isUserLoggedInAndSuperAdmin) {
            switch(route) {
                case '/admin/confirm-express-pickup':
                    return <ConfirmExpressPickup/>;
                case '/admin/captura':
                    return <InventoryCapture/>;
                case '/admin/dashboard':
                    return <AdminDashboard/>;
                case '/admin/reports':
                    return <AdminReports/>;
                case '/admin':
                    return <Redirect to={{ pathname: '/admin/dashboard', props: {user: userCookie} }} />;
                default:
                    return <Redirect to={{ pathname: '/admin', props: {user: userCookie} }} />;
            }
        } else {
            return <LoginPage isAdmin={true}/>;
        }
    };

    return (
        <React.Fragment>
            <MuiThemeProvider theme={defaultTheme}>
                <Router>
                    <Header isSuperAdmin={isSuperAdmin(userCookie)} isLoggedIn={isSuperAdmin(userCookie) || isUserRegistrationComplete} showLogout={isUserLoggedIn}/>
                    <Route path="/" exact render={(props) => {
                        if (isUserLoggedIn && !isSuperAdmin(userCookie)) {
                            return (isUserRegistrationComplete ? <Dashboard/> : <Redirect to={{ pathname: '/registro', props: {user: userCookie} }} />);
                        } else {
                            if (isSuperAdmin(userCookie)) {
                                return <Redirect to={{ pathname: '/admin', props: {user: userCookie} }} />;
                            }

                            const  errorMessage = props.history.location.state ? props.history.location.state.errorMessage : undefined;
                            return <LoginPage errorMessage={errorMessage}/>;
                        }
                    }} />
                    <Route path="/forgot-password" render={() => <ForgotPassword />} />
                    <Route path="/reset-password" render={() => <ResetPassword />} />
                    <Route path="/home" exact render={() => (isUserLoggedIn ? <Dashboard/> : <LoginPage />)} />
                    <Route path="/inventario" exact render={() => (isUserLoggedIn ? <Inventory/> : <LoginPage />)} />
                    <Route path="/registro" exact render={() => {
                        if (isUserLoggedIn) {
                            if (isUserRegistrationComplete) {
                                return <Dashboard/>;
                            }

                            return <Register user={userCookie}/>;
                        }

                        return <Register user={{profileStatus: 0}}/>;
                    }} />
                    <Route path="/admin" exact render={(e) => checkAdminUser(e, true)} />
                    <Route path="/admin/confirm-express-pickup" exact render={()=> (<ConfirmExpressPickup/>)} />
                    <Route path="/admin/captura" exact render={checkAdminUser} />
                    <Route path="/admin/dashboard" exact render={checkAdminUser} />
                    <Route path="/admin/reports" exact render={checkAdminUser} />
                    <Route path="/logout" exact render={logoutAndRedirect} />
                </Router>
            </MuiThemeProvider>
            <Footer/>
        </React.Fragment>
    );
}


export default withCookies(App);
