import { Link } from "react-router-dom";
import RootMenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ReactNode } from "react";

interface MenuListProps {
  items: {
    label: string;
    icon: ReactNode;
    to: string;
  }[];
}

export function MenuList({ items }: MenuListProps) {
  return (
    <RootMenuList component="div">
      {items.map((item, idx) => {
        return (
          <MenuItem
            key={idx}
            component={Link}
            to={item.to}
            style={{
              padding: "12px 16px",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        );
      })}
    </RootMenuList>
  );
}
