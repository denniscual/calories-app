import {
  SnackbarProps,
  Snackbar as RootSnackbar,
  Alert,
  AlertProps,
} from "@mui/material";
import { ReactNode } from "react";

export function Snackbar({
  children,
  severity = "success",
  onClose,
  ...otherProps
}: Omit<SnackbarProps, "children"> & {
  severity?: AlertProps["severity"];
  onClose: () => void;
  children: ReactNode;
}) {
  const handleClose: SnackbarProps["onClose"] = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <RootSnackbar
      {...otherProps}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={6000}
    >
      <Alert
        onClose={() => onClose()}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </RootSnackbar>
  );
}
