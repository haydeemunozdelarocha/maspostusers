import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './style/App.scss';
import App from './App';
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';

Sentry.init({dsn: "https://3023cd63d3aa45af8b8b9b325f18dbe3@sentry.io/2357811",  environment: process.env.NODE_ENV});

try {
    ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));
}  catch(e) {
    if (!window.Promise) {
        Sentry.captureException(e);
        alert('Hubo un error al cargar la página de Maspost Warehouse. Nuestra aplicación no es compatible con la versión de tu navegador, para accesar la página actualiza tu navegador. Navegadores Compatibles: IE  9  y 10, Chrome, Safari, Firefox,  Edge');
        window.location.href = 'https://www.whatismybrowser.com/guides/how-to-update-your-browser/';
    }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
