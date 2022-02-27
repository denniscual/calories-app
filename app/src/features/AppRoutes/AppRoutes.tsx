import { hasUser, isAdmin, useLoggedUser } from 'api'
import { useRoutes } from 'react-router-dom'
import { publicRoutes } from './public'
import { adminRoutes } from './admin'
import { userRoutes } from './user'

export function AppRoutes() {
  const loggedUser = useLoggedUser()
  const commonRoutes = [
    {
      path: '*',
      element: <div>No route matched</div>,
    },
  ]

  const currentRoutes = []
  if (!hasUser(loggedUser)) {
    currentRoutes.push(...publicRoutes)
  } else {
    if (isAdmin(loggedUser)) {
      currentRoutes.push(...adminRoutes)
    } else {
      currentRoutes.push(...userRoutes)
    }
  }

  const element = useRoutes([...currentRoutes, ...commonRoutes])
  return <>{element}</>
}
