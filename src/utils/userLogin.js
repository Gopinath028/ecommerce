export const userLogin = async (email, password) => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
    return { access_token: null, error: error.message };
  }
};
