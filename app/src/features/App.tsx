import { StrictMode } from 'react'
import { AppRoutes } from './AppRoutes'
import { ErrorBoundary } from 'components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppProviders from './AppProviders'

export default function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </ErrorBoundary>
    </StrictMode>
  )
}
