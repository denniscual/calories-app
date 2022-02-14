import Button from "@mui/material/Button";
import Typhography from "@mui/material/Typography";
import { useLogoutUser, useAuth } from "api";
import { DatePickerPopover } from "components";
import { generateGreetings } from "utils";

interface TopBarProps {
  fullName: string;
}

export default function TopBar({ fullName }: TopBarProps) {
  const logoutUser = useLogoutUser();
  const [auth] = useAuth();
  const isUser = auth.roles.includes("ROLE_USER");
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
      <div>
        <DatePickerPopover
          value="2022-02-14"
          onChange={(date) => {
            console.log({ date });
          }}
        />
      </div>
      {/* {isUser && ( <div>
          <DatePickerPopover
            value="2022-02-14"
            onChange={(date) => {
              console.log({ date });
            }}
          />
        </div>
      )} */}
      <div>
        <Button variant="text" color="primary" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </div>
  );
}
