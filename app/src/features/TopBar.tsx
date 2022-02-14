import Button from "@mui/material/Button";
import Typhography from "@mui/material/Typography";
import { useLogoutUser } from "api";
import { DatePickerPopover } from "components";
import { generateGreetings } from "utils";

interface TopBarProps {
  fullName: string;
  hideDatePicker?: boolean;
}

export default function TopBar({
  fullName,
  hideDatePicker = false,
}: TopBarProps) {
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
      {!hideDatePicker && (
        <div>
          <DatePickerPopover
            value="2022-02-14"
            onChange={(date) => {
              console.log({ date });
            }}
          />
        </div>
      )}
      <div>
        <Button variant="text" color="primary" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </div>
  );
}
