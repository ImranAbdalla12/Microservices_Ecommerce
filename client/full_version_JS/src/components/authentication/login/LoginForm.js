import * as Yup from "yup";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import closeFill from "@iconify/icons-eva/close-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import googleFill from "@iconify/icons-eva/google-fill";
import Alert from "@material-ui/lab/Alert";
// material
import {
  Box,
  Link,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// routes
import { PATH_AUTH } from "../../../routes/paths";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// utils
import { passwordError, emailError } from "../../../utils/helpError";
//
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MIconButton } from "../../@material-extend";
import { createOrUpdateUser } from "../../../redux/actions/authActions";
import { authFirbase, googleAuthProvider } from "../../../Firebase";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();

  let dispatch = useDispatch();
  let history = useHistory();
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin");
    } else {
      history.push("/");
    }
  };

  const login = async (values) => {
    const { email, password } = values;
    try {
      const result = await authFirbase.signInWithEmailAndPassword(
        email,
        password
      );
      const { user } = result;
      const authtoken = await user.getIdTokenResult();
      createOrUpdateUser(authtoken)
        .then((res) => {
          dispatch({
            type: "AUTH_SUCCESS",
            loading: false,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: authtoken.authtoken,
              role: res.data.role,
              _id: res.data._id,
              country: res.data.country,
              city: res.data.city,
              address: res.data.address,
              phone: res.data.phone,
              birthdate: res.data.birthdate,
            },
          });

          roleBasedRedirect(res);
          dispatch({ type: "AUTH_END", loading: false });
        })
        .catch((err) => {
          dispatch({ type: "AUTH_FAIL", loading: false, payload: null });
          setErrorMessage(err.message);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  const googleLogin = () => {
    authFirbase
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              loading: false,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                country: res.data.country,
                city: res.data.city,
                address: res.data.address,
                phone: res.data.phone,
                birthdate: res.data.birthdate,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
      });
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        });
        enqueueSnackbar("Login success", {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.code || error.message });
        }
      }
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <div>
        {" "}
        {ErrorMessage && <Alert severity="error">{ErrorMessage}</Alert>}
      </div>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          {...getFieldProps("email")}
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit).helperText
          }
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          {...getFieldProps("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={
            Boolean(touched.password && errors.password) ||
            passwordError(errors.afterSubmit).error
          }
          helperText={
            (touched.password && errors.password) ||
            passwordError(errors.afterSubmit).helperText
          }
        />
        <Box
          sx={{
            my: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            component={RouterLink}
            variant="subtitle2"
            to={PATH_AUTH.resetPassword}
          >
            Forgot password?
          </Link>
        </Box>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          pending={isSubmitting}
        >
          Login
        </LoadingButton>
        <Box p={2}>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={googleLogin}
          >
            <Icon icon={googleFill} color="#DF3E30" height={24} />{" "}
            {"           "} Continue with Google
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
}
