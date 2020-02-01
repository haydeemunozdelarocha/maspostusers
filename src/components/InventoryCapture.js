import React from 'react';
import { withCookies } from 'react-cookie';
import {getInventoryTypeSummaryPerCustomer} from "../helpers/admin";
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getClientesRecibir} from "../helpers/customers";
import {getFleteras} from "../helpers/inventory";
import moment from 'moment';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class InventoryCapture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '2019-01-01',
            endDate: '2019-12-31',
            clientesRecibir: [],
            date: moment(new Date()).format('YYYY-MM-DD')
        };
    }

    componentWillMount() {
        const getData = [getClientesRecibir(), getFleteras()];
        Promise.all(getData).then((res) => {
            if (res.length) {
                this.setState({
                    clientesRecibir: res[0].data,
                    fleteras: res[1].data
                });
            }
        })
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
                                    <h2>Captura</h2>
                                </div>
                                <div className="panel-body">
                                    <form>
                                        <button className="btn btn-default">Get Label</button>
                                        <Autocomplete
                                            options={this.state.clientesRecibir}
                                            getOptionLabel={option => `${option.pmb} - ${option.nombre}`}
                                            style={{ width: 300 }}
                                            onChange={(e, value) => this.selectReport(e, value)}
                                            renderInput={params => {
                                                return (
                                                    <TextField defaultValue={''} {...params} value={params.inputProps.value} label="Buscar PMB o Nombre" onChange={this.selectReport} variant="outlined" fullWidth />
                                                )
                                            }}
                                        />
                                        <Autocomplete
                                            options={this.state.fleteras}
                                            getOptionLabel={option => option.nombre}
                                            style={{ width: 300 }}
                                            onChange={(e, value) => this.selectReport(e, value)}
                                            renderInput={params => {
                                                return (
                                                    <TextField defaultValue={'yes'} {...params} value={params.inputProps.value} label="Fletera" onChange={this.selectReport} variant="outlined" fullWidth />
                                                )
                                            }}
                                        />
                                        <TextField
                                            id="date"
                                            label="Fecha"
                                            type="date"
                                            defaultValue={this.state.date}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="from"
                                            label="From"
                                            type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Remesa</FormLabel>
                                            <RadioGroup aria-label="Remesa" name="remesa" value={''} onChange={() => {}}>
                                                <FormControlLabel value="true" control={<Radio />} label="Si" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            <Button className="btn btn-default">Sobre</Button>
                                            <Button className="btn btn-default">Caja</Button>
                                            <Button className="btn btn-default">Pallet</Button>
                                        </ButtonGroup>
                                    </form>
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

export default withCookies(InventoryCapture);
