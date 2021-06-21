import * as Yup from "yup";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";

// material
import { Box, TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// routes
import { PATH_AUTH } from "../../../routes/paths";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// utils
import { emailError } from "../../../utils/helpError";
//
import { useDispatch } from "react-redux";
import { MIconButton } from "../../@material-extend";
import { authFirbase } from "../../../Firebase";
// ----------------------------------------------------------------------

export default function Emailogin() {
  const isMountedRef = useIsMountedRef();
  const [ErrorMessage, setErrorMessage] = useState();
  let dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const REACT_APP_REGISTER_REDIRECT_URL =
    "http://localhost:3979/auth/register/complete";

  const registerHandle = async (values) => {
    const { email } = values;
    try {
      const config = {
        url: REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };
      await authFirbase.sendSignInLinkToEmail(email, config).then(
        enqueueSnackbar(`Email is sent to ${email}`, {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        })
      );
      // save user email in local storage
      window.localStorage.setItem("emailForRegistration", email);
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, {
      //   variant: "error",
      //   action: (key) => (
      //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
      //       <Icon icon={closeFill} />
      //     </MIconButton>
      //   ),
      // });
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await registerHandle(values);
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

  return (
    <FormikProvider value={formik}>
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

        <Box
          sx={{
            my: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></Box>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          pending={isSubmitting}
          onClick={registerHandle}
        >
          Register
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
