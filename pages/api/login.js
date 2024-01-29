// pages/api/login.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const apiUrl = "https://dummyjson.com/auth/login";
 
  try {
    const apiResponse = await axios.post(apiUrl, req.body);

   
    res.status(apiResponse.status).json(apiResponse.data);
  } catch (error) {
    console.log(error.response);
    const status = error.response ? error.response.status : 500;
    res.status(error.response.status).json({ statuText: error.response.statusText, message: error.response.data.message});
  }
}
