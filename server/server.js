const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();
const http = require('http').createServer(app);

const router = express.Router();

const connectDB = require('./config/db');

// Connect Database
connectDB();

// Middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

const routes = require('./routes/index')(router, app);
// API routes
app.use(routes);

http.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
