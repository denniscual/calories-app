import KitchenIcon from "@mui/icons-material/Kitchen";
import { MenuList, PageLayout } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { DatePickerPopover } from "components";

export default function UserDashboard() {
  const now = moment().format("YYYY-MM-DD");
  let [searchParams, setSearchParams] = useSearchParams({
    date: now,
  });

  return (
    <PageLayout
      topBar={
        <TopBar fullName="Zion">
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
      main={<Outlet />}
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
