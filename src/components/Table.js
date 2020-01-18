import React from 'react';
import {getDataKeys} from "../helpers/formatting";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [],
            data: [],
            isLoading: true
        }
    }

    componentWillMount() {
        this.props.getData().then((res) => {
            if (res.status === 200) {
                const data = this.props.formatData ? this.props.formatData(res.data) : res.data;
                this.setState({
                    headers: this.props.headers || getDataKeys(data[0]),
                    data,
                    isLoading: false
                });
            }
        });
    }

    renderHeaders() {
        return this.state.headers.length > 0 && this.state.headers.map((header, index) => (<th key={`header-item-${index}`} data-header-id={header.id}>{header.label}</th>));
    }

    getCells(dataItem) {
        const dataColumns = Object.keys(dataItem);

        return dataColumns.map((key, index) => {
            console.log('sss', dataColumns);
            return dataItem[key] && (<td key={`cell-${index}`}>{dataItem[key]}</td>)
        });
    }

    renderData() {
        const { hasCheckbox } = this.props;
        const {isLoading, data} = this.state;
        return data.length > 0 ? data.map((dataItem, index) => {
            if (dataItem) {
                return (
                    <tr key={`row-${index}`}>
                        {this.getCells(dataItem)}
                        {
                            hasCheckbox &&
                            <td><input type="checkbox" onClick={(e) => this.props.onCheck(dataItem)}/></td>
                        }
                    </tr>
                );
            }
        }) : isLoading ? <tr><td>Loading...</td></tr> : <tr><td>No hay paquetes en tu inventario.</td></tr>
    }


    render() {
        const { hasCheckbox } = this.props;
    return (
        <table className="table table-striped" width="100%">
            <thead>
                <tr>
                    {this.renderHeaders()}
                    {hasCheckbox ? <th></th> : null}
                </tr>
            </thead>
                <tbody>
                    {this.renderData()}
                </tbody>
        </table>
    );
}
}

export default Table;
