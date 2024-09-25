import { ContractController } from './contract.controller';
import { getProfile } from '../common/middleware/getProfile';
import { HttpMethods, RouteRecord } from '../common/typings/route-record';

const controller = new ContractController();
export const contractRoutes: RouteRecord[] = [
  { method: HttpMethods.GET, path: '/contracts/:id', handler: controller.getById.bind(controller), middlewares: [getProfile] },
  { method: HttpMethods.GET, path: '/contracts', handler: controller.getContractList.bind(controller), middlewares: [getProfile] }
];
