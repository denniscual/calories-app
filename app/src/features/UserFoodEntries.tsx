import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";

export default function UserFoodEntries() {
  const now = moment().format("YYYY-MM-DD");
  let [searchParams] = useSearchParams({
    date: now,
  });

  return <div>user food entries</div>;
}
