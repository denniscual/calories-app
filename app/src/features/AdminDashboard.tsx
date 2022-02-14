import MenuBookIcon from "@mui/icons-material/MenuBook";
import { MenuList, PageLayout } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";

export default function AdminDashboard() {
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
    label: "Users",
    icon: <GroupIcon fontSize="small" />,
    to: "",
  },
  {
    label: "Reports",
    icon: <MenuBookIcon fontSize="small" />,
    to: "reports",
  },
];
