import MenuBookIcon from "@mui/icons-material/MenuBook";
import { MenuList, PageLayout, ErrorBoundary } from "components";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import GroupIcon from "@mui/icons-material/Group";
import { useLoggedUser } from "api";
import { Suspense } from "react";

export default function AdminPageLayout() {
  const loggedUser = useLoggedUser();
  return (
    <PageLayout
      topBar={<TopBar fullName={loggedUser.fullName} />}
      nav={<MenuList items={menuList} />}
      main={
        <ErrorBoundary>
          <Suspense fallback={<div>Fetching data...</div>}>
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
    label: "Users",
    icon: <GroupIcon fontSize="small" />,
    to: "users",
  },
  {
    label: "Reports",
    icon: <MenuBookIcon fontSize="small" />,
    to: "reports",
  },
];
