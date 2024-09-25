import { app } from './app';
import { CONFIG } from './config/app.configuration';

(async function init() {
  try {
    app.listen(CONFIG.port, () => {
      console.log(`Express App Listening on Port ${CONFIG.port}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
})();
