import axios from "axios";

export function getFleteras() {
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}recepcion/fleteras`, {responseType: 'json', params: {}});
}

export const packageAuthFormTypes = {
    EXPRESS_PICKUP: 'express_pickup',
    NAME_AUTH: 'name_auth'
};

export function submitExpressPickup(details) {
    const {pmb, packages, time, date, name} = details;
    return axios.post(`${process.env.REACT_APP_MASPOST_SOURCE}recepcion/express_pickup`, {pmb, ids: packages, time, date, name});
}

export function submitPackageAuth(details) {
    const {pmb, packages, name} = details;
    return axios.post(`${process.env.REACT_APP_MASPOST_SOURCE}recepcion/authorize_pickup`, {pmb, ids: packages, name});
}
