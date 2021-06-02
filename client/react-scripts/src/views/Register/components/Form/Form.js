import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import { Section } from 'components/organisms';
import Alert from '@material-ui/lab/Alert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link }from 'react-router-dom'
import Validations from './Validations';
import {authFirbase} from "Firbase.js"


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
};

const Form = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState();
  const [ErrorMessage, setErrorMessage] = useState();


  const registerHandle = async values => {
    const { email } = values;
    setLoading(true);
    try {
      dispatch({ type: ' AUTH_START', loading: true });
      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };
      await authFirbase
        .sendSignInLinkToEmail(email, config)
        .then(dispatch({ type: 'APP_START', loading: false }));
      setMessage(`Email is sent to ${email} Click the link to complete your
      registration`);

      // save user email in local storage
      window.localStorage.setItem('emailForRegistration', email);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMessage(error.message);
    }
  };


  const formik = useFormik({
    initialValues: {
      email: 'fullstackdeveloper80@gmail.com',
    },
    validationSchema: Validations,
    onSubmit: async values => {
      await registerHandle(values);
    },
  });



  return (
    <div className={classes.root}>
       <Section>
          {Message && (
            <Section className={classes.section}>
              <Alert severity="success">{Message}</Alert>
            </Section>
          )}
          {ErrorMessage && (
            <Section className={classes.section}>
              <Alert severity="error">{ErrorMessage}</Alert>
            </Section>
          )}
        </Section>
      <form name="email-register-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder="E-mail"
              label="E-mail *"
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={Loading}
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Already have an account?{' '}
              <Link to="/login" >
                Login
                </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
