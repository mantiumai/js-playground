import {} from 'dotenv/config';

import { TwitterApi } from 'twitter-api-v2';
import mantiumAi from '@mantium/mantiumapi';

const prompt_id = process.env.MANTIUM_TWITTER_PROMPT_ID;
const credentials = {
  username: process.env.MANTIUM_USER_NAME,
  password: process.env.MANTIUM_PASSWORD,
};

export class Twitter {
  /****************************************************************************************************
   Constructor
  *******************************************************************************************************/
  constructor() {
    if (this.apiKey === null) {
      this.getToken();
    }
  }

  async getToken() {
    await mantiumAi
      .Auth()
      .accessTokenLogin({ ...credentials })
      .then((response) => {
        // get bearer_id and set as a api_key
        if (response.data?.attributes) {
          mantiumAi.api_key = response.data.attributes.bearer_id;
          this.apiKey = response.data.attributes.bearer_id;
        } else {
          console.log('Login failed!');
        }
      });
  }

  async getAnswer() {
    // const providers = ["openai", "cohere", "mantium", "OpenAI", "Cohere", "Mantium"];
    return await mantiumAi
      .Prompts('Cohere')
      .execute({
        id: prompt_id,
        input: '',
      })
      .then(async (res) => {
        /*
         * from the successful response collect the prompt_execution_id
         * and then pass this to the result method
         */
        if (res?.prompt_execution_id) {
          return await mantiumAi
            .Prompts('Cohere')
            .result(res.prompt_execution_id)
            .then((response) => {
              return response;
            });
        }
      });
  }

  apiKey = null;

  async getMessage(req, res) {
    let response = await this.getAnswer();

    if (response && response.output) {
      const client = new TwitterApi({
        appKey: process.env.TWITTER_APP_KEY,
        appSecret: process.env.TWITTER_APP_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET,
      });

      const rwClient = client.readWrite;

      await rwClient.v1
        .tweet(response.output)
        .then((val) => {
          console.log(val);
          console.log('success');
        })
        .catch((err) => {
          console.log(err);
          console.log(err.data.errors);
        });
    }
    res.status(200).send(response);
  }
}
