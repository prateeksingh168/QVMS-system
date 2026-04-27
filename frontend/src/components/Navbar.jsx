import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-200">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/visitor">Visitor</Link>
      <Link to="/scanner">Scanner</Link>

      <button onClick={logout} className="ml-auto text-red-500">
        Logout
      </button>
    </div>
  );
}