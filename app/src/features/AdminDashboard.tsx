import MenuBookIcon from "@mui/icons-material/MenuBook";
import { MenuList, PageLayout, ErrorBoundary } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { useLoggedUser } from "api";
import { Suspense } from "react";

export default function AdminDashboard() {
  const loggedUser = useLoggedUser();
  return (
    <PageLayout
      topBar={<TopBar fullName={loggedUser.fullName} />}
      nav={<MenuList items={menuList} />}
      main={
        <ErrorBoundary>
          <Suspense fallback={<div>Loading your dashboard...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      }
    />
  );
}

const menuList = [
  {
    label: "Food entries",
    icon: <KitchenIcon fontSize="small" />,
    to: "",
  },
  {
    label: "Reports",
    icon: <MenuBookIcon fontSize="small" />,
    to: "reports",
  },
];
