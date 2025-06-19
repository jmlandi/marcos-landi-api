export class HealthCheckController {
  constructor() {}
  async healthCheck(req: any, res: any): Promise<void> {
    res.status(200).json({ status: 'ok' });
  }
}
