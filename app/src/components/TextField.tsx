import { TextFieldProps } from "@mui/material";
import { TextField as RootTextField } from "@mui/material";

export function TextField(props: TextFieldProps) {
  return <RootTextField {...props} variant="outlined" />;
}
