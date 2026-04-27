import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Scanner() {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 }
    );

    scanner.render(
      async (decodedText) => {
        console.log("RAW QR:", decodedText);

        try {
          const data = JSON.parse(decodedText);
          const visitId = data.visit_id;

          const res = await fetch(
            "https://imaginative-emotion-production-0b9d.up.railway.app/visit/scan",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ visit_id: visitId }),
            }
          );

          const result = await res.json();

          alert(`Status: ${result.status}`);

        } catch (err) {
          alert("Invalid QR");
        }
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Scan QR</h2>
      <div id="reader"></div>
    </div>
  );
}