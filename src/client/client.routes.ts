import { getProfile } from '../common/middleware/getProfile';
import { HttpMethods, RouteRecord } from '../common/typings/route-record';
import { ClientController } from './client.controller';

const controller = new ClientController();
export const clientRoutes: RouteRecord[] = [
  {
    method: HttpMethods.POST,
    path: '/balances/deposit/:userId',
    handler: controller.depositMoney.bind(controller),
    middlewares: [getProfile]
  }
];
