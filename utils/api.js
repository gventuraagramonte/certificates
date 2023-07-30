import axios from "axios";

const API_BASE_URL = "https://monitoreoniubiz.com/items";

export const fetchItems = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.log("Error fetching items: ", error);
    return [];
  }
};
