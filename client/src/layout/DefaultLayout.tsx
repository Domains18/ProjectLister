import { Outlet, Navigate } from 'react-router-dom';


const DefaultLayout = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />
  }
  return (

    <>
      DefaultLayout
      <Outlet />
    </>
  )
}

export default DefaultLayout
