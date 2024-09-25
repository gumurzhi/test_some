import { Middleware } from './express-middleware';
import { Profile } from '../../profile/models/profile.model';

export type GetHandler = (
  user: Profile,
  params: Record<string, string>,
  req?: Express.Request,
  res?: Express.Response
) => Promise<Record<string, any>>;
export type WriteHandler = (
  user: Profile,
  params: Record<string, string>,
  body: Record<string, any>,
  req?: Express.Request,
  res?: Express.Response
) => Promise<Record<string, any>>;

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}
export class RouteRecord {
  method: HttpMethods;
  path: string;
  handler: GetHandler | WriteHandler;
  middlewares: Middleware[];
}
