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
          <Link to="/itemsList">Add item</Link>
          {/* <Link to="/orderDetails">Orders</Link> */}
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

          {user.hasStore ? // <Link to="/orderDetails">Orders</Link>
          null : (
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
