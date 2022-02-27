import UserDashboard from 'features/UserDashboard'
import UserPageLayout from 'features/UserPageLayout'
import { RouteObject } from 'react-router-dom'

export const userRoutes: RouteObject[] = [
  {
    path: '/',
    element: <UserPageLayout />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
    ],
  },
]
