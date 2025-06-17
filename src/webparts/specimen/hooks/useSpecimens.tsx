// hooks/useSpecimens.ts
import { useState, useEffect } from "react";
import { spfi } from "@pnp/sp";
import { SPFx } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users";
import "@pnp/sp/files";
import "@pnp/sp/webs";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export const useSpecimens = (context: WebPartContext, type?: string) => {
  const baseUrl = "https://kpccoid.sharepoint.com";
  const sp = spfi(`${baseUrl}/sites/esign`).using(SPFx(context));
  const [items, setItems] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // GET all items
  const getSpecimen = async () => {
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
  // const createItem = async (fields: any) => {
  //   try {
  //     await sp.web.lists.getByTitle(listName).items.add(fields);
  //     await getItems();
  //   } catch (err) {
  //     console.error("❌ Gagal menambah item:", err);
  //   }
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
    getSpecimen().catch((err) => {
      console.error("❌ Gagal fetch items on mount:", err);
    });
  }, []);

  return {
    items,
    loading,
    getSpecimen,
    // createItem,
    // updateItem,
  };
};
