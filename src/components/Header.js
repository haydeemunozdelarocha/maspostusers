import React from 'react';
import logo from '../images/maspost-sm.png';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="main-header">
            <nav className="navbar navbar-default " role="navigation">
                <div className="navbar-header">
                    <a href="/">
                        <img src={logo} alt="" border="0"/>
                    </a>
                    {
                        props.showNavigation &&
                            <React.Fragment>
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <ul className="nav navbar-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/inventario">Inventario</Link></li>
                                    <li><Link to="/logout">Logout</Link></li>
                                </ul>
                                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul className="nav navbar-nav">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/inventario">Inventario</Link></li>
                                        <li><Link to="/logout">Logout</Link></li>
                                    </ul>
                                </div>
                        </React.Fragment>
                    }
                </div>
            </nav>
        </header>
);
}

export default Header;
