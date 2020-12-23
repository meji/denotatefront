import { Router } from "@vaadin/router";
import { routes } from "./src/routes/index";
const outlet = document.getElementById("outlet");
export const router = new Router(outlet);
router.setRoutes(routes);
