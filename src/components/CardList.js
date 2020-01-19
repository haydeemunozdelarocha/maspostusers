import React from 'react';
import { withRouter } from "react-router-dom";
import {formatColumnNameToLabel} from "../helpers/formatting";

class CardList extends React.Component {
    render() {
        const {onCheck, selectAll, cards, allSelected} = this.props;
        return (
            <div>
                <button className="btn btn-secondary" style={{marginBottom: '20px', float: 'rog '}} onClick={(e) => selectAll()}>{allSelected ? 'Unselect All' : 'Select All'}</button>
                {cards.map((card) => {
                    const cardColumns = card ? Object.keys(card) : [];
                    return (<div className="panel-contrast card">
                        <input type="checkbox" checked={!!card.isSelected} onClick={(e) => onCheck(card)}/>
                        {
                            cardColumns.map((column) => (<p><span className="card-line-label">{formatColumnNameToLabel(column)}: </span>{card[column]}</p>))
                        }
                    </div>);
                })}
            </div>
        );
    }
}

export default withRouter(CardList);
