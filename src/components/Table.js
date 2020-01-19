import React from 'react';
import {CircularProgress} from "@material-ui/core";

class Table extends React.Component {
    renderHeaders() {
        return this.props.headers.length > 0 && this.props.headers.map((header, index) => (<th key={`header-item-${index}`} data-header-id={header.id}>{header.label}</th>));
    }

    getCells(dataItem) {
        const dataColumns = Object.keys(dataItem);

        return dataColumns.map((key, index) => {
            return dataItem[key] && (<td key={`cell-${index}`}>{dataItem[key]}</td>)
        });
    }

    renderData() {
        const { hasCheckbox, data, isLoading, onCheck } = this.props;
        return data.length > 0 ? data.map((dataItem, index) => {
            if (dataItem) {
                return (
                    <tr key={`row-${index}`}>
                        {this.getCells(dataItem)}
                        {
                            hasCheckbox &&
                            <td><input checked={!!dataItem.isSelected} type="checkbox" onClick={(e) => onCheck && onCheck(dataItem)}/></td>
                        }
                    </tr>
                );
            }
        }) : isLoading ? <tr><td><CircularProgress /></td></tr> : <tr><td>No hay paquetes en tu inventario.</td></tr>
    }


    render() {
        const { hasCheckbox, selectAll } = this.props;
    return (
        <React.Fragment>
            {
                hasCheckbox &&
                <label style={{float: 'right', marginBottom: '20px', marginRight: '20px'}} className="checkbox-label">Select All <input type="checkbox" onClick={(e) => selectAll()}/></label>
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
