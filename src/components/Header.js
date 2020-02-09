import React from 'react';
import logo from '../images/maspost-sm.png';
import ResponsiveMenu from "./ResponsiveMenu";
import {isMobileMedium} from "../helpers/responsive";

function Header(props) {
    const {isLoggedIn, isSuperAdmin} = props;
    const isMobile = isMobileMedium();

    return (
        <header className={`main-header ${isMobile ? 'mobile-header' : ''}`}>
            <nav className="navbar navbar-default " role="navigation">
                <div className="navbar-header">
                    <a href="/">
                        <img src={logo} alt="" border="0"/>
                    </a>
                    {
                        isLoggedIn &&
                        <ResponsiveMenu isSuperAdmin={isSuperAdmin}/>
                    }
                </div>
            </nav>
        </header>
);
}

export default Header;
