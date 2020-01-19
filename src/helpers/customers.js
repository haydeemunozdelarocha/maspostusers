import axios from 'axios';
import moment from 'moment';

export function getCustomerPlanInfo(pmb) {
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}clientes/info_plan?pmb=${pmb}`)
}

export function getInventario(pmb, status, date) {
    const queryData = {
        pmb,
        status
    };

    if (status === 'entregado') {
        if (date !== 'annual') {
            queryData.month = moment(date, 'DD/MM/YYYY').format('MM');
            queryData.year = moment(date, 'DD/MM/YYYY').year();
        }
    }
    console.log('getting inventario', queryData);
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}recepcion/all`, {responseType: 'json', params: queryData});
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
