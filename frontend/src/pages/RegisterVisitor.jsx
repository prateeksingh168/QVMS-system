import { useState } from "react";
import API from "../services/api";

export default function RegisterVisitor() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    purpose: "",
    organization: "",
  });

  const [qr, setQr] = useState("");

  const handleSubmit = async () => {
    try {
      const visitorRes = await API.post("/visitor/register", form);

      const visitorId = visitorRes.data.id;

      console.log("Visitor ID:", visitorId);

      const visitRes = await API.post("/visit/create", {
        visitor_id: visitorId,
        branch: "Indore",
      });

      console.log("Visit Response:", visitRes.data);

      let path = visitRes.data.qr_path;

      path = path.replace(/\\/g, "/");

      const qrUrl = `https://imaginative-emotion-production-0b9d.up.railway.app/${path}`;

      setQr(qrUrl);

    } catch (err) {
      console.error(err);
      alert("Error generating QR");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">

      <h2 className="text-xl font-bold mb-4">Register Visitor</h2>

      <input
        className="input"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Contact"
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
      />

      <input
        className="input"
        placeholder="Purpose"
        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
      />

      <input
        className="input"
        placeholder="Organization"
        onChange={(e) => setForm({ ...form, organization: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white w-full p-2 rounded mt-2"
      >
        Submit
      </button>

      {/* 🔥 QR SHOW HERE (same page) */}
      {qr && (
        <div className="mt-6 text-center">
          <h3 className="mb-2 font-semibold">QR Code</h3>
          <img src={qr} alt="QR" className="mx-auto w-40 border" />
        </div>
      )}

    </div>
  );
}