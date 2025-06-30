import { spfi, SPFI } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/site-users";

import { WebPartContext } from "@microsoft/sp-webpart-base";

export const getSP = (context: WebPartContext, baseUrl?: string): SPFI => {
  return spfi(baseUrl).using(SPFx(context));
};
