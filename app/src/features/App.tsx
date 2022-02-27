import { StrictMode } from 'react'
import { AppRoutes } from './AppRoutes'
import { ErrorBoundary } from 'components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppProviders from './AppProviders'

// TODO:
// - do a review.
// - create `components` directory inside features and move some generic feature-based components.
// - refactor our AuthContext. Check bulletproof-react. Support Storage-based auth and cookie-based auth.
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
