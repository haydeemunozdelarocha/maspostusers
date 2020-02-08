import React from 'react';
import Table from './Table';
import { withCookies } from 'react-cookie';
import PlanSummary from "./PlanSummary";
import { getInventario } from "../helpers/customers";
import {formatInventoryData, getDataKeys} from "../helpers/formatting";
import {getUserCookie, logOut} from "../helpers/authentification";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        const pmb = getUserCookie(cookies) ? getUserCookie(cookies).pmb : null;

        this.state = {
            inventoryData: [],
            headers: [],
            pmb
        }
    }

    componentWillMount() {
        getInventario(this.state.pmb, 'en_bodega').then((res) => {
            if (res.status === 200) {
                const data = formatInventoryData(res.data, ['id', 'remitente', 'tracking', 'fletera']);

                return this.setState({
                    headers: getDataKeys(data[0]),
                    inventoryData: data,
                    isLoading: false
                });
            }
        }).catch((e) => {
            logOut(this.props.cookies);
            return new Error(e.message);
        })
    }

    render() {
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
                                    <Table data={this.state.inventoryData} headers={this.state.headers}/>
                                </div>
                                <div className="panel-footer">
                                    <button className="btn btn-default" onClick={()=> window.location.replace('/inventario')}>Ver Más</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="panel panel-highlight">
                                <div className="panel-body panel-center">
                                    <PlanSummary cookies={this.props.cookies}/>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-body panel-center">
                                    <iframe title="reporte" className="content-iframe" src="https://maspost.herokuapp.com/w/puentes" width="100%" height="220"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default withCookies(Dashboard);
