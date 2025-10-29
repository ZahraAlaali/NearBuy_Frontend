import { BASE_URL } from "../services/api"
import { useState } from "react"
import { updateStore } from "../services/Store.js"
import { useNavigate, useParams } from "react-router-dom"
import CategorySelect from "./CategorySelect.jsx"
import Cities from "./Cities.jsx"

const UpdateStore = ({ ownerStore, setOwnerStore }) => {
  let navigate = useNavigate()
  const { storeId } = useParams()
  let initialState = {
    name: ownerStore?.name,
    description: ownerStore?.description,
    category: ownerStore?.category,
    city: ownerStore?.city,
  }

  const [formValues, setFormValues] = useState(initialState)
  const [pictureFile, setPictureFile] = useState(ownerStore?.picture)

  const handleChange = (e) => {
    // credits for CHATGPT
    const { name, value, options, multiple } = e.target
    if (multiple) {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value)
      setFormValues({ ...formValues, [name]: selected })
    } else {
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const handleFile = (e) => {
    setPictureFile(e.target.files?.[0] || null)
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const updated = await updateStore(storeId, fd)
    setOwnerStore(updated)
    setPictureFile(updated.picture ? updated.picture : null)
    navigate("/")
  }
  return (
    <>
      <div className="col">
        <form className="col" onSubmit={handleSubmitUpdate}>
          <div className="input-wrapper">
            <img
              width="300px"
              src={
                ownerStore?.picture
                  ? `${BASE_URL}${ownerStore.picture}`
                  : "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-store-icon-in-line-style-png-image_1736161.jpg"
              }
              alt=""
            />
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="name">Store Name</label>
            <input
              name="name"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formValues.description}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="category">Category</label>
            <CategorySelect
              handleChange={handleChange}
              formValues={formValues}
              multiple={true}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="city">City</label>
            <Cities
              handleChange={handleChange}
              formValues={formValues}
              allop={false}
            />
          </div>

          <button
            disabled={
              !formValues.name ||
              formValues.category.length === 0 ||
              !formValues.city
            }
          >
            Update Store
          </button>
        </form>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault()
          navigate("/")
        }}
      >
        Cancel
      </button>
    </>
  )
}
export default UpdateStore
