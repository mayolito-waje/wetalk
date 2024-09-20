import dotenv from 'dotenv';
import http from 'http';
import app from './src/app.js';

dotenv.config();

const httpServer = http.createServer(app);

const port = 3000;

httpServer.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on port ${port}`);
});
