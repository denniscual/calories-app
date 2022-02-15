import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useLoggedUser } from "api";
import UserFoodEntries from "./UserFoodEntries";

export default function User() {
  const loggedUser = useLoggedUser();
  const now = moment().format("YYYY-MM-DD");
  let [searchParams] = useSearchParams({
    date: now,
  });

  return (
    <div>
      <UserFoodEntries
        userId={loggedUser.id}
        date={searchParams.get("date") as string}
      />
    </div>
  );
}
