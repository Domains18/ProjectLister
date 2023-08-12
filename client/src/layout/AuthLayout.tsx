import { Outlet } from "react-router-dom"
import { UseStateContext } from "../context"
import { Navigate } from "react-router-dom"

const AuthLayout = () => {
  const { token } = UseStateContext()
  if (token) {
    <Navigate to="/dashboard" />
  }
  return (
    <div>AuthLayout
      <Outlet />
    </div>
  )
}

export default AuthLayout
