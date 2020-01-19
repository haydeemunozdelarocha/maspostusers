import axios from 'axios';

export function login(email, password, isAdmin = false) {
    const user = { email, password, isAdmin};
    return axios.post(`${process.env.REACT_APP_MASPOST_SOURCE}auth/login`, user)
}

export function forgotPassword(email, pmb) {
    const user = { email, pmb};
    return axios.post(`${process.env.REACT_APP_MASPOST_SOURCE}auth/forgot_password`, user)
}

export function resetPassword(email, password, pmb, token) {
    const user = { email, password, pmb, token};
    return axios.post(`${process.env.REACT_APP_MASPOST_SOURCE}auth/reset_password`, user)
}

export function getUserCookie(cookies) {
    return cookies.get('maspost-user') || {};
}

export function isLoggedIn(userCookie) {
    return userCookie ? Object.keys(userCookie).length > 0 && userCookie.hasOwnProperty('id') : false;
}

export function logOut(cookies) {
    return cookies.remove('user');
}

export function isSuperAdmin(userCookie) {
    return userCookie ? Object.keys(userCookie).length > 0 && userCookie.hasOwnProperty('tipo') && userCookie.tipo == 1 : false;
}
