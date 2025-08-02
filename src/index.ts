import { HealthCheckController } from '@controllers/healthCheckController';
import { ContactController } from '@controllers/contactController';

const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');
const corsOptions = {
  origin: 'https://marcoslandi.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const healthCheckController = new HealthCheckController();
const contactController = new ContactController();

app.get('/', (req: any, res: any) => {
  healthCheckController.healthCheck(req, res);
});

app.all('/api/contact', (req: any, res: any) => {
  contactController.handleRequest(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
