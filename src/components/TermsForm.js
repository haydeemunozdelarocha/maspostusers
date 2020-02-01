import React from 'react';

class TermsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            errorEnabled: false,
            accepted: false
        };
    }

    acceptTerms(accepted) {
        this.setState({
            accepted: accepted
        })
    }

    submitAccepted() {
        if (!this.state.accepted) {
            this.setState({
                errorEnabled: true,
                errorMessage: 'Please accept the terms and conditions to continue.'
            })
        } else {
            this.props.onSubmit(this.state.accepted);
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className='document-reader'>
                    <h2>Acuerdo de Renta de Buzones / Espacio de Bodega</h2>
                    <p>Este acuerdo está celebrado
                        por <strong>{this.props.user.nombre}</strong>, de aquí en adelante
                        mencionado como el Solicitante y +Post Warehouse y deberán apegarse a las siguientes condiciones
                        que deberán ser acordadas por las partes:</p>

                    <ul>
                        <li>Al completar y firmar este acuerdo, el Solicitante designa a +Post Warehouse como su agente
                            para recibir su correspondencia por un período que no debe exceder la cantidad de renta
                            pagada por adelantado. La información proporcionada por el Solicitante se mantendrá
                            confidencial y no se publicará intencionalmente sin el previo consentimiento del
                            Solicitante, excepto para propósitos policíacos, en cuyo caso +Post Warehouse cooperará
                            completamente. El solicitante no usará el buzón como almacén y accede a recoger el correo
                            cuando menos una vez al mes, o hará arreglos para que un agente recoja el correo en su
                            lugar.
                        </li>

                        <li>Todos los que reciban correo en el buzón del Solicitante deberán proporcionar, minimo, dos
                            tipos de identificación. La primera debe ser (1) Visa. La segunda identificación deberá
                            incluir el nombre del solicitante, dirección actual y fotografía, (2) IFE para validar la
                            identidad del Solicitante. Las fotocopias de la identificación se conservarán en el
                            expediente del cliente. Es la responsabilidad del Solicitante de informar a +Post Warehouse
                            de cambios de domicilio o de número telefónico en el momento en que estos ocurran. Se
                            aceptará correo a nombre de (1) persona u organización en un solo buzón (‘Titular’). Después
                            de (1) Nombre, +Post Warehouse cobrará una tarifa mensual adicional por cada entidad, sea
                            persona, negocio u organización, que sea agregado (‘Secundario’).
                        </li>

                        <li>No obstante las condiciones detalladas anteriormente relacionadas a la entrega de correo, el
                            Solicitante autoriza a +Post Warehouse a aceptar correo/paquetería rastreables, registrados
                            certificados y artículos entregados por un particular o a nombre del solicitante. Además, el
                            solicitante proporcionará aviso previo y pago de cargos C.O.D. En consideración a los
                            servicios y la gran responsabilidad que representa, el Solicitante libera a +Post Warehouse
                            de toda responsabilidad por pérdida, daño o la ubicación de dicho correo [rastreable y
                            regular] después de haberse colocado en el buzón del Solicitante o de los artículos que se
                            conservan en bodega. De acuerdo a esta liberación, el Solicitante renuncia a cualquiera y
                            todos los derechos de reclamo contra +Post Warehouse relacionado a correo [rastreable y
                            regular] y servicios ofrecidos.
                        </li>
                    </ul>

                    <h4>Entrega y Notificación</h4>
                    <ul>
                        <li>El Solicitante está de acuerdo de que una vez que +Post Warehouse ha colocado el correo y
                            los paquetes pequeños no rastreables del Solicitante en los buzones asignados, el correo y
                            paquetes no rastreables se considerarán entregadas sin disputa sobre dicha entrega. +Post
                            Warehouse no es responsable por pérdida, robo o la entrega tarde, parcial o dañada de
                            correo, sobres, bolsas, paquetes, cajas, tubos, rollos, tarimas y demás, por El Servicio
                            Postal de E.U., UPS, DHL, Fed-Ex o cualquier otro servicio de mensajería o fletera.
                        </li>

                        <li>El Solicitante está de acuerdo de mantener informado a +Post Warehouse de su información
                            personal actualizada para facilitar al Servicio Postal de Estados Unidos con el servicio de
                            notificación. Una vez informado por medio de la aplicación web/móvil y un correo
                            electrónico, el Solicitante acepta haber sido notificado sin disputa y acepta recoger
                            cualesquier artículo recibido por +Post Warehouse. El Solicitante accede a pagar una tarifa
                            de servicio por entregar paquetería a nombre del Solicitante después, o fuera, de las horas
                            de mostrador publicadas. Si existen conflictos con el horario debido a viaje o problemas con
                            el horario de trabajo, los paquetes pueden entregarse a un agente autorizado para
                            recogerlos, siempre y cuando el Solicitante notifique al +Post Warehouse por medio de correo
                            electrónico.
                        </li>
                    </ul>

                    <h4>Dirección de Correo</h4>
                    <ul>
                        <li>El Solicitante usará en la dirección de correo PMB o el símbolo numérico (#) antes del
                            número de buzón. Ninguna otra designación se considera válida – ej. suite, apt., código
                            postal, cuarto, estudio, etc. Si el Solicitante no cumple con este protocolo de dirección
                            requerido y definido por el Servicio Postal de E.U., él/ella corren el riesgo de que el
                            correo sea devuelto al remitente y en caso de que ocurran violaciones flagrantes no
                            incidentales, la cancelación de los servicios de recibo de correo. En consecuencia, el
                            Solicitante deberá indemnizar a +Post Warehouse por cualquier pérdida incurrida a
                            consecuencia de esto. El Solicitante es responsable de notificarles su dirección de correo
                            correcta a todos los corresponsales, publicistas, agencias gubernamentales, compañías de
                            servicio y a cualquier otra parte interesada.
                        </li>
                    </ul>
                    <p style={{textAlign: 'center'}}><strong>2220 Bassett Ave. #{this.props.user.pmb}</strong></p>
                    <p style={{textAlign: 'center'}}><strong>El Paso, Texas 79901</strong></p>
                    <ul>
                        <li>El Solicitante entiende que la relación de las partes mencionadas aquí es una de control
                            temporal de propiedad y no de arrendatario/inquilino.
                        </li>

                        <li>El Solicitante accede a acatar las reglas de +Post Warehouse contenidas en este acuerdo. El
                            no hacerlo puede resultar en una notificación por correo electrónico de 30 días de
                            cancelación de servicios ofrecidos. Se le aconseja al Solicitante revisar el sitio de
                            internet de +Post Warehouse para revisar los cambios en la política de procedimiento y los
                            precios.
                        </li>

                        <li>El Solicitante accede proteger, indemnizar y mantener indemne a +Post Warehouse de, y contra
                            cualquiera y toda reclamación, demanda y causa de acción de cualquier naturaleza relacionada
                            al uso de las instalaciones o servicios de +Post Warehouse y cualquier gasto incurrido en
                            defensa del mismo deberá ser reembolsado por el Solicitante. Si +Post Warehouse comete, o no
                            lleva a cabo cualquier acto que tenga como resultado la interrupción de servicio entre el
                            Solicitante con +Post Warehouse, y como consecuencia el Solicitante sufre una pérdida, la
                            responsabilidad de +Post Warehouse deberá limitarse a no más de $200.00, o el valor completo
                            del articulo si el valor es menor a $200.00. El Solicitante deberá presentar la factura del
                            articulo en cuestión para presentar el reclamo.
                        </li>
                        <li>Si +Post Warehouse comete, o no lleva a cabo, cualquier acto que tenga como resultado una
                            pérdida para el Solicitante, durante el plazo contratado, por cualesquier razon, la
                            responsabilidad de +Post Warehouse deberá limitarse a no más de $200.00, o el valor completo
                            del articulo si el valor es menor a $200.00. El Solicitante deberá presentar la factura del
                            artículo en cuestión para presentar el reclamo.
                        </li>
                    </ul>


                    <h4>Pago</h4>
                    <ul>
                        <li>Las tarifa por renta de buzón son calculadas en un ciclo de facturación semestral (6 meses)
                            y se vencen y son pagaderas por adelantado, por lo tanto, se le notificará al Solicitante
                            por medio de su perfil en línea. No se requiere ninguna otra notificación. La demora en el
                            pago de las tarifas de renta y/o servicios puede resultar en una tarifa de $10.00 por pago
                            retrasado. Hay un período de gracia de cinco (5) días. Sin embargo, diez (10) días después
                            de la fecha de vencimiento se suspenderá el servicio postal del buzón y bodega del
                            Solicitante y dicho correo se mantendrá en el mostrador. Después de quince (15) días de la
                            fecha de vencimiento se notificará en el perfil en línea una “notificación de cancelación de
                            servicio” la cual se hará efectiva. Favor de tomar en cuenta que +Post Warehouse no acepta
                            pagos parciales, tarifas prorrateadas, ni proporciona reembolsos en caso de cancelación de
                            servicio por ninguna de las partes.
                        </li>
                    </ul>

                    <h4>Re-envío</h4>
                    <ul>
                        <li>El Solicitante entiende completamente que el Servicio Postal de E.U. no re-envía correo de
                            un centro de recibo de correo comercial (CRMC, por sus siglas en inglés) y no acepta la
                            forma con el cambio de dirección. Se le notifica al Solicitante que informe con suficiente
                            tiempo a todas las partes interesadas del cierre anticipado del buzón y de su nueva
                            dirección de correo. Importante! Después de cerrar o cancelar el servicio, el correo del
                            Solicitante ya no estará disponible para ser recogido en el mostrador. Si el Solicitante
                            desea que su correo sea re-enviado después de la cancelación, él/ella deberá proporcionarle
                            a +Post Warehouse (1) una nueva dirección por escrito y (2) pago de franqueo y de tarifas de
                            re-envío determinadas por +Post Warehouse. De no ser así, +Post Warehouse rechazará el
                            recibo de correo y en caso de correo ya recibido, se manejará conforme a las reglas USPS
                            DMMD042.2.6. Al cancelar el servicio de recibo de correo, el Solicitante le dará
                            instrucciones a +Post Warehouse de:
                        </li>
                    </ul>

                    <p>A. ____ Re-enviar el correo de primera clase a una nueva dirección de correos.</p>
                    <p>Depósito por re-envío: $___________</p>
                        <p>B. ____ Manejar dicho correo conforme a las reglas USPS DMMD042.2.6</p>

                        <h4>Renta de Espacio de Bodega</h4>
                        <ul>
                            <li>La renta de espacio de bodega está disponible y se facturará de acuerdo a la tarifa de
                                precios actual de +Post Warehouse.
                            </li>

                            <li>El uso de espacio rentado por el Solicitante es con el propósito de almacenamiento de
                                propiedad personal únicamente. El Solicitante no deberá almacenar en las instalaciones
                                ningún artículo que pueda ser peligroso para las instalaciones o que pudiera ser
                                peligroso de alguna manera para las personas o propiedad en o alrededor de las
                                instalaciones. Ningún artículo que vaya contra la cobertura de seguro de las
                                instalaciones de +Post Warehouse, o que ocasione que las tarifas de seguro de propiedad
                                de +Post Warehouse aumenten, deberá ser almacenado en las instalaciones. No se deberán
                                almacenar explosivos ni material flaméable o altamente flaméable en las instalaciones y
                                el almacenamiento de dichos materiales considerados como tóxicos y peligrosos bajo
                                cualquier regla federal, estatal o local se considera explícitamente prohibido. El
                                Solicitante no podrá llevar a cabo actividades de negocio en las instalaciones, pero
                                puede hacer uso de las áreas comunes con el único propósito de ir y venir para almacenar
                                o recoger artículos personales, siempre y cuando el Solicitante no obstruya el tráfico.
                                Todos los artículos personales den ser almacenados dentro del espacio rentado. El
                                Solicitante expresamente acuerda indemnizar y liberar a +Post Warehouse de y contra
                                cualquier reclamo o daño que surja de la Violación del Solicitante, de las
                                estipulaciones de este párrafo.
                            </li>

                            <li>Se le prohíbe al Solicitante que permanezca en cualquier área que no sea el espacio
                                rentado por el Solicitante ni se le permitirá al Solicitante que deambule en ningún área
                                de la bodega que no sea su espacio rentado. El Solicitante entiende que si se le
                                encuentra en el área de bodega o deambulando en cualquier área que no sea su espacio
                                rentado, +Post Warehouse puede cancelar inmediatamente este acuerdo sin necesidad de
                                notificación y el Solicitante no tendrá derecho a ningún reembolso por renta pagada por
                                adelantado.
                            </li>

                            <li>El Solicitante está obligado a pagar tarifas de almacenamiento por el tiempo que la
                                mercancía del Solicitante se encuentre en las instalaciones de +Post Warehouse, Aún
                                cuando el Solicitante no pueda recuperar/retirar ninguno de los artículos debido a un
                                asunto legal.
                            </li>
                        </ul>

                        <h4>Seguro</h4>

                        <ul>
                            <li>+POST WAREHOUSE NO PROPORCIONA COBERTURA DE SEGURO POR CUALQUIER PÉRDIDA, POR NINGUNA
                                CAUSA, PARA CUALQUIER PROPIEDAD PERSONAL DEL SOLICITANTE ALMACENADA EN LAS
                                INSTALACIONES. Si el Solicitante desea cobertura de seguro para cualquier propiedad
                                personal del Solicitante que se encuentre almacenada en las instalaciones, el
                                Solicitante deberá obtener independientemente dicha cobertura a expensas del
                                Solicitante, de la compañía de de seguros del Solicitante. +Post Warehouse no es
                                responsable por ninguna pérdida o daño a ninguna propiedad del Solicitante almacenada en
                                las instalaciones u ocasionada por una tercera parte, daños por agua, robo, por
                                cualquier acto de la naturaleza o de cualquier otra manera.
                            </li>
                            <li>Si +Post Warehouse comete, o no lleva a cabo cualquier acto que tenga como resultado la
                                interrupción de servicio y como consecuencia el Solicitante sufre una pérdida, la
                                responsabilidad de +Post Warehouse deberá limitarse a no más de $250.00, o el valor del
                                articulo si con valor menor a $250.00. El Solicitante deberá presentar la factura del
                                articulo en cuestión para presentar reclamo.
                            </li>
                        </ul>


                        <h4>Incumplimiento</h4>
                        <ul>
                            <li>En caso de que el Solicitante no pague la renta mensual a su vencimiento, y el
                                incumplimiento no es corregido dentro de noventa (90) días, +Post Warehouse puede
                                decidir hacer uso de uno o más de los siguientes remedios legales: A) Reclamar daños
                                monetarios o tarifas de renta vencida, o tarifas adicionales; B) Acción judicial para
                                una orden de restitución por posesión ilegal; o C) Juicio hipotecario de propiedad
                                personal. Excepto a los límites estipulados por ley, +Post Warehouse puede hacer uso
                                simultáneo de cualquiera de los remedios legales mencionados anteriormente. Al inicio
                                del proceso legal de +Post Warehouse contra el Solicitante por incumplimiento, cualquier
                                solución ofrecida por el Solicitante deberá incluir todos los cargos por renta mensual
                                vencida y otros cargos acumulados y el reembolso de todos los gastos razonablemente
                                incurridos por +Post Warehouse al ejecutar los remedios legales identificados
                                anteriormente. De conformidad con la ley de Texas, +Post Warehouse cuenta con un derecho
                                de retención, contra la propiedad personal almacenada, conforme a este Acuerdo, por
                                renta, mano de obra y otros cargos relacionados a la propiedad personal que se
                                encuentren vencidos y por otros gastos necesarios para la conservación de la propiedad
                                personal, o incurridos en la venta u otra disposición de la propiedad personal de
                                acuerdo a la ley. Este derecho de retención puede ser anulado conforme a las
                                estipulaciones de la ley de Texas y la propiedad personal puede ser vendida para
                                satisfacer el reclamo monetario acumulado de +Post Warehouse. En caso de que un
                                incumplimiento de lugar a la ejecución de un derecho de retención de propiedad personal,
                                +Post Warehouse, puede negar al Solicitante el acceso a la propiedad personal contenida
                                en la bodega después del incumplimiento y después de la notificación.
                            </li>
                        </ul>

                        <h4>Misceláneos</h4>

                        <ul>
                            <li>El Solicitante entiende que la comida perecedera únicamente será almacenada por 3 días
                                de calendario.
                            </li>

                            <li>El Solicitante autoriza a +Post Warehouse a incluir un cobro de penalización, que será
                                determinado por el tamaño y peso de los artículos, por asumir la responsabilidad de
                                tener que desechar y descartar mercancía de cualesquier tipo, orgánica o inorgánica,
                                abandonada o ignorada por parte del Solicitante. Mercancia del Solicitante alterna que
                                se encuentre en bodega, puede ser retenida hasta que dicha penalización sea liquidada.
                            </li>

                            <li>Los agentes y empleados de +Post Warehouse no cuentan con autorización para garantizar
                                el espacio rentado o las instalaciones. Las declaraciones orales proporcionadas por
                                +Post Warehouse, los agentes o empleados de +Post Warehouse, no se consideran garantías.
                                Ninguna declaración oral forma parte de este Acuerdo. La totalidad de este Acuerdo y el
                                compromiso contractual entre las partes está contenido en este Acuerdo escrito.
                                Cualquier garantía implícita de comercialidad o de conveniencia para un propósito en
                                particular y cualquier otra garantía, expresa o implícita, está excluida de esta
                                transacción y no aplica al espacio arrendado o a las instalaciones.
                            </li>

                            <li>El correo y/o los paquetes pueden ser recogidos de Lunes a Viernes entre las horas de
                                9:00 a.m a 5:00 p.m. Los horarios son sujetos a cambios, a discreción de +Post
                                Warehouse. Dichos cambios serán anunciados en el perfil del usuario y pagina web.
                            </li>

                            <li>Este contrato se renovara automáticamente al cumplir su plazo de tiempo y se mantendrá
                                activo hasta que el Solicitante notifique a +Post Warehouse por medio de correo
                                electrónico. Después de recibir dicha notificación para cancelar servicios, +Post
                                Warehouse responderá con un correo electrónico confirmando la cancelación de servicios y
                                del PMB asignado.
                            </li>
                        </ul>

                        <h4>Aceptación</h4>

                        <p>Con su firma electrónica al calce, el Solicitante acepta haber leído todas las condiciones
                            anteriores incluyendo la lista de tarifas de precios y servicios, acepta acatar estas reglas
                            de operación y está en pleno acuerdo de su ejecución para facilitar el proceso eficiente de
                            su correo.</p>

                </div>
                <div style={{textAlign: 'center', paddingBottom: '30px', display: 'flex', justifyContent: 'center'}}>
                    Acepto los términos y condiciones.
                    <input className="form-group" onChange={(e) => this.acceptTerms(e.target.checked)} type="checkbox" style={{marginLeft: '15px'}} name="accept"/>
                </div>
                <button disabled={!this.state.accepted} style={{float: 'right'}} type="submit" className="btn btn-default" onClick={() => this.submitAccepted()}>Siguiente</button>
            </React.Fragment>);
    }
}

export default TermsForm;
