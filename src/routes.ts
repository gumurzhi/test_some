import { RouteRecord } from './common/typings/route-record';
import { contractRoutes } from './contract/contract.routes';
import { jobRoutes } from './job/job.routes';
import { clientRoutes } from './client/client.routes';
import { adminRoutes } from './admin/admin.routes';
export const routeList: RouteRecord[] = [...contractRoutes, ...jobRoutes, ...clientRoutes, ...adminRoutes];
