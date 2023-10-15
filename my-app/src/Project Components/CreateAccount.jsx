import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

const CreateAccount = () => {
  let navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  let onSubmit = async (info) => {
    try {
      let result = await axios({
        url: `http://localhost:8000/users`,
        method: 'post',
        data: info,
      });
      console.log(result);
      navigate('/registration-success');
    } catch (error) {
      console.log('unable to create');
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Required.'),
    password: Yup.string().required('Required.'),
  });

  return (
    <div>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>Application<br />Register Page</h2>
          <p>Register from here to access.</p>
          <button className="navigate-home" onClick={() => navigate('/')}><h4>Back to Home Page.</h4></button>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className="form-group">
                  <label>Email</label>
                  <Field type="text" name="email" className="form-control" placeholder="Email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <Field type="password" name="password" className="form-control" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-black">Register</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
