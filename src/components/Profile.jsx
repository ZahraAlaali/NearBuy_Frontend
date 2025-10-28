import { BASE_URL } from "../services/api"
import { useState } from "react"
import { updateProfile } from "../services/User.js"
import { UpdatePassword } from "../services/Auth.js"

const Profile = ({ user, setUser }) => {
  let initialState = {
    username: user?.username,
    email: user?.email,
    role: user?.role,
  }
  const initP = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)
  const [pictureFile, setPictureFile] = useState(user.picture)
  const [passwords, setPassword] = useState(initP)

  const handleChangeUpdate = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleChangePassword = (e) => {
    setPassword({ ...passwords, [e.target.name]: e.target.value })
  }

  const handleFile = (e) => {
    setPictureFile(e.target.files?.[0] || null)
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()

    let pass = await UpdatePassword(passwords, user.id)
    if (pass) {
      setPassword(initP)
    }
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault()

    const fd = new FormData()
    Object.entries(formValues).forEach(([k, v]) => fd.append(k, v))
    if (pictureFile) fd.append("picture", pictureFile)
    const response = await updateProfile(fd)
    if (response) {
      console.log(response)
      initialState = {
        username: formValues.username,
        email: formValues.email,
      }
      setFormValues(initialState)
      setUser(response)
    }
  }
  return (
    <>
      <div className="col">
        <form onSubmit={handleSubmitUpdate}>
          <div className="input-wrapper">
            <img
              width="100px"
              src={
                user.picture
                  ? `${BASE_URL}${user.picture}`
                  : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              }
              alt="profile image"
            />
            <br />
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFile}
            />
            <br />
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChangeUpdate}
              value={formValues.username}
              required
              autoComplete="username"
            />
          </div>
          <br />
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChangeUpdate}
              value={formValues.email}
              required
              autoComplete="email"
            />
          </div>
          <br />
          <button disabled={!formValues.username || !formValues.email}>
            Update Profile
          </button>
        </form>
      </div>

      <div className="col">
        <form onSubmit={handleSubmitPassword}>
          <div className="input-wrapper">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              name="oldPassword"
              type="password"
              placeholder="oldPassword"
              onChange={handleChangePassword}
              value={passwords.oldPassword}
              required
            />
          </div>
          <br />
          <div className="input-wrapper">
            <label htmlFor="newPassword">New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="newPassword"
              onChange={handleChangePassword}
              value={passwords.newPassword}
              required
            />
          </div>
          <br />
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="confirmPassword"
              onChange={handleChangePassword}
              value={passwords.confirmPassword}
              required
            />
          </div>
          <br />
          <button
            disabled={
              !passwords.oldPassword ||
              !passwords.newPassword ||
              !passwords.confirmPassword
            }
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  )
}
export default Profile
