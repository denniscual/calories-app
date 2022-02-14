import MenuBookIcon from "@mui/icons-material/MenuBook";
import { MenuList, PageLayout } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import { useLoggedUser } from "api";
import { Suspense } from "react";

export default function AdminDashboard() {
  const loggedUser = useLoggedUser();
  return (
    <PageLayout
      topBar={<TopBar fullName={loggedUser.fullName} />}
      nav={<MenuList items={menuList} />}
      main={
        <Suspense fallback={<div>Loading user...</div>}>
          <Outlet />
        </Suspense>
      }
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
