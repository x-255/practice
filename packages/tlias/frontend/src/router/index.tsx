import Layout from '@/pages/SysLayout'
import Login from '@/pages/Login'
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/Dashbord')),
      },
      {
        path: '/depts',
        Component: lazy(() => import('@/pages/Depts')),
      },
      {
        path: '/emps',
        Component: lazy(() => import('@/pages/Emps')),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
