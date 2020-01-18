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
