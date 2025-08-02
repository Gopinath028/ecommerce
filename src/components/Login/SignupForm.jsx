import React, { useState } from "react";
import { useLogin } from "../../context/login-context";
import { signupUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";


const SignupForm = () => {
  const { loginDispatch } = useLogin();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      avatar: "https://api.lorem.space/image/face?w=150&h=150", // required field
    };

    try {
      setLoading(true);
      const user = await signupUser(payload);

      loginDispatch({
        type: "SET_LOGIN",
        payload: {
          email: user.email,
          password: formData.password,
          token: "", // API returns token on login, not signup
        },
      });

      alert("Signup successful! Now you can login.");
      navigate('/auth/login')
    } catch (err) {
      setError(err?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Signup
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create New Account"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
