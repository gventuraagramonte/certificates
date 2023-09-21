import axios from "axios";

const API_BASE_AUTH = "https://monitoreoniubiz.com/auth";
const API_BASE_URL = "https://monitoreoniubiz.com/items";
//const API_BASE_URL = "http://localhost:4000/items";

// Items
export const createItem = async (data, config) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error creating to item.  ", error);
  }
};

export const fetchItems = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.log("Error fetching items: ", error);
    return [];
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
};

// Usuarios
export const login = async (user) => {
  const response = await axios.post(`${API_BASE_AUTH}/login`, user);
  return response.data;
};
