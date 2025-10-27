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
