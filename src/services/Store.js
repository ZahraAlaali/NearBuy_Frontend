import Client from "./api"

export const createStore = async (data) => {
  try {
    const res = await Client.post("/store/create", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const allStores = async () => {
  try {
    const res = await Client.get("/store")
    return res.data
  } catch (error) {
    throw error
  }
}

export const OwnerStore = async () => {
  try {
    const res = await Client.get("/store/owner", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const getStoresByFilter = async (data) => {
  try {
    const res = await Client.post("/store/filter", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    return res.data
  } catch (error) {
    throw error
  }
}
