import { Stack, Typography, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Snackbar } from "components";
import * as Yup from "yup";
import { signin, useLoginUser, SigninInput, SigninDataResponse } from "api";
import { useMutation } from "react-query";
import { useState } from "react";

export default function Login() {
  return (
    <Stack
      spacing={6}
      sx={{
        p: 8,
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "h4.fontSize",
        }}
        fontWeight={600}
      >
        Calories App
      </Typography>
      <main>
        <Paper
          elevation={6}
          sx={{
            p: 8,
            maxWidth: 550,
            m: "auto",
          }}
        >
          <LoginForm />
        </Paper>
      </main>
    </Stack>
  );
}

function LoginForm() {
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
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
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
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity="error"
        >
          Wrong username or password
        </Snackbar>
      </Stack>
    </form>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});
