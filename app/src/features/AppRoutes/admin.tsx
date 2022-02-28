import { AdminPageLayout } from 'features/components'
import FoodEntries from 'features/FoodEntries'
import Reports from 'features/Reports'
import Users from 'features/Users'
import { RouteObject } from 'react-router-dom'

export const adminRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AdminPageLayout />,
    children: [
      {
        index: true,
        element: <FoodEntries />,
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: ':userId',
            element: <div>User page</div>,
          },
        ],
      },
      {
        path: 'reports',
        element: <Reports />,
      },
    ],
  },
]
