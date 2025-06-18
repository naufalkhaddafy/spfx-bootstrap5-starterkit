import * as React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import type { ISpecimenProps } from "./ISpecimenProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { useSpecimens } from "../hooks/useSpecimens";
import SignatureComponent from "./SignatureComponent";
// import { useSignaturePad } from "../hooks/useSignaturePad";

const Specimen: React.FC<ISpecimenProps> = ({ userDisplayName, context }) => {
  const { items: initialUrl, loading: initialLoading } = useSpecimens(
    context,
    "initial"
  );

  const { items: signatureUrl, loading: signatureLoading } = useSpecimens(
    context,
    "signature"
  );

  const [editInitial, setEditInitial] = useState<boolean>(false);
  const [editSignature, setEditSignature] = useState<boolean>(false);

  // const canvasSignature = React.useRef<HTMLCanvasElement>(null);
  // // const canvasInitial = React.useRef<HTMLCanvasElement>(null);
  // const {
  //   canvasRef: canvasInitial,
  //   isEmpty,
  //   clear: clearInitial,
  //   getDataURL,
  // } = useSignaturePad();
  return (
    <section className="container mt-4">
      <div className="">
        <h5 className="">Hello, {escape(userDisplayName)}!</h5>
        <p className="">
          This is your signature in <strong>eSign application</strong>.
        </p>

        <div className="row my-5">
          <div className="col-12 col-lg-6">
            <h5>Initial Specimen</h5>
            {/* <SignatureComponent canvasRef={canvasInitial} isEmpty={isEmpty} /> */}
            {/* <button onClick={clearInitial}>Clear</button>
            <button onClick={() => console.log(getDataURL())}>Save</button> */}
            {editInitial ? (
              <div id="initialPad" className="my-3">
                <SignatureComponent />
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
            <button
              type="button"
              className="btn btn-primary me-2 my-2 btn-sm"
              onClick={() => setEditInitial(!editInitial)}
            >
              Update Initial
            </button>
          </div>
          <div className="col-12 col-lg-6">
            <h5>Signature Specimen</h5>
            {editSignature ? (
              <div id="initialPad" className="my-3">
                <SignatureComponent />
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
            <button
              type="button"
              className="btn btn-primary me-2 my-2 btn-sm"
              onClick={() => setEditSignature(!editSignature)}
            >
              Update Signature
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specimen;
