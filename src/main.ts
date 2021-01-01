import {Router} from '@vaadin/router';
import {routes} from './routes';

export const router = new Router(document.getElementById("outlet"));
// @ts-ignore
router.setRoutes(routes);
