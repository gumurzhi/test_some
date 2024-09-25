import { HttpMethods, RouteRecord } from '../typings/route-record';
import { Profile } from '../../profile/models/profile.model';

function mainHandler(app, routeRecord: RouteRecord) {
  app[routeRecord.method](routeRecord.path, ...routeRecord.middlewares, async (req, res) => {
    try {
      const user: Profile = req.profile;
      const params: Record<string, string> = { ...req.params, ...req.query };
      let result;
      if (routeRecord.method === HttpMethods.POST || routeRecord.method === HttpMethods.PUT) {
        result = await routeRecord.handler(user, params, req.body, req, res);
      } else {
        result = await routeRecord.handler(user, params, req, res);
      }
      res.json(result);
    } catch (e) {
      if (e.statusCode) {
        res.status(e.statusCode).send(e.message);
      } else {
        res.status(500).send(`Internal server error: ${e.message}`);
      }
    }
  });
  console.log(`Mapped ${routeRecord.path} ${routeRecord.method} route`);
}

export function httpProcessor(routeList: RouteRecord[], app) {
  routeList.forEach((route) => {
    mainHandler(app, route);
  });
}
