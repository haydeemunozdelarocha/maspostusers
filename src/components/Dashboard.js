import React from 'react';
import Table from './Table';
import { withCookies } from 'react-cookie';
import PlanSummary from "./PlanSummary";
import { getInventario } from "../helpers/customers";
import {formatInventoryData} from "../helpers/formatting";

function Dashboard(props) {
    const { cookies } = props;
    const pmb = cookies.get('maspost-user') ? cookies.get('maspost-user').pmb : null;

    return (
        <React.Fragment>
            <div className="content-container content-container-with-padding" style={{backgroundColor: '#f6f6f6'}}>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="panel panel-home panel-default">
                            <div className="panel-heading">
                                <h2>En Bodega:</h2>
                            </div>
                            <div className="panel-body">
                                <Table getData={() => getInventario(pmb, 'en_bodega')} formatData={(data) => formatInventoryData(data, ['id', 'remitente', 'tracking', 'fletera'])}/>
                            </div>
                            <div className="panel-footer">
                                <button className="btn btn-default" onClick={()=> window.location.replace('/inventario')}>Ver Más</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-highlight">
                            <div className="panel-body panel-center">
                                <PlanSummary cookies={cookies}/>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="panel-body panel-center">
                                <iframe className="content-iframe" src="https://maspost.herokuapp.com/w/puentes" width="100%" height="220"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>);
}

export default withCookies(Dashboard);
