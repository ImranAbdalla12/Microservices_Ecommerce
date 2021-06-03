import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { authFirbase } from 'Firbase';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {createOrUpdateUser} from 'redux/actions/authActions'
import { Section } from 'components/organisms';
import {} from 'redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import Validations from './Validations';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const Form = () => {
  const classes = useStyles();
  let history = useHistory();
  let dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState();
  const [ErrorMessage, setErrorMessage] = useState();


  const roleBasedRedirect = res => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/history');
    }
  };
const registerCompleteHandle = async values => {
    const { email, password } = values;
    try {
      dispatch({ type: ' AUTH_START', loading: true });
      const result = await authFirbase.signInWithEmailLink(
        email,
        window.location.href,
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');

        let user = authFirbase.currentUser;
        await user.updatePassword(password);
        const authtoken = await user.getIdTokenResult();
        createOrUpdateUser(authtoken)
          .then(res => {
            dispatch({
              type: 'AUTH_SUCCESS',
              loading: false,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: authtoken.authtoken,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
            dispatch({ type: 'AUTH_END ', loading: false });
          })
          .catch(err => {
            dispatch({
              type: 'AUTH_FAIL',
              loading: false,
              payload: null,
            });
            console.log(err);
            setLoading(false);
            setErrorMessage(err.message)
          });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message)
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: window.localStorage.getItem('emailForRegistration'),
      firstName: 'Imran',
      lastName: 'Abdullah',
      password: '12345678',
      verifyPassword: '12345678',
    },
    validationSchema: Validations,
    onSubmit: async values => {
      setLoading(true);
      await registerCompleteHandle(values);
    },
  });

  return (
    <div className={classes.root}>
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
      <form
        name="password-reset-form"
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              placeholder="First name"
              label="First name *"
              variant="outlined"
              size="medium"
              name="firstName"
              variant="outlined"
              fullWidth
              id="firstName"
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Last name"
              label="Last name *"
              variant="outlined"
              size="medium"
              name="lastName"
                autoComplete="lname"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              type = 'email'
              fullWidth
              size="medium"
              disabled
              name="email"
              value={formik.values.email}
                autoComplete="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Password"
              label="Password *"
              variant="outlined"
              size="medium"
              type = 'password'
              name="password"
              fullWidth
              value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="verifyPassword"
                label="Verify Password"
                type="password"
                id="verifyPassword"
                autoComplete="verify-password"
                value={formik.values.verifyPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.verifyPassword &&
                  Boolean(formik.errors.verifyPassword)
                }
                helperText={
                  formik.touched.verifyPassword && formik.errors.verifyPassword
                }
              />
            </Grid>
          <Grid item xs={12}>
            <i>
              <Typography variant="subtitle2">
                Fields that are marked with * sign are required.
              </Typography>
            </i>
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
