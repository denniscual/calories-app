import Button from "@mui/material/Button";
import Typhography from "@mui/material/Typography";
import { useLogoutUser } from "api";
import { PropsWithChildren } from "react";
import { generateGreetings } from "utils";

interface TopBarProps {
  fullName: string;
}

export default function TopBar({
  fullName,
  children,
}: PropsWithChildren<TopBarProps>) {
  const logoutUser = useLogoutUser();
  const welcomeMessage = `${generateGreetings()}, ${fullName}!`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typhography
        variant="h1"
        sx={{
          fontSize: "h5.fontSize",
        }}
      >
        {welcomeMessage}
      </Typhography>
      <div>{children}</div>
      <div>
        <Button variant="text" color="primary" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </div>
  );
}
