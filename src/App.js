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
import Register from "./components/Register";
import {isSuperAdmin, getUserCookie, logOut, isLoggedIn} from './helpers/authentification';

const App = (props) => {
    const { cookies } = props;
    const userCookie = getUserCookie(cookies);
    const isUserLoggedIn = isLoggedIn(userCookie);
    const isUserLoggedInAndSuperAdmin = isSuperAdmin(userCookie) && isUserLoggedIn;
    const isUserRegistrationComplete = !!userCookie && userCookie.perfil_status == 2;
    console.log('registered?', isUserRegistrationComplete)
    return (
        <React.Fragment>
            <Router>
                <Header isLoggedIn={isUserRegistrationComplete} showLogout={isUserLoggedIn}/>
                <Route path="/" exact render={(props) => {
                    if (isUserLoggedIn) {
                        return (isUserRegistrationComplete ? <Dashboard/> : <Redirect to={{ pathname: '/registro', props: {user: userCookie} }} />);
                    } else {
                        const  errorMessage = props.history.location.state ? props.history.location.state.errorMessage : undefined;
                        return <LoginPage errorMessage={errorMessage}/>;
                    }
                }} />
                <Route path="/forgot-password" render={() => <ForgotPassword />} />
                <Route path="/reset-password" render={() => <ResetPassword />} />
                <Route path="/home" exact render={() => (isUserLoggedIn ? <Dashboard/> : <LoginPage />)} />
                <Route path="/inventario" exact render={() => (isUserLoggedIn ? <Inventory/> : <LoginPage />)} />
                <Route path="/admin/captura" exact render={() => (isUserLoggedIn ? <InventoryCapture/> : <LoginPage />)} />
                <Route path="/admin" exact render={() => (isUserLoggedIn ? <Inventory/> : <LoginPage isAdmin={true}/>)} />
                <Route path="/registro" exact render={() => (isUserLoggedIn && isUserRegistrationComplete ? <Redirect to={{ pathname: '/' }} /> : <Register user={userCookie}/>)} />
                <Route path="/admin/dashboard" exact render={() => (isUserLoggedInAndSuperAdmin ? <AdminDashboard/> : <LoginPage isAdmin={true}/>)} />
                <Route path="/admin/reports" exact render={() => (isUserLoggedInAndSuperAdmin ? <AdminReports/> : <LoginPage isAdmin={true}/>)} />
                <Route path="/logout" exact render={() => {
                    logOut(cookies);
                    return isLoggedIn() ? <Dashboard/> : <LoginPage/>;
                }} />
            </Router>
            <Footer/>
        </React.Fragment>
    );
}


export default withCookies(App);
