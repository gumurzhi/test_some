import { getProfile } from '../common/middleware/getProfile';
import { HttpMethods, RouteRecord } from '../common/typings/route-record';
import { AdminController } from './admin.controller';

const controller = new AdminController();
export const adminRoutes: RouteRecord[] = [
  {
    method: HttpMethods.GET,
    path: '/admin/best-profession',
    handler: controller.bestProfession.bind(controller),
    middlewares: [getProfile]
  },
  {
    method: HttpMethods.GET,
    path: '/admin/best-clients',
    handler: controller.bestClients.bind(controller),
    middlewares: [getProfile]
  }
];
