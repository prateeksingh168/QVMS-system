import { Scanner } from "@yudiel/react-qr-scanner";
import API from "../services/api";

export default function QRScanner() {
  const handleScan = async (result) => {
    if (result?.[0]?.rawValue) {
      const id = result[0].rawValue.split("_")[1];

      try {
        const res = await API.post(`/visit/scan/${id}`);
        alert(`✅ ${res.data.message}`);
      } catch (err) {
        console.error(err);
        alert("❌ Scan failed");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow text-center">
      <h2 className="text-xl font-bold mb-4">Scan QR</h2>

      <Scanner
        onScan={handleScan}
        onError={(err) => {
          console.error(err);
          alert("Camera permission denied ❌");
        }}
      />
    </div>
  );
}