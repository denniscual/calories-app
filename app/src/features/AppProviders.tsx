import { FC } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { AuthContextProvider, queryClient } from 'api'
import CssBaseline from '@mui/material/CssBaseline'
import AdapterMoment from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DateContextProvider } from './DateContext'
import { appTheme } from 'components'

const AppProviders: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <BrowserRouter>
            <DateContextProvider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </DateContextProvider>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
