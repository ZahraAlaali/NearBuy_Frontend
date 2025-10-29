import Client from "./api"

export const updateProfile = async (data) => {
  try {
    const res = await Client.put("/user", data)
    return res.data
  } catch (error) {
    throw error
  }
}
