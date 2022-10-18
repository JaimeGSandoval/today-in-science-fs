const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: path.join(__dirname, '..', '..', '/.env') });

const { PORT } = process.env || 8001;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
