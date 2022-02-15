import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import {
  getUserFoodEntries,
  GetUserFoodEntriesResponse,
} from "api/user.service";
import { useLoggedUser } from "api";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Avatar, Button, IconButton, Typography } from "@mui/material";

export default function UserFoodEntries() {
  const loggedUser = useLoggedUser();
  const now = moment().format("YYYY-MM-DD");
  let [searchParams] = useSearchParams({
    date: now,
  });

  const { data } = useQuery<GetUserFoodEntriesResponse, Error>(
    ["userFoodEntries", searchParams.get("date")],
    () =>
      getUserFoodEntries({
        userId: loggedUser.id,
        date: searchParams.get("date") as string,
      })
  );

  return (
    <div>
      <Card elevation={8}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            sx={{
              width: "100%",
            }}
            variant="text"
          >
            Add food
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
