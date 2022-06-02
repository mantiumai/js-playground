import path from 'path';
import shopifyRoutes from './shopify.router.js';

export default function appRouter(app) {
  // default route
  app.get('/', (req, res) => {
    let __dirname = path.resolve();
    res.sendFile(__dirname + '/views/index.html');
  });
  // import other routes
  shopifyRoutes(app);
}
