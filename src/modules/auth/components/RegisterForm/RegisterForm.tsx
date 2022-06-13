import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IRegisterParams, ILoginValidation } from '../../../../models/auth';
import Button from '../Button/Button';
import InputForm from '../InputForm/InputForm';
import './RegisterForm.scss';
import { yupValidateRegister } from '../../utils';
import { Formik, useFormik, Form, Field } from 'formik';
import SelectForm from 'modules/auth/components/SelectForm/SelectForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LocationForm from '../LocationForm/LocationForm';

interface Props {
  onRegister(values: IRegisterParams): void;
  loading: boolean;
}
const op = [
  { id: 'male', name: 'Nam' },
  { id: 'female', name: 'Nữ' },
];
const RegisterForm = (props: Props) => {
  const [locationList, setLocationList] = useState([]);
  const [cityList, setCityList] = useState([]);

  return (
    <Formik<IRegisterParams>
      initialValues={{
        email: '',
        password: '',
        name: '',
        repeatPassword: '',
        gender: '',
        region: -1,
        state: -1,
      }}
      validationSchema={yupValidateRegister}
      onSubmit={(values) => {
        console.log(values);
        props.onRegister(values);
      }}
    >
      {({ values, errors, touched }) => {
        useEffect(() => {
          const getLocationList = async () => {
            axios
              .get('http://api.training.div3.pgtest.co/api/v1/location')
              .then((a) => {
                {
                  console.log(a.data.data);
                  setLocationList(a.data.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          };
          getLocationList();
        }, []);
        useEffect(() => {
          const getCityList = (id: number) => {
            if (id) {
              axios
                .get('http://api.training.div3.pgtest.co/api/v1/location?pid=' + id)
                .then((a) => {
                  {
                    console.log(a.data.data);
                    setCityList(a.data.data);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              setCityList([]);
            }
          };
          getCityList(values.region);
        }, [values.region]);
        return (
          <Form className="register-form row g-3 needs-validation">
            {/* {errorMessage ? (
              <div className=" secondloginform-errormessage alert alert-danger" role="alert">
                {errorMessage}
              </div>
            ) : null} */}
            <div className="col-md-12">
              <InputForm
                type="text"
                className="form-control"
                id="inputEmail"
                name="email"
                label="email"
                errorMessage={errors.email && touched.email ? errors.email : ''}
              />
            </div>
            <div className="col-md-12">
              <InputForm
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                label="password"
                errorMessage={errors.password && touched.password ? errors.password : ''}
              />
            </div>
            <div className="col-md-12">
              <InputForm
                type="password"
                className="form-control"
                id="repeatPassword"
                name="repeatPassword"
                label="repeatPassword"
                errorMessage={errors.repeatPassword && touched.password ? errors.repeatPassword : ''}
              />
            </div>
            <div className="col-md-12">
              <InputForm
                type="text"
                className="form-control"
                id="inputEmail"
                name="name"
                label="name"
                errorMessage={errors.name && touched.email ? errors.name : ''}
              />
            </div>
            <div className="col-md-12">
              <SelectForm
                // value={values.gender}
                // onChange={(e: any) => {
                //   handleChange(e);
                // }}
                className="form-control"
                id="inputGender"
                name="gender"
                label="gender"
                options={op}
                errorMessage={errors.gender && touched.gender ? errors.gender : ''}
              />
            </div>

            <div className="col-md-12">
              <SelectForm
                // value={values.locationCountry}
                // onChange={(e: any) => {
                //   getCityList(e.target.value);
                //   setValues({
                //     ...values,
                //     locationCountry: e.target.value,
                //     locationCity: '0',
                //   });
                // }}
                className="form-control"
                id="inputLocationCountry"
                name="region"
                label="region"
                options={locationList}
                errorMessage={errors.region && touched.region ? errors.region : ''}
              />
            </div>
            <div className="col-md-12">
              <SelectForm
                // value={values.locationCity}
                // onChange={(e: any) => {
                //   handleChange(e);
                // }}
                className="form-control"
                id="state"
                name="state"
                label="state"
                options={cityList}
                errorMessage={errors.state && touched.state ? errors.state : ''}
              />
            </div>
            <div className="row justify-content-md-center secondloginform-btn">
              <div className="col-md-auto">
                <Button loading={false} message="register" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;