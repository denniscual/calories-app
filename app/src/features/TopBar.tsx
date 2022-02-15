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
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignItems: "center",
      }}
    >
      <Typhography
        variant="h1"
        sx={{
          fontSize: "h6.fontSize",
          fontWeight: "medium",
        }}
      >
        {welcomeMessage}
      </Typhography>
      <div
        style={{
          justifySelf: "center",
        }}
      >
        {children}
      </div>
      <div
        style={{
          justifySelf: "end",
        }}
      >
        <Button variant="text" color="primary" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </div>
  );
}
