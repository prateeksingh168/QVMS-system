import { useState } from "react";
import API from "../services/api";

export default function RegisterVisitor() {
  const [data, setData] = useState({
    name: "",
    contact: "",
    purpose: "",
    organization: "",
  });

  const [qr, setQr] = useState(null);

  const handleSubmit = async () => {
    try {
      const visitor = await API.post("/visitor/register", data);

      const visit = await API.post("/visit/create", {
        visitor_id: visitor.data.id,
        branch: "MP HQ",
      });

      setQr(visit.data.qr_path);
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Register Visitor</h2>

      <input className="input" placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })} />

      <input className="input" placeholder="Contact"
        onChange={(e) => setData({ ...data, contact: e.target.value })} />

      <input className="input" placeholder="Purpose"
        onChange={(e) => setData({ ...data, purpose: e.target.value })} />

      <input className="input" placeholder="Organization"
        onChange={(e) => setData({ ...data, organization: e.target.value })} />

      <button onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded mt-3">
        Submit
      </button>

      {qr && (
        <div className="mt-6 text-center">
          <h3 className="font-semibold mb-2">QR Code</h3>
          <img src={`http://127.0.0.1:8000/${qr}`} className="mx-auto" />
        </div>
      )}
    </div>
  );
}