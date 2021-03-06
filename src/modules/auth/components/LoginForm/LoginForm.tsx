import React from 'react';
import './login-form.scss';
import { Formik, Form, Field } from 'formik';
import { ILoginParams } from 'models/auth';
import { yupValidateLogin } from 'modules/auth/utils';
import InputForm from '../InputForm/InputForm';
import Button from '../Button/Button';
interface Props {
  onLogin(values: ILoginParams): void;
  errorMessage: string;
  loading: boolean;
}

const LoginForm = (props: Props) => {
  const { onLogin, errorMessage } = props;

  return (
    <Formik<ILoginParams>
      initialValues={{ email: '', password: '' }}
      validationSchema={yupValidateLogin}
      onSubmit={(values) => {
        onLogin(values);
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="login-form row g-3 needs-validation">
            {errorMessage ? (
              <div className="login-form-errormessage" role="alert">
                {errorMessage}
              </div>
            ) : null}
            <div className="login-form-row">
              <InputForm
                type="text"
                className="form-control"
                id="inputEmail"
                name="email"
                label="email"
                errorMessage={errors.email && touched.email ? errors.email : ''}
              />
            </div>
            <div className="login-form-row">
              <InputForm
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                label="password"
                errorMessage={errors.password && touched.password ? errors.password : ''}
              />
            </div>
            <div className="login-form-btn">
              <Button loading={props.loading} message="register" />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
