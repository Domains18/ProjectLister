import './auth.scss'
const Login = () => {
  return (
    <div className='auth'>
      <div className="form-container">
        <h1>Welcome back, Please login</h1>
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="text" name='email' id='email' />
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='email' />
          <input type="submit" className='submit' />
        </form>
      </div>
    </div>
  )
}

export default Login
