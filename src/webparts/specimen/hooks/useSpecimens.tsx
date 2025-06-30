// hooks/useSpecimens.ts
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/webs";
import { useState, useEffect } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../../../shared/pnpjsConfig";
// import { dataURLToBlob } from "../../../utils/helper";

export const useSpecimens = (context: WebPartContext, type?: string) => {
  const baseUrl = "https://kpccoid.sharepoint.com";
  const sp = getSP(context, `${baseUrl}/sites/esign`);
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

  // GET all items
  const getSpecimen = async (): Promise<void> => {
    setLoading(true);
    try {
      const user = await sp.web.ensureUser(context.pageContext.user.email);
      const file = await sp.web
        .getFileByServerRelativePath(
          `/sites/esign/Specimen/${user.Id}-${type}.png`
        )
        .select("ServerRelativeUrl")();
      setItems(`${baseUrl}${file.ServerRelativeUrl}`);
    } catch (err) {
      console.error("❌ Gagal fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE item
  // const uploadAndMoveFile = async (fields: string) => {
  //   const fileName = `${userId}-${type}.png`;
  //   const blob = dataURLToBlob(fields);
  //   // const arrayBuffer = await blob.arrayBuffer();
  //   const folder = await sp.web.getFolderByServerRelativePath(
  //     "/sites/esign/specimen"
  //   );
  //   // const result = await folder.files.add(fileName, blob, true);
  // };

  // UPDATE item
  // const updateItem = async (id: number, fields: any) => {
  //   try {
  //     await sp.web.lists.getByTitle(listName).items.getById(id).update(fields);
  //     await getItems();
  //   } catch (err) {
  //     console.error("❌ Gagal update item:", err);
  //   }
  // };

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
    // createItem,
    // updateItem,
  };
};
