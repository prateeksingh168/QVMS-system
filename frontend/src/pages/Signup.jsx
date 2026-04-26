import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // default
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

      <input placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input type="password" placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <select onChange={(e) => setData({ ...data, role: e.target.value })}>
        <option value="admin">Admin</option>
        <option value="security">Security</option>
      </select>

      <button onClick={handleSignup}>Signup</button>
      </div>
      </div>
    </div>
  );
}