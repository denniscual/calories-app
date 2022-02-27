import { Stack, Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Snackbar } from "components";
import * as Yup from "yup";
import { signin, useLoginUser, SigninInput, SigninDataResponse } from "api";
import { useMutation } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const login = useLoginUser();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const mutation = useMutation<SigninDataResponse, Error, SigninInput>(signin, {
    onSuccess(data) {
      login(data);
    },
    onError(err) {
      setOpenSnackbar(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <Stack spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <TextField
        label="Username"
        error={Boolean(formik.touched.username && formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        {...formik.getFieldProps("username")}
      />
      <TextField
        label="Password"
        type="password"
        error={Boolean(formik.touched.password && formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        {...formik.getFieldProps("password")}
      />
      <Button
        sx={{
          height: 56,
        }}
        variant="contained"
        type="submit"
        disabled={mutation.isLoading}
      >
        Login
      </Button>
      <Link to="signup">Not a user? Create an account.</Link>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
      >
        Wrong username or password
      </Snackbar>
    </Stack>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});
