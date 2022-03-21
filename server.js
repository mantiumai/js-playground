import {} from 'dotenv/config';

import appRouter from './routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'cron';
import express from 'express';
import request from 'request';

const app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Cache-Control,Pragma, Origin, Authorization, Content-Type, X-Requested-With,X-XSRF-TOKEN, query,x-access-token'
  );
  next();
});

appRouter(app);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('listening server http://localhost:%s', server.address().port);
});

/*
 * CronJob for Twitter
 */

const CronJob = cron.CronJob;

const tweet = async () => {
  try {
    await request(process.env.TWITTER_URL_RELOAD);
  } catch (e) {
    console.log(e);
  }
};

/*
 * CronJob("* * * * * *")
 * CronJob(seconds, minits, hours, day, month, year)
 *
 * for every monring 5 AM then setting would be like
 * CronJob("0 5 * * *")
 *
 * for every minute then setting would be like
 * CronJob("* * * * *")
 */

const job = new CronJob('0 5 * * *', () => {
  tweet();
});

// this will start the cron job
job.start();
