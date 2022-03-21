import twitterBotRoutes from './twitter-bot.router.js';

export default function appRouter(app) {
  // default route
  app.get('/', (req, res) => {
    res.send('Welcome to Mantium Bot!');
  });
  // import other routes
  twitterBotRoutes(app);
}
