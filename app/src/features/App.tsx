import { StrictMode } from 'react'
import { AppRoutes } from './AppRoutes'
import { ErrorBoundary } from 'components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppProviders from './AppProviders'

// TODO:
// - refactor our AuthContext. Check bulletproof-react. Support Storage-based auth and cookie-based auth.
// - refactor our API. I think we gonna move our hooks for react-query inside the api directory. Abstract it and make sure we can change the data fetching to other library
//   with minimum changes. Like migrating to swr.
// - add tests.
// - push the repo to Github and setup CI/CD in github.
// - setup Cypress.
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
