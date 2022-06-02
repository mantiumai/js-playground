import { ShopifyWebhook } from './../controller/shopify.js';
let shopify = new ShopifyWebhook();

export default function shopifyRoutes(app) {
  app.post('/shopify', (req, res) => shopify.getMessage(req, res));
  app.get('/shopify', (req, res) => shopify.getMessage(req, res));
}
