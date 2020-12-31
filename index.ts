import { Router } from "@vaadin/router";
import { routes } from "./src/routes";
export const router = new Router(document.getElementById("outlet"));
router.setRoutes(routes);
