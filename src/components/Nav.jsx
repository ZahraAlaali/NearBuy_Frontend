import { Link } from "react-router-dom"
const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    if (user.role === "customer") {
      userOptions = (
        <>
          <h3>Welcome {user.username}!</h3>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
          <Link to="/orders">Orders</Link>
        </>
      )
    } else {
      // business
      userOptions = (
        <>
          <h3>Welcome {user.username}!</h3>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
          <Link to="/orders">Orders</Link>

          {user.hasStore ? null : ( // <Link to="/orderDetails">Orders</Link>
            <Link to="/createStore">Create Store</Link>
          )}
        </>
      )
    }
  }

  const publicOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </>
  )

  return (
    <header>
      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}
export default Nav
