import React from 'react';
import background from "../images/login-bc-image.jpg";
import { withCookies } from 'react-cookie';

const LandingPage = (props) => {
    return (
        <React.Fragment>
            <div className="landing-page content-container" style={{backgroundImage: `url(${background})`}}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default withCookies(LandingPage);
