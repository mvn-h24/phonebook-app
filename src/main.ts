import { createApp } from "vue";
import { createPinia } from "pinia";
import { InstallMigrations } from "@app/db";
import App from "./App.vue";

function bootstrap() {
  createApp(App).use(createPinia()).mount("#app");
}
InstallMigrations().then(bootstrap);
