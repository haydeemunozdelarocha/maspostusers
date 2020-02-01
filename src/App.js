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
    const userCookie = getUserCookie(cookies);
    const isUserLoggedIn = isLoggedIn(userCookie);
    const isUserLoggedInAndSuperAdmin = isSuperAdmin(userCookie) && isUserLoggedIn;
    const isUserRegistrationComplete = isSuperAdmin(userCookie) ? true : !!userCookie && userCookie.profileStatus > 1;
    const logoutAndRedirect = (isAdmin) => {
        logOut(cookies);

        if (isAdmin) {
            return <LoginPage isAdmin={true}/>;
        } else {
            return <Redirect to={{ pathname: '/', props: {user: userCookie} }} />;
        }
    };

    const checkAdminUser = (e) => {
        console.log(e.match.path);
        console.log('user', userCookie, isUserLoggedIn, isSuperAdmin(userCookie))
        if (!isUserLoggedIn || !isSuperAdmin(userCookie)) {
            return logoutAndRedirect(!isUserLoggedIn);
        }
        return getAdminComponent(e.match.path);
    };

    const getAdminComponent = (route) => {
        console.log('w', isUserLoggedInAndSuperAdmin, isUserLoggedIn)
        if (isUserLoggedInAndSuperAdmin) {
            switch(route) {
                case '/admin/confirm-express-pickup':
                    return <ConfirmExpressPickup/>;
                case '/admin/captura':
                    return <InventoryCapture/>;
                case '/admin/dashboard':
                case '/admin':
                    return <AdminDashboard/>;
                case '/admin/reports':
                    return <AdminReports/>;
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
                    <Header isLoggedIn={isUserRegistrationComplete} showLogout={isUserLoggedIn}/>
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
                    <Route path="/registro" exact render={() => (isUserLoggedIn && isUserRegistrationComplete ? <Redirect to={{ pathname: '/' }} /> : <Register user={userCookie}/>)} />
                    <Route path="/admin" render={checkAdminUser} />
                    <Route path="/admin/confirm-express-pickup" exact render={checkAdminUser} />
                    <Route path="/admin/captura" exact render={checkAdminUser} />
                    <Route path="/admin/dashboard" exact render={checkAdminUser} />
                    <Route path="/admin/reports" exact render={checkAdminUser} />
                    <Route path="/logout" exact render={() => {
                        return logoutAndRedirect();
                    }} />
                </Router>
            </MuiThemeProvider>
            <Footer/>
        </React.Fragment>
    );
}


export default withCookies(App);
