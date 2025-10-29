import { Link } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    if (user.role === "customer") {
      userOptions = (
        <div className="nav-user-options">
          <h3 className="nav-welcome">Welcome {user.username}!</h3>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link onClick={handleLogOut} to="/" className="nav-link">Sign Out</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
          </div>
        </div>
      )
    } else {
      // business
      userOptions = (
        <div className="nav-user-options">
          <h3 className="nav-welcome">Welcome {user.username}!</h3>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link onClick={handleLogOut} to="/" className="nav-link">Sign Out</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            {!user.hasStore && <Link to="/createStore" className="nav-link">Create Store</Link>}
          </div>
        </div>
      )
    }
  }

  const publicOptions = (
    <div className="nav-public-options">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/signin" className="nav-link">Sign In</Link>
      </div>
    </div>
  )

  return (
    <header className="nav-header">
      <nav className="nav-container">{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav
