import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Scanner() {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 }
    );

    scanner.render(
      (decodedText) => {
        console.log("RAW QR:", decodedText);

        try {
          const data = JSON.parse(decodedText);

          const visitId = data.visit_id;

          alert("Visit ID: " + visitId);

          // 👉 future: API call yaha karega

        } catch (err) {
          alert("Invalid QR format");
          console.log(err);
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