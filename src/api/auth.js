import axios from "axios";

export const userLogin = async (email, password) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed: ' + response.status);
  }

  const data = await response.json();
  return data; // contains access_token
};


const BASE_URL = "https://api.escuelajs.co/api/v1";

// Signup API
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error.response?.data || error;
  }
};