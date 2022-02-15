import moment from "moment";
import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  FC,
  useMemo,
} from "react";
import { useSearchParams } from "react-router-dom";

type DateContextType = [string, Dispatch<SetStateAction<string>>];

const DateContext = createContext<DateContextType>(["", () => {}]);

export const DateContextProvider: FC = ({ children }) => {
  const [searchParams] = useSearchParams({
    date: moment().format("YYYY-MM-DD"),
  });
  const [date, setDate] = useState(searchParams.get("date") as string);

  const value = useMemo(() => [date, setDate] as DateContextType, [date]);

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export function useDate() {
  return useContext(DateContext);
}
