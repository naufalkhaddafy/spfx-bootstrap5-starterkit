// hooks/useSpecimens.ts
import { useState, useEffect } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../../../shared/pnpjsConfig";
import { SPFI } from "@pnp/sp";

export const useSpecimens = (context: WebPartContext, type?: string) => {
  const baseUrl = "https://kpccoid.sharepoint.com";
  const sp: SPFI = getSP(context, `${baseUrl}/sites/esign`);
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
      const file = await sp.web
        .getFileByServerRelativePath(
          `/sites/esign/Specimen/${user.Id}-${type}.png`
        )
        .select("ServerRelativeUrl")();
      const noCacheUrl = `${baseUrl}${file.ServerRelativeUrl}?ts=${Date.now()}`;
      setItems(noCacheUrl);
    } catch (err) {
      console.error("❌ Gagal fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  async function updateFile(
    fileName: string,
    content: Blob,
    metadata?: { [key: string]: string }
  ): Promise<void> {
    try {
      const upload = await sp.web
        .getFolderByServerRelativePath("Specimen")
        .files.addUsingPath(fileName, content, { Overwrite: true });

      await console.log(`✅ Upload berhasil: ${upload}`);
      // Optional: Update metadata kalau ada
      // if (metadata) {
      //   const listItem = await upload.file.getItem();
      //   await listItem.update(metadata);
      // }

      // ⬇️ Panggil fetch ulang file setelah update berhasil
      await getSpecimen();
    } catch (err) {
      console.error("❌ Gagal upload atau update metadata:", err);
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
