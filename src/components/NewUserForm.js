import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const NewUserSchema = Yup.object().shape({
    pmb: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string().required('Ingresa tu contraseña'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Ingresa la misma contraseña.')
        .required('Required'),
});

class NewUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            errorEnabled: false
        };
    }


    render() {
        return (
            <React.Fragment>
                <h3 className="form-panel-title">Información de Acceso</h3>
                <Formik
                    validationSchema={NewUserSchema}
                    initialValues={{ email: '', password: '', confirmPassword: '', pmb: '' }}
                    onSubmit={this.props.onSubmit}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <Form className="panel-body">
                            <div className="form-group">
                                <Field
                                    className={`form-control
                                    ${errors.pmb && touched.pmb ? 'form-error' : ''}
                                    ${!errors.pmb && touched.pmb ? 'form-valid' : ''}`}                                    type="text"
                                    name="pmb"
                                    placeholder={'Número de PMB'}
                                />
                                {errors.pmb && touched.pmb && <p className='form-message form-message-error'>{errors.pmb}</p> }
                                <Field
                                    className={`form-control
                                    ${errors.email && touched.email ? 'form-error' : ''}
                                    ${!errors.email && touched.email ? 'form-valid' : ''}`}
                                    type="email"
                                    name="email"
                                    placeholder={'Email'}
                                />
                                {errors.email && touched.email && <p className='form-message form-message-error'>{errors.email}</p> }
                                <Field
                                    className={`form-control
                                    ${errors.password && touched.password ? 'form-error' : ''}
                                    ${!errors.password && touched.password ? 'form-valid' : ''}`}
                                    type="password"
                                    name="password"
                                    placeholder={'Contraseña'}
                                />
                                {errors.password && touched.password && <p className='form-message form-message-error'>{errors.password}</p> }
                                <Field
                                    className={`form-control
                                    ${errors.confirmPassword && touched.confirmPassword ? 'form-error' : ''}
                                    ${!errors.confirmPassword && touched.confirmPassword ? 'form-valid' : ''}`}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder={'Confirma tu contraseña'}
                                />
                                {errors.confirmPassword && touched.confirmPassword && <p className='form-message form-message-error'>{errors.confirmPassword}</p> }
                            </div>
                            <div className="content-container-float-right">
                                <button className="btn btn-default" type="submit" disabled={isSubmitting}>
                                    Crear
                                </button>
                            </div>
                        </Form>)}
                </Formik>
            </React.Fragment>)
    }
}

export default NewUserForm;
