import * as express from 'express';
import * as bodyParser from 'body-parser';
import { httpProcessor } from './common/processor/http.processor';
import { routeList } from './routes';

export const app = express();
app.use(bodyParser.json());
console.log(`\n`);
httpProcessor(routeList, app);
console.log(`\n`);
app.get('*', function (req, res) {
  res.status(404).send('page not found');
});
