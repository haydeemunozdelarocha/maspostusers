import React from 'react';
import background from "../images/login-bc-image.jpg";

const NotFound = () => {
    return (
        <div className="submitting-form">
            <div className="landing-page content-container" style={{backgroundImage: `url(${background})`}}>
                <h3>404 - Page not found</h3>
                <p>No hemos encontrado ninguna página con esta dirección, haz click en el logo para volver al sitio.</p>
            </div>
        </div>
    );
}

export default NotFound;
