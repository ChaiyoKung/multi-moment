import { genKey } from "./utils/gen-key";

export const LocalStorageKey = {
  ListIds: genKey("list-ids"),
  ListTitleById: (id: string) => genKey(`list-title:${id}`),
  ListTimeById: (id: string) => genKey(`list-time:${id}`),
} as const;
