import * as React from "react";
import { useSignaturePad } from "../hooks/useSignaturePad";
import { EraserRegular } from "@fluentui/react-icons";

type SignatureComponentProps = {
  onBack: (val: boolean) => void;
  onSave: (val: string) => void;
  onSelectChange: (value: string) => void;
  loading: boolean;
};
const SignatureComponent: React.FC<SignatureComponentProps> = ({
  onBack,
  onSave,
  onSelectChange,
  loading,
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
          onChange={(e) => onSelectChange(e.target.value)}
        >
          <option value="">Select Division</option>
          <option value="IT">IT</option>
          <option value="HSES">HSES</option>
          <option value="ESD">ESD</option>
        </select>

        <div className="d-flex my-3" style={{ gap: "5px" }}>
          <button className="btn btn-sm btn-danger w-100" onClick={handleBack}>
            Cancel
          </button>
          <button
            className="btn btn-sm btn-primary w-100 d-flex justify-content-center align-items-center"
            onClick={handleSave}
            disabled={loading}
            style={{ gap: "5px" }}
          >
            {loading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureComponent;
