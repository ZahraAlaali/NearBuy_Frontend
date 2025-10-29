import Client from "./api"

export const createStore = async (data) => {
  try {
    const res = await Client.post("/store/create", data)
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
    const res = await Client.get("/store/owner")
    return res.data
  } catch (error) {
    throw error
  }
}

export const getStoresByFilter = async (data) => {
  try {
    const res = await Client.post("/store/filter", data)
    return res.data
  } catch (error) {
    throw error
  }
}
