// hooks/useSpecimens.ts
import { useState, useEffect, useMemo } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../../../shared/pnpjsConfig";
import { SPFI } from "@pnp/sp";

export const useSpecimens = (context: WebPartContext, type?: string) => {
  const baseUrl = "https://kpccoid.sharepoint.com";
  // const sp: SPFI = getSP(context, `${baseUrl}/sites/esign`);
  const sp: SPFI = useMemo(
    () => getSP(context, `${baseUrl}/sites/esign`),
    [context]
  );

  const [items, setItems] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const getUserId = async (): Promise<void> => {
    try {
      const user = await sp.web.ensureUser(context.pageContext.user.email);
      setUserId(user.Id);
    } catch (err) {
      console.error("❌ Gagal mendapatkan ID pengguna:", err);
    }
  };

  const getSpecimen = async (): Promise<void> => {
    setLoading(true);
    try {
      const user = await sp.web.ensureUser(context.pageContext.user.email);
      const filePath = `/sites/esign/Specimen/${user.Id}-${type}.png`;

      const file = sp.web.getFileByServerRelativePath(filePath);
      const blob = await file.getBlob();

      const blobUrl = URL.createObjectURL(blob);

      setItems(blobUrl);
    } catch (err) {
      console.error("❌ Gagal fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  async function updateFile(
    fileName: string,
    content: Blob,
    division: string
  ): Promise<void> {
    setLoading(true);
    try {
      await sp.web
        .getFolderByServerRelativePath("Specimen")
        .files.addUsingPath(fileName, content, { Overwrite: true });

      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      const relativePath = `/sites/esign/Specimen/${fileName}`;
      const item = await sp.web
        .getFileByServerRelativePath(relativePath)
        .getItem();

      await item.update({
        Specimen_x0020_Type: type === "initial" ? "Initial" : "Signature",
        Specimen_x0020_OwnerId: userId,
        Division1: division,
        Format: "Formatted",
      });
      const blobUrl = URL.createObjectURL(content);
      setItems(blobUrl);
    } catch (err) {
      console.error("❌ Gagal upload atau update metadata:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserId().catch((err) => {
      console.error("❌ Gagal mendapatkan ID pengguna on mount:", err.message);
    });
    getSpecimen().catch((err) => {
      console.error("❌ Gagal fetch items on mount:", err.message);
    });
  }, []);

  return {
    items,
    loading,
    getSpecimen,
    userId,
    updateFile,
  };
};
