import { DBClient } from "./core/client";

export function InstallMigrations() {
  return new DBClient("app-db").setup([], 1);
}
