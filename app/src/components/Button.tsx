import { ButtonProps } from "@mui/material";
import { Button as RootButton } from "@mui/material";

export function Button(props: ButtonProps) {
  return (
    <RootButton
      {...props}
      variant="contained"
      sx={{
        height: 56,
      }}
    />
  );
}
