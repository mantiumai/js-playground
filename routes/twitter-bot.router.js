import { Twitter } from './../controller/twitter.js';
let twitter = new Twitter();

export default function twitterBotRoutes(app) {
  app.get('/twitter', (req, res) => twitter.getMessage(req, res));
}
