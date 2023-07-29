import axios from "axios";

const API_BASE_URL =
  "http://ec2-54-236-5-242.compute-1.amazonaws.com:3000/items";

export const fetchItems = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.log("Error fetching items: ", error);
    return [];
  }
};
