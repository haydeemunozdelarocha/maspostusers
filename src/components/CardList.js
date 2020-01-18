import React from 'react';
import { withRouter } from "react-router-dom";

class CardList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('cards', this.props.cards);
        return (
            <div className="panel-contrast card">
                {this.props.cards.map((card) => {
                   return (<div>
                       <input type="checkbox" onClick={(e) => this.props.onCheck(card)}/>
                       <p>{card.fecha_recepcion}</p>
                       <p>{card.ID}</p>
                       <p>{card.tipo}</p>
                       <p>{card.remitente}</p>
                       <p>{card.destinatario}</p>
                       <p>{card.fletera}</p>
                       <p>{card.tracking}</p>
                       <p>{card.peso}</p>
                       <p>{card.COD}</p>

                   </div>);
                })}
            </div>
        );
    }
}

export default withRouter(CardList);
