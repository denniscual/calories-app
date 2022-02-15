import KitchenIcon from "@mui/icons-material/Kitchen";
import { MenuList, PageLayout } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { DatePickerPopover } from "components";
import { useLoggedUser } from "api";
import { Suspense } from "react";
import { ErrorBoundary } from "components";

export default function UserDashboard() {
  const loggedUser = useLoggedUser();
  let [searchParams, setSearchParams] = useSearchParams({
    date: moment().format("YYYY-MM-DD"),
  });

  return (
    <PageLayout
      topBar={
        <TopBar fullName={loggedUser.fullName}>
          <DatePickerPopover
            value={searchParams.get("date") as string}
            onChange={(date) => {
              setSearchParams({
                date: date as string,
              });
            }}
          />
        </TopBar>
      }
      nav={<MenuList items={menuList} />}
      main={
        <ErrorBoundary>
          <Suspense fallback={<div>Fetching user food entries...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      }
    />
  );
}

const menuList = [
  {
    label: "Daily Log",
    icon: <KitchenIcon fontSize="small" />,
    to: "",
  },
];
