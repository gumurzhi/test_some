import { getProfile } from '../common/middleware/getProfile';
import { HttpMethods, RouteRecord } from '../common/typings/route-record';
import { JobController } from './job.controller';

const controller = new JobController();
export const jobRoutes: RouteRecord[] = [
  {
    method: HttpMethods.GET,
    path: '/jobs/unpaid',
    handler: controller.getUnpaidJobs.bind(controller),
    middlewares: [getProfile]
  },
  {
    method: HttpMethods.POST,
    path: '/jobs/:job_id/pay',
    handler: controller.payForJob.bind(controller),
    middlewares: [getProfile]
  }
];
