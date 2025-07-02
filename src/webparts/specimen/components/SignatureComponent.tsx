import * as React from "react";
import { useSignaturePad } from "../hooks/useSignaturePad";
import { EraserRegular } from "@fluentui/react-icons";

type SignatureComponentProps = {
  onBack: (val: boolean) => void;
  onSave: (val: string) => void;
};
const SignatureComponent: React.FC<SignatureComponentProps> = ({
  onBack,
  onSave,
}) => {
  const { canvasRef, isEmpty, clear, getDataURL } = useSignaturePad();
  const handleBack: () => void = () => onBack(false);
  const handleSave: () => void = () => onSave(getDataURL());
  return (
    <div>
      <div className="position-relative d-inline-block">
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className={`border rounded border-${isEmpty ? "danger" : "success"}`}
        />
        <button
          onClick={clear}
          className="position-absolute top-0 end-0 btn btn-sm"
        >
          <EraserRegular fontSize={20} color="red" />
        </button>
      </div>
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
          <button className="btn btn-sm btn-danger w-100" onClick={handleBack}>
            Cancel
          </button>
          <button className="btn btn-sm btn-primary w-100" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureComponent;
