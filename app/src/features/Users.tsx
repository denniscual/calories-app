import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Typography,
  Paper,
} from "@mui/material";
import { getUsers, GetUsersResponse } from "api";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { roundOff2DecimalPlaces } from "utils";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

export default function Users() {
  const data = useQuery<GetUsersResponse, Error>(["users"], getUsers)
    .data as GetUsersResponse;

  return (
    <Stack gap={4}>
      <Typography
        sx={{
          fontSize: "h3.fontSize",
        }}
        variant="h1"
      >
        Users
      </Typography>
      <Paper
        component={List}
        elevation={8}
        style={{
          alignSelf: "flex-start",
        }}
        sx={{
          p: 2,
          width: "100%",
        }}
      >
        {data.users.map((user) => (
          <Fragment key={user.id}>
            <ListItem
              component={Link}
              secondaryAction={<ChevronRightIcon color="secondary" />}
              style={{
                // cursor: "pointer",
                color: "#000000",
              }}
              to={user.id}
            >
              <ListItemText
                primary={user.fullName}
                secondary={`${
                  user.foodEntriesCount
                } food entries - ${roundOff2DecimalPlaces(
                  user.totalCalories
                )} calories consumed`}
              />
            </ListItem>
            <Divider component="li" />
          </Fragment>
        ))}
      </Paper>
    </Stack>
  );
}
