import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { EraserRegular } from "@fluentui/react-icons";
import SignaturePad from "signature_pad";
import { Division } from "../../../shared/division";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const pad = new SignaturePad(canvasRef.current, {
      penColor: "blue",
      minWidth: 1,
      maxWidth: 2.5,
    });

    signaturePadRef.current = pad;
  }, [signaturePadRef, canvasRef]);

  const clear = (): void => {
    signaturePadRef.current?.clear();
    setIsEmpty(true);
  };

  const getDataURL = (): string => {
    return signaturePadRef.current?.toDataURL("image/png") ?? "";
  };

  const handleBack: () => void = () => onBack(false);
  const handleSave: () => void = () => {
    if (signaturePadRef.current?.isEmpty()) {
      alert("❌ Lengkapi data sebelum menyimpan!");
      return;
    }
    onSave(getDataURL());
  };
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
          {Object.entries(Division).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
          <option value="Other">Other</option>
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
