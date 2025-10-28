import { BASE_URL } from "../services/api"
import { useState } from "react"
import { updateProfile } from "../services/User.js"

const Profile = ({ user, setUser }) => {
  let initialState = {
    username: user?.username,
    email: user?.email,
    role: user?.role,
  }

  const [formValues, setFormValues] = useState(initialState)
  const [pictureFile, setPictureFile] = useState(user.picture)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleFile = (e) => {
    setPictureFile(e.target.files?.[0] || null)
  }

  const handleSubmit = async (e) => {
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
      <div className="col register">
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
    </>
  )
}
export default Profile
