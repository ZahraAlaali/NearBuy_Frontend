import { BASE_URL } from "../services/api"
import { useState, useEffect } from "react"
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
  const [pictureFile, setPictureFile] = useState(user?.picture)
  const [passwords, setPassword] = useState(initP)

  useEffect(() => {
    setFormValues({
      username: user?.username || "",
      email: user?.email || "",
      role: user?.role || "",
    })
  }, [user])

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
    if (pass) setPassword(initP)
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append("username", formValues.username)
    fd.append("email", formValues.email)
    if (pictureFile) fd.append("picture", pictureFile)

    const userP = await updateProfile(fd)
    setUser((prev) => ({
      ...prev,
      username: userP.username,
      email: userP.email,
      picture: userP.picture ?? "",
    }))
    setPictureFile(userP.picture ? userP.picture : null)
  }

  return (
    <div className="profile-page">
      <div className="profile-section">
        <form className="profile-form" onSubmit={handleSubmitUpdate}>
          <div className="profile-image-container">
            <img
              className="profile-image"
              src={
                user?.picture
                  ? `${BASE_URL}${user.picture}`
                  : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              }
              alt="profile image"
            />
            <input
              className="file-input"
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFile}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-input"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChangeUpdate}
              value={formValues.username}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChangeUpdate}
              value={formValues.email}
              required
            />
          </div>

          <button
            className="btn btn-primary"
            disabled={!formValues.username || !formValues.email}
          >
            Update Profile
          </button>
        </form>
      </div>

      <div className="profile-section">
        <form className="profile-form" onSubmit={handleSubmitPassword}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              className="form-input"
              name="oldPassword"
              type="password"
              placeholder="Old Password"
              onChange={handleChangePassword}
              value={passwords.oldPassword}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              className="form-input"
              name="newPassword"
              type="password"
              placeholder="New Password"
              onChange={handleChangePassword}
              value={passwords.newPassword}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="form-input"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChangePassword}
              value={passwords.confirmPassword}
              required
            />
          </div>

          <button
            className="btn btn-primary"
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
    </div>
  )
}

export default Profile
