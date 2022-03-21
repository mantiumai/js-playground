import { Bot } from './../controller/bot.js';
let bot = new Bot();

export default function botRoutes(app) {
  // send message
  app.post('/bot', (req, res) => {
    bot.postMessage(req, res);
  });

  // set default get to show warning message
  app.get('/bot', (req, res) => bot.getMessage(req, res));
}
