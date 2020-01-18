import axios from "axios";

export function getFleteras() {
    return axios.get(`${process.env.REACT_APP_MASPOST_SOURCE}recepcion/fleteras`, {responseType: 'json', params: {}});
}
