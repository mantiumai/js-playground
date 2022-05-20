import { LinkedIn } from './../controller/linkedin.js';
let linkedin = new LinkedIn();

export default function linkedinBotRoutes(app) {
  app.get('/auth', (req, res) => linkedin.auth(req, res));

  app.get('/linkedin', (req, res) => linkedin.linkedin(req, res));

  app.post('/mantium', (req, res) => linkedin.postMessage(req, res));
}
