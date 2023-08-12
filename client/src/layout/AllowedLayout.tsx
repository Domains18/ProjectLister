import { Navigate, Outlet } from "react-router-dom"
import { UseStateContext } from "../context"

const AllowedLayout = () => {
  const { token } = UseStateContext()
  if (!token) {
    <Navigate to="/login" />
    }
  return (
    <>
      <Outlet />
    </>
  )
}

export default AllowedLayout
