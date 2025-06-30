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
      <div className="my-3" style={{ width: "300px" }}>
        <select
          className="form-select-sm my-2 w-100"
          aria-label="Default select example"
        >
          <option selected>Select Division</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>

        <div className="d-flex my-3" style={{ gap: "5px" }}>
          <button className="btn btn-sm btn-secondary w-100" onClick={clear}>
            Clear
          </button>
          <button
            className="btn btn-sm btn-primary w-100"
            onClick={() => console.log(getDataURL())}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureComponent;
