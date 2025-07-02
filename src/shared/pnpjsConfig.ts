// shared/pnpjsConfig.ts
import { spfi, SPFI } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";

// ⚠️ JANGAN import manual modul seperti "@pnp/sp/files" di sini

let _sp: SPFI;

export const getSP = (context: WebPartContext, baseUrl?: string): SPFI => {
  if (!_sp) {
    _sp = spfi(baseUrl).using(SPFx(context));
  }
  return _sp;
};
