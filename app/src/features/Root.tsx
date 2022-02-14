import { StrictMode } from "react";
import { App } from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "theme";
import { QueryClientProvider } from "react-query";
import { AuthContextProvider, queryClient } from "api";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export function Root() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <AuthContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AuthContextProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
