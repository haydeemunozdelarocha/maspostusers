import React from 'react';
import {getDataKeys} from "../helpers/formatting";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [],
            data: []
        }
    }

    componentWillMount() {
        this.props.getData().then((res) => {
            if (res.status === 200) {
                const data = this.props.formatData ? this.props.formatData(res.data) : res.data;
                this.setState({
                    headers: this.props.headers || getDataKeys(data[0]),
                    data
                });
            }
        });
    }

    renderHeaders() {
        return this.state.headers.length > 0 && this.state.headers.map((header, index) => (<th key={`header-item-${index}`} data-header-id={header.id}>{header.label}</th>));
    }

    renderData() {
        return this.state.data.length ? this.state.data.map((dataItem, index) => dataItem && Object.keys(dataItem).length ?
            <tr key={`row-${index}`}>
                {Object.keys(dataItem).map((key, index) => dataItem[key] ?
                    <td key={`cell-${index}`}>{dataItem[key]}</td> : null)}
                {this.props.hasCheckbox ? <td><input type="checkbox" onClick={(e) => this.props.onCheck(dataItem)}/></td> : null}
            </tr> : null) : <tr><td>Loading...</td></tr>;
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
