import KitchenIcon from "@mui/icons-material/Kitchen";
import { MenuList, PageLayout } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

export default function UserDashboard() {
  return (
    <PageLayout
      topBar={<TopBar fullName="Irish" />}
      nav={<MenuList items={menuList} />}
      main={<Outlet />}
    />
  );
}

const menuList = [
  {
    label: "Food entries",
    icon: <KitchenIcon fontSize="small" />,
    to: "",
  },
];
