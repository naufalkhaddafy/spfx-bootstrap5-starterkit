import * as React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import type { IInitiateProps } from "./IInitiateProps";
import { Document, Page } from "react-pdf";

const Initiate: React.FC<IInitiateProps> = ({ userDisplayName, context }) => {
  // const [url, setUrl] = useState<string | undefined>("");
  console.log(userDisplayName, context);

  // const baseUrl = "https://kpccoid.sharepoint.com";

  // const sp: SPFI = useMemo(
  //   () => getSP(context, `${baseUrl}/sites/esign`),
  //   [context]
  // );

  // async function data() {
  //   const serverUrl = "/gensys/IT/Cara Menampilkan IP address.pdf";
  //   const blob = await sp.web.getFileByServerRelativeUrl(serverUrl).getBlob();
  //   const url = URL.createObjectURL(blob);
  //   return setUrl(url);
  // }

  // useEffect(() => {
  //   data()
  //     .then(() => {
  //       console.log("success");
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <section>
      <div>
        <h1>Testing Initiate eSign</h1>
      </div>
      <div className="">
        <Document file="/assets/tes.pdf">
          <Page pageNumber={1} />
        </Document>
      </div>
    </section>
  );
};

export default Initiate;
