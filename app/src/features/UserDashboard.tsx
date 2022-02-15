import KitchenIcon from "@mui/icons-material/Kitchen";
import { MenuList, PageLayout } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { DatePickerPopover } from "components";
import { useLoggedUser } from "api";
import {
  Suspense,
  // @ts-expect-error `useTransition` is not yet included on "@types/react".
  useTransition,
} from "react";
import { ErrorBoundary } from "components";
import { useDate } from "./DateContext";
import { DEFAULT_DATE_FORMAT } from "utils";

export default function UserDashboard() {
  const [, setDate] = useDate();
  const [, startTransition] = useTransition({ timeoutMs: 5000 });
  const loggedUser = useLoggedUser();
  const [searchParams, setSearchParams] = useSearchParams({
    date: moment().format(DEFAULT_DATE_FORMAT),
  });

  return (
    <PageLayout
      topBar={
        <TopBar fullName={loggedUser.fullName}>
          <DatePickerPopover
            value={searchParams.get("date") as string}
            onChange={(chosenDate) => {
              startTransition(() => setDate(chosenDate));
              setSearchParams({
                date: chosenDate,
              });
            }}
          />
        </TopBar>
      }
      nav={<MenuList items={menuList} />}
      main={
        <>
          <ErrorBoundary>
            <Suspense fallback={<div>Fetching user food entries...</div>}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </>
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
