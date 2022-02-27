import Login from 'features/Login'
import PublicPageLayout from 'features/PublicPageLayout'
import { RouteObject } from 'react-router-dom'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicPageLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]

function Signup() {
  return <div>Sign up</div>
}
