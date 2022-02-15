import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import {
  getUserFoodEntries,
  GetUserFoodEntriesResponse,
} from "api/user.service";
import { useLoggedUser } from "api";

export default function UserFoodEntries() {
  const loggedUser = useLoggedUser();
  const now = moment().format("YYYY-MM-DD");
  let [searchParams] = useSearchParams({
    date: now,
  });
  const { data } = useQuery<GetUserFoodEntriesResponse, Error>(
    "userFoodEntries",
    () =>
      getUserFoodEntries({
        userId: loggedUser.id,
        date: searchParams.get("date") as string,
      })
  );

  console.log({ data });

  return <div>user food entries</div>;
}
