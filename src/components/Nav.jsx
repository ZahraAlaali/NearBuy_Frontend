import { Link } from "react-router-dom"
const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <>
        <h3>Welcome {user.username}!</h3>
        <Link to="/">Home</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
        <Link to="/itemsList">Add item</Link>
      </>
    )
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
