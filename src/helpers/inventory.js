import axios from "axios";

export function getFleteras() {
    return axios.get(`/recepcion/fleteras`, {responseType: 'json', params: {}});
}

export const packageAuthFormTypes = {
    EXPRESS_PICKUP: 'express_pickup',
    NAME_AUTH: 'name_auth'
};

export function submitExpressPickup(details) {
    const {pmb, packages, time, date, name} = details;
    console.log('wwwww', date, time);
    return axios.post(`/recepcion/express_pickup`, {pmb, ids: packages, time, date, name});
}

export function submitPackageAuth(details) {
    const {pmb, packages, name} = details;
    return axios.post(`/recepcion/authorize_pickup`, {pmb, ids: packages, name});
}
