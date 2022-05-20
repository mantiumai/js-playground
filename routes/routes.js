import linkedinBotRoutes from './linkedin-bot.router.js';
import path from 'path';

export default function appRouter(app) {
  // default route
  app.get('/', (req, res) => {
    let __dirname = path.resolve();
    res.sendFile(__dirname + '/views/index.html');
  });
  // import other routes
  linkedinBotRoutes(app);
}
