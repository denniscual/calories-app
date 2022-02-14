import { Link, LinkProps, useResolvedPath, useMatch } from "react-router-dom";
import RootMenuList from "@mui/material/MenuList";
import RootMenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ReactNode } from "react";

interface MenuItemType {
  label: string;
  icon: ReactNode;
  to: string;
}

interface MenuListProps {
  items: MenuItemType[];
}

export function MenuList({ items }: MenuListProps) {
  return (
    <RootMenuList component="div">
      {items.map((item, idx) => {
        return <MenuItem key={idx} {...item} />;
      })}
    </RootMenuList>
  );
}

function MenuItem({ to, icon, label }: MenuItemType) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <RootMenuItem
      component={Link}
      to={to}
      style={{
        padding: "12px 16px",
      }}
      selected={Boolean(match)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </RootMenuItem>
  );
}
