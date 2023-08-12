import { Outlet, Navigate } from 'react-router-dom'

const GuestLayout = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/dashboard" />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default GuestLayout
