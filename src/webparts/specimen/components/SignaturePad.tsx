import * as React from "react";
import { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";

const SignatureComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad>();

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  const clearSignature = () => {
    signaturePadRef.current?.clear();
  };

  const saveSignature = () => {
    if (signaturePadRef.current?.isEmpty()) {
      alert("Tanda tangan kosong");
      return;
    }

    // ⛔️ Jangan tambahkan background apapun
    const dataURL = signaturePadRef.current?.toDataURL("image/png"); // transparan
    console.log("Signature PNG (transparan):", dataURL);

    // Kirim ke backend/SharePoint jika perlu
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid #000" }} // ⛔️ Jangan tambahkan background di sini
      />
      <br />
      <button onClick={clearSignature}>Clear</button>
      <button onClick={saveSignature}>Save</button>
    </div>
  );
};

export default SignatureComponent;
