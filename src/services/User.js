import Client from "./api"

export const updateProfile = async (data) => {
  try {
    const res = await Client.put("/user", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    return res.data
  } catch (error) {
    throw error
  }
}
