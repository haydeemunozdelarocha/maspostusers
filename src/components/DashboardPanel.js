import React from 'react';
import Table from "./Dashboard";
import {getInventario} from "../helpers/customers";
import {formatInventoryData} from "../helpers/formatting";

function DashboardPanel(pmb) {
    return (
        <div className="panel panel-home panel-default">
            <div className="panel-heading">
                <h2>En Bodega:</h2>
            </div>
            <div className="panel-body">
                <Table getData={() => getInventario(pmb, 'en_bodega')} formatData={(data) => formatInventoryData(data, [])}/>
            </div>
            <div className="panel-footer">
                <button className="btn btn-default" onClick={()=> window.location.replace('/inventario')}>Ver Más</button>
            </div>
        </div>
    );
}

export default Footer;
