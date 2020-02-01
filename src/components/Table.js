import React from 'react';
import {CircularProgress} from "@material-ui/core";

class Table extends React.Component {
    renderHeaders() {
        const {headers} = this.props;

        return headers && headers.length > 0 && headers.map((header, index) => (<th key={`header-item-${index}`} data-header-id={header.id}>{header.label}</th>));
    }

    getCells(dataItem) {
        const dataColumns = Object.keys(dataItem);

        return dataColumns.map((key, index) => {
            return dataItem[key] && key !== 'isSelected' && (<td key={`cell-${index}`}>{dataItem[key]}</td>)
        });
    }

    renderData() {
        const { hasCheckbox, data, isLoading, onCheck } = this.props;
        return data && data.length > 0 ? data.map((dataItem, index) => {
            if (dataItem) {
                return (
                    <tr key={`row-${index}`}>
                        {this.getCells(dataItem)}
                        {
                            hasCheckbox &&
                            <td><input checked={!!dataItem.isSelected} type="checkbox" onChange={(e) => onCheck && onCheck(dataItem)}/></td>
                        }
                    </tr>
                );
            }
        }) : isLoading ? <tr><td><CircularProgress /></td></tr> : <tr><td>No hay paquetes en tu inventario.</td></tr>
    }


    render() {
        const { hasCheckbox, selectAll, allSelected } = this.props;
    return (
        <React.Fragment>
            {
                hasCheckbox &&
                <button className="btn btn-secondary" style={{marginBottom: '20px', float: 'right'}} onClick={(e) => selectAll()}>{allSelected ? 'Unselect All' : 'Select All'}</button>
            }
            <table className="table table-striped" width="100%">
                <thead>
                <tr>
                    {this.renderHeaders()}
                </tr>
                </thead>
                <tbody>
                {this.renderData()}
                </tbody>
            </table>
        </React.Fragment>
    );
}
}

export default Table;
