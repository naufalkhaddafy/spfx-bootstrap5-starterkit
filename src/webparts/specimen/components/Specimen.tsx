import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import type { ISpecimenProps } from "./ISpecimenProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { useSpecimens } from "../hooks/useSpecimens";

const Specimen: React.FC<ISpecimenProps> = ({ userDisplayName, context }) => {
  const { items: initialUrl, loading: initialLoading } = useSpecimens(
    context,
    "initial"
  );

  const { items: signatureUrl, loading: signatureLoading } = useSpecimens(
    context,
    "signature"
  );

  console.log("Initial URL:", initialUrl);

  return (
    <section className="container mt-4">
      <div className="">
        <div className="">
          <h5 className="">Hello, {escape(userDisplayName)}!</h5>
          <p className="">
            This is your signature in <strong>eSign application</strong>.
          </p>

          <div className="row mt-3">
            <div className="col">
              <h5>Initial Specimen</h5>
              {initialLoading || !initialUrl ? (
                <div className="img-fluid rounded border h-100 d-flex align-items-center justify-content-center">
                  <p className="">Loading or initial signature not found.</p>
                </div>
              ) : (
                <img
                  src={initialUrl}
                  alt="Signature"
                  className="img-fluid rounded border"
                  style={{ width: "300px", height: "200px" }}
                />
              )}
            </div>
            <div className="col">
              <h5>Signature Specimen</h5>
              {signatureLoading ? (
                <p>Loading or signature not found.</p>
              ) : (
                <img
                  src={signatureUrl}
                  alt="Signature"
                  className="img-fluid rounded border"
                  style={{ width: "300px", height: "200px" }}
                />
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary me-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specimen;
