import { Stack, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import { Button, TextField, Snackbar } from "components";
import * as Yup from "yup";
import { signin, AuthContext } from "api";
import { useMutation } from "react-query";
import { queryClient } from "api";
import { useState, useContext } from "react";

export function Login() {
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
            maxWidth: "55%",
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
  const [, setAuth] = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const mutation = useMutation(signin, {
    onSuccess(data) {
      setAuth({
        id: data.id,
        roles: data.roles,
      });
      // Invalidate and refetch
      queryClient.invalidateQueries("loggedUser");
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
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          id="username"
          label="Username"
          error={Boolean(
            formik.getFieldMeta("username").touched && formik.errors.username
          )}
          helperText={formik.errors.username}
          {...formik.getFieldProps("username")}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          error={Boolean(
            formik.getFieldMeta("password").touched && formik.errors.password
          )}
          helperText={formik.errors.password}
          {...formik.getFieldProps("password")}
        />
        <Button type="submit" disabled={mutation.isLoading}>
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

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});
