import Client from "./api"

export const CreateStore = async (data) => {
  try {
    const res = await Client.post("/store/create", data)
    return res.data
  } catch (error) {
    throw error
  }
}
