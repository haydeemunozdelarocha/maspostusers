var ES6Promise = require("es6-promise");
ES6Promise.polyfill();import axios from 'axios';
import {UserCookie} from '../models/UserCookie';
axios.defaults.baseURL ="http://api.maspostwarehouse.com"
export const userTypes = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superAdmin',
    USER: 'user'
};

export function registerNewUser(email, password, pmb) {
    const user = { email, password, pmb};
    return axios.post(`/auth/new_user`, user)
}

export function login(email, password, isAdmin = false) {
    const user = { email, password, isAdmin};
    return axios.post(`/auth/login`, user)
}

export function forgotPassword(email, pmb) {
    const user = { email, pmb};
    return axios.post(`/auth/forgot_password`, user)
}

export function resetPassword(email, password, pmb, token) {
    const user = { email, password, pmb, token};
    return axios.post(`/auth/reset_password`, user)
}

export function acceptTerms(id, pmb) {
    const user = { id, pmb };
    return axios.post(`/auth/accept_terms`, user)
}

export function getUserCookie(cookies) {
    return cookies.get('maspost-user');
}

export function setUserCookie(cookies, user, userType) {
    const userCookie = new UserCookie({...user, userType});
    logOut(cookies);
    return cookies.set('maspost-user', userCookie, { path: '/' });
}

export function isLoggedIn(userCookie) {
    return userCookie ? Object.keys(userCookie).length > 0 && userCookie.hasOwnProperty('id') : false;
}

export function logOut(cookies) {
    cookies.remove('maspost-user');
}

export function isSuperAdmin(userCookie) {
    return userCookie ? Object.keys(userCookie).length > 0 && userCookie.hasOwnProperty('userType') && userCookie.userType === userTypes.SUPER_ADMIN : false;
}
