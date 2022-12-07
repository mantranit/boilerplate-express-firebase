import 'reflect-metadata';
import * as http from 'http';
import dotenv from 'dotenv';

import application from './application';
import Logger from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(application.instance);

server.listen(PORT, () => {
  Logger.debug(`Server is listening on :${PORT}`);
});
