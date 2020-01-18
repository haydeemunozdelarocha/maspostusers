import React from 'react';
import { withCookies } from 'react-cookie';
import Table from "./Table";
import {getInventoryTypeSummaryPerCustomer} from "../helpers/admin";
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const reportOptions = [{
    name: 'Volumen por Cliente por Tipo',
    id: 1
}];

class AdminReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '2019-01-01',
            endDate: '2019-12-31',
            report: reportOptions[0]
        };
    }

    selectReport(event, value) {
        if (value) {
            this.setState({
                report: value
            });
        }
    }

    fetchData() {
        switch(this.state.report.id) {
            case 1:
                return getInventoryTypeSummaryPerCustomer(this.state.startDate, this.state.endDate);
            default:
                return getInventoryTypeSummaryPerCustomer(this.state.startDate, this.state.endDate);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="content-container content-container-with-padding" style={{backgroundColor: '#f6f6f6'}}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-home panel-default">
                                <div className="panel-heading">
                                    <h2>Reportes</h2>
                                </div>
                                <div className="panel-body">
                                    <form className="table-filters">
                                        <Autocomplete
                                            options={reportOptions}
                                            getOptionLabel={option => option.name}
                                            style={{ width: 300 }}
                                            onChange={(e, value) => this.selectReport(e, value)}
                                            renderInput={params => {
                                                return (
                                                    <TextField defaultValue={reportOptions[0].name} {...params} value={params.inputProps.value} label="Selecciona un reporte" onChange={this.selectReport} variant="outlined" fullWidth />
                                                )
                                            }}
                                        />
                                        <div className="table-filters__date">
                                            <TextField
                                                id="date"
                                                label="Start Date"
                                                type="date"
                                                defaultValue={this.state.startDate}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <TextField
                                                id="date"
                                                label="End Date"
                                                type="date"
                                                defaultValue={this.state.endDate}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        <button type="button" className="btn btn-default" onClick={this.fetchData}>Generar</button>
                                    </form>
                                    <Table getData={() => this.fetchData()} />
                                </div>
                                <div className="panel-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default withCookies(AdminReports);
