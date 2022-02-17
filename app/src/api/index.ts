import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
});

export * from "./AuthContext";
export * from "./auth.service";
export * from "./types";
export * from "./foodEntry.service";
export * from "./user.service";
