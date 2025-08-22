import * as React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import type { ISpecimenProps } from "./ISpecimenProps";
import { useSpecimens } from "../hooks/useSpecimens";
import SignatureComponent from "./SignatureComponent";
import { dataURLToBlob } from "../../../utils/helper";
import { ColorLineRegular } from "@fluentui/react-icons";

const Specimen: React.FC<ISpecimenProps> = ({ userDisplayName, context }) => {
  const {
    items: initialUrl,
    userId,
    updateFile: updateFileInitial,
    loading: initialLoading,
  } = useSpecimens(context, "initial");

  const {
    items: signatureUrl,
    updateFile: updateFileSignature,
    loading: signatureLoading,
  } = useSpecimens(context, "signature");

  const [editInitial, setEditInitial] = useState<boolean>(false);
  const [editSignature, setEditSignature] = useState<boolean>(false);
  const [division, setDivision] = useState<string | null>(null);
  const handleSave = (val: string, type: string) => {
    if (!val || !division) {
      alert("❌ Lengkapi data sebelum menyimpan!");
      return;
    }

    (type === "initial" ? updateFileInitial : updateFileSignature)(
      `${userId}-${type}.png`,
      dataURLToBlob(val),
      division
    )
      .then(() => {
        if (type === "initial") {
          setEditInitial(false);
        } else if (type === "signature") {
          setEditSignature(false);
        }
      })
      .catch((err) => {
        console.error("❌ Gagal mengupdate file:", err);
      });
  };
  return (
    <section className="container mt-4">
      <div className="">
        <h5 className="">Hello, {userDisplayName}!</h5>
        <p className="">
          This is your signature in <strong>eSign application</strong>.
        </p>

        <div className="d-flex my-5 flex-wrap" style={{ gap: "50px" }}>
          <div className="" style={{ minWidth: "300px" }}>
            <h5>Initial Specimen</h5>
            {editInitial ? (
              <div id="initialPad" className="my-3">
                <SignatureComponent
                  onBack={(val) => setEditInitial(val)}
                  onSave={(val) => handleSave(val, "initial")}
                  onSelectChange={(value) => setDivision(value)}
                  loading={initialLoading}
                />
              </div>
            ) : (
              <div id="initialSpecimen" className="my-3">
                {initialLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "300px", height: "200px" }}
                  >
                    Loading...
                  </div>
                ) : !initialUrl ? (
                  <img
                    src={require("../assets/no-initial.png")}
                    alt="no-initial.png"
                    className="img-fluid rounded border"
                    style={{ width: "300px", height: "200px" }}
                  />
                ) : (
                  <img
                    src={initialUrl}
                    alt="Signature"
                    className="img-fluid rounded border"
                    style={{ width: "300px", height: "200px" }}
                  />
                )}
              </div>
            )}
            {editInitial ? (
              ""
            ) : (
              <button
                type="button"
                className={`btn btn-primary me-2 my-2 btn-sm`}
                onClick={() => {
                  setEditInitial(!editInitial);
                  setDivision(null);
                }}
              >
                <ColorLineRegular fontSize={16} /> Update Initial
              </button>
            )}
          </div>
          <div className="" style={{ minWidth: "300px" }}>
            <h5>Signature Specimen</h5>
            {editSignature ? (
              <div id="initialPad" className="my-3">
                <SignatureComponent
                  onBack={(val) => setEditSignature(val)}
                  onSave={(val) => handleSave(val, "signature")}
                  onSelectChange={(value) => setDivision(value)}
                  loading={signatureLoading}
                />
              </div>
            ) : (
              <div id="signatureSpecimen" className="my-3">
                {signatureLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "300px", height: "200px" }}
                  >
                    Loading...
                  </div>
                ) : !signatureUrl ? (
                  <img
                    src={require("../assets/no-signature.png")}
                    alt="no-signature.png"
                    className="img-fluid rounded border"
                    style={{ width: "300px", height: "200px" }}
                  />
                ) : (
                  <img
                    src={signatureUrl}
                    alt="Signature"
                    className="img-fluid rounded border"
                    style={{ width: "300px", height: "200px" }}
                  />
                )}
              </div>
            )}
            {editSignature ? (
              ""
            ) : (
              <button
                type="button"
                className="btn btn-primary me-2 my-2 btn-sm"
                onClick={() => {
                  setEditSignature(!editSignature);
                  setDivision(null);
                }}
              >
                <ColorLineRegular fontSize={16} /> Update Signature
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specimen;
