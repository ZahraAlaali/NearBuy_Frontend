import { useState } from "react"
import { SignInUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"

const SignIn = ({ setUser, setItems, checkToken, getItems }) => {
  let navigate = useNavigate()
  const initialState = { email: "", password: "" }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await SignInUser(formValues)
    setFormValues(initialState)
    await checkToken()
    await getItems()
    navigate("/")
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Welcome Back</h2>

        <div className="input-wrapper">
          <label htmlFor="email">Email or Username</label>
          <input
            name="email"
            type="text"
            placeholder="example@example.com"
            onChange={handleChange}
            value={formValues.email}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
            required
            autoComplete="off"
          />
        </div>

        <button
          className="btn"
          disabled={!formValues.email || !formValues.password}
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn
