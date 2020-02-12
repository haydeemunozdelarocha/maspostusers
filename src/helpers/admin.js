// ADMIN
import axios from 'axios';

export function getInventoryTypeSummaryPerCustomer(startDate, endDate) {
    return axios.post(
        `${process.env.REACT_APP_MASPOST_SOURCE}admin/summary`,
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
    return axios.post(`${process.env.REACT_APP_MASPOST_SOURCE}recepcion/confirm_express_pickup`, {
       data: data[0],
       id
    });
}
