// ADMIN
var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
import axios from 'axios';

export function getInventoryTypeSummaryPerCustomer(startDate, endDate) {
    return axios.post(
        `/admin/summary`,
         {startDate: startDate, endDate: endDate, type: 'inventorytype_customer'},
        {
            crossDomain: true
        });
}

export function confirmExpressPickup(id, packages) {
    const data = packages.map((id) => ({
        confirmado: 1,
        id
    }));
    return axios.post(`/recepcion/confirm_express_pickup`, {
       data: data[0],
       id
    });
}
