import Client from "./api"

export const editItem = async (itemId, data) => {
  try {
    const res = await Client.post(`/item/${itemId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
