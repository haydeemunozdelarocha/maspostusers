import React from 'react';
import { withCookies } from 'react-cookie';
import { VictoryTheme, VictoryChart, VictoryStack, VictoryBar, VictoryAxis } from 'victory';
import Table from "./Table";
import {getInventoryTypeSummaryPerCustomer} from "../helpers/admin";

const data2012 = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
];

const data2013 = [
    {quarter: 1, earnings: 15000},
    {quarter: 2, earnings: 12500},
    {quarter: 3, earnings: 19500},
    {quarter: 4, earnings: 13000}
];

const data2014 = [
    {quarter: 1, earnings: 11500},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 20000},
    {quarter: 4, earnings: 15500}
];

const data2015 = [
    {quarter: 1, earnings: 18000},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 15000},
    {quarter: 4, earnings: 12000}
];

class SuperAdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '2019-01-01',
            endDate: '2019-12-31'
        };
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
                                    <label>
                                        Tipo:
                                        <select>
                                            <option value="inventorytype_customer">Volumen por Cliente por Tipo</option>
                                        </select>
                                    </label>
                                    <input type="date"/>
                                        <input type="date"/>
                                        <Table getData={() => getInventoryTypeSummaryPerCustomer(this.state.startDate, this.state.endDate)} />
                                </div>
                                <div className="panel-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="panel panel-highlight">
                                <div className="panel-body panel-center">
                                    <VictoryChart
                                        domainPadding={20}
                                        theme={VictoryTheme.material}
                                    >
                                        <VictoryAxis
                                            tickValues={[1, 2, 3, 4]}
                                            tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            tickFormat={(x) => (`$${x / 1000}k`)}
                                        />
                                        <VictoryStack>
                                            <VictoryBar
                                                data={data2012}
                                                x="quarter"
                                                y="earnings"
                                            />
                                            <VictoryBar
                                                data={data2013}
                                                x="quarter"
                                                y="earnings"
                                            />
                                            <VictoryBar
                                                data={data2014}
                                                x="quarter"
                                                y="earnings"
                                            />
                                            <VictoryBar
                                                data={data2015}
                                                x="quarter"
                                                y="earnings"
                                            />
                                        </VictoryStack>
                                    </VictoryChart>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-body panel-center">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default withCookies(SuperAdminDashboard);
