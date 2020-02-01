import React from 'react';
import { withRouter } from "react-router-dom";
import {formatColumnNameToLabel} from "../helpers/formatting";

class CardList extends React.Component {
    renderCards() {
        const {onCheck, cards, hasCheckbox} = this.props;

        return cards.map((card, index) => {
            const cardColumns = card ? Object.keys(card) : [];
            return (<div key={`card-${index}`} className="panel-contrast card">
                {
                    hasCheckbox &&
                    <input type="checkbox" checked={!!card.isSelected} onChange={(e) => onCheck(card)}/>
                }
                {
                    cardColumns.map((column, index) => (column !== 'isSelected' && <p key={`column-${index}`}><span className="card-line-label">{formatColumnNameToLabel(column)}: </span>{card[column]}</p>))
                }
            </div>);
        })
    }

    render() {
        const { selectAll, cards, allSelected, hasCheckbox} = this.props;
        return (
            <div>
                {
                    hasCheckbox &&
                    <button className="btn btn-secondary" style={{marginBottom: '20px'}} onClick={(e) => selectAll()}>{allSelected ? 'Unselect All' : 'Select All'}</button>
                }
                {cards.length > 0 &&
                    this.renderCards()
                }
            </div>
        );
    }
}

export default withRouter(CardList);
