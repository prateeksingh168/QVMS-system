import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");

    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        className="border p-2 mb-2 w-64"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 mb-2 w-64"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>

      {/* 🔥 Signup link */}
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}