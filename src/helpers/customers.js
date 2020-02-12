import axios from 'axios';

import moment from 'moment';

export function getCustomerPlanInfo(pmb) {
    return axios.get(`/clientes/info_plan?pmb=${pmb}`)
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
    return axios.get(`/recepcion/all`, {responseType: 'json', params: queryData});
}

export function getAutorizados(pmb) {
    return axios.get(`/clientes/autorizados_entrega`, {responseType: 'json', params: {pmb: pmb}});
}

export function getClientesRecibir() {
    return axios.get(`/clientes/recibir`, {responseType: 'json', params: {}});
}
