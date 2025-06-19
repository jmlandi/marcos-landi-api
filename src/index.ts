import { HealthCheckController } from '@controllers/healthCheckController';
import { ContactController } from '@controllers/contactController';

const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const healthCheckController = new HealthCheckController();
const contactController = new ContactController();

app.get('/', (req: any, res: any) => {
  healthCheckController.healthCheck(req, res);
});
app.all('/api/contact', (req: any, res: any) => {
  contactController.handleRequest(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
