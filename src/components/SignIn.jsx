import { useState } from "react"
import { SignInUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  const initialState = { email: "", password: "" }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await SignInUser(formValues)
    setFormValues(initialState)
    setUser(userData)
    navigate("/")
  }

  return (
    <div className="col signin">
      <form className="col" onSubmit={handleSubmit}>
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
            placeholder="password"
            onChange={handleChange}
            value={formValues.password}
            required
            autoComplete="off"
          />
        </div>
        <button disabled={!formValues.email || !formValues.password}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn
