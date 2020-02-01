import React from 'react';

const SubmittingForm = (props) => {
    return (
        <div className="submitting-form">
            <div className={`circle-loader ${!props.isSubmitting && 'load-complete'}`}>
                {!props.isSubmitting && <div className="checkmark draw"></div>}
            </div>
            {
                props.isSubmitting ?
                <p>Estamos enviando tu solicitud</p> :
                <p>Enviado!</p>
            }
        </div>
    );
}

export default SubmittingForm;
