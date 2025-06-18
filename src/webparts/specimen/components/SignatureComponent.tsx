import * as React from "react";
import { useSignaturePad } from "../hooks/useSignaturePad";

const SignatureComponent: React.FC = () => {
  const { canvasRef, isEmpty, clear, getDataURL } = useSignaturePad();
  console.log("empty :", isEmpty);
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className={`border rounded border-${isEmpty ? "danger" : "success"}`}
      />
      <div className="d-flex my-3" style={{ gap: "5px" }}>
        <button onClick={clear}>Clear</button>
        <button onClick={() => console.log(getDataURL())}>Save</button>
      </div>
    </div>
  );
};

export default SignatureComponent;
