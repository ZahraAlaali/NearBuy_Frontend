import { useState } from "react"
import { RegisterUser, SignInUser } from "../services/Auth.js"
import { useNavigate } from "react-router-dom"

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    username: "",
    email: "",
    password: "",
    role: "customer",
    confirmPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)
  const [pictureFile, setPictureFile] = useState(null)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleFile = (e) => {
    setPictureFile(e.target.files?.[0] || null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fd = new FormData(e.currentTarget)
    let user = await RegisterUser(fd)
    if (user) {
      setFormValues(initialState)
      if (user.role === "customer") {
        navigate("/signin")
      } else {
        await SignInUser({
          email: formValues.email,
          password: formValues.password,
        })
        navigate("/createStore")
      }
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create Account</h2>

        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={formValues.username}
            required
            autoComplete="username"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
            value={formValues.email}
            required
            autoComplete="email"
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

        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formValues.confirmPassword}
            required
            autoComplete="off"
          />
        </div>

        <div className="role-options">
          <label>
            <input
              defaultChecked
              required
              type="radio"
              name="role"
              value="customer"
              onChange={handleChange}
            />{" "}
            Customer
          </label>
          <label>
            <input
              required
              type="radio"
              name="role"
              value="business"
              onChange={handleChange}
            />{" "}
            Business
          </label>
        </div>

        <div className="input-wrapper">
          <input
            type="file"
            name="picture"
            accept="image/*"
            className="file-input"
            onChange={handleFile}
          />
        </div>

        <button
          className="btn"
          disabled={
            !formValues.username ||
            !formValues.email ||
            !formValues.password ||
            formValues.password !== formValues.confirmPassword
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register
