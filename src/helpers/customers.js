import axios from 'axios';

export function getCustomerPlanInfo(pmb) {
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}clientes/info_plan?pmb=${pmb}`)
}

export function getInventario(pmb, status, timeframe) {
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}recepcion/all`, {responseType: 'json', params: {pmb: pmb, status: status, date: timeframe}});
}

export function getAutorizados(pmb) {
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}clientes/autorizados`, {responseType: 'json', params: {pmb: pmb}});
}

export function getClientesRecibir() {
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}clientes/recibir`, {responseType: 'json', params: {}});
}

export function submitPackageAuth(pmb) {
    return true;
}
