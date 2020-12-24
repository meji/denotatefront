import { Router } from "@vaadin/router";
import { routes } from "./src/routes/index";
export const router = new Router(document.getElementById("outlet"));
router.setRoutes(routes);
