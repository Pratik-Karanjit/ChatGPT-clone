import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreateLogin = () => {
    let navigate = useNavigate()
  return (
    <div>
      <div className="sidenav">
        <div className="login-main-text">
          <h1>Application<br />Login Page</h1>
          <p>Login from here to access.</p>
          <button className="navigate-home" onClick={() => {
            navigate('/');
          }}><h4>Back to Home Page.</h4></button>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={Yup.object({
                username: Yup.string().required('Required'),
                password: Yup.string().required('Required'),
              })}
              onSubmit={(values, { resetForm }) => {
                console.log('Form submitted:', values);
                resetForm();
              }}
            >
              <Form>
                <div className="form-group">
                  <label>User Name</label>
                  <Field type="text" name="username" className="form-control" placeholder="User Name" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <Field type="password" name="password" className="form-control" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-black">Login</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLogin;
