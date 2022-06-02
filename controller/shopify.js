import {} from 'dotenv/config';

import mantiumAi from '@mantium/mantiumapi';
import request from 'request';

const prompt_id = process.env.MANTIUM_PROMPT_ID;
const credentials = {
  username: process.env.MANTIUM_USER_NAME,
  password: process.env.MANTIUM_PASSWORD,
};

export class ShopifyWebhook {
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

  async getAnswer(prompt_info) {
    return await mantiumAi
      .Prompts('OpenAI')
      .execute({
        id: prompt_id,
        input: prompt_info,
      })
      .then(async (res) => {
        /*
         * from the successful response collect the prompt_execution_id
         * and then pass this to the result method
         */
        if (res?.prompt_execution_id) {
          return await mantiumAi
            .Prompts('OpenAI')
            .result(res.prompt_execution_id)
            .then((response) => {
              return response;
            });
        }
      });
  }

  apiKey = null;


  async getMessage(req, res) {

    console.log('req.body', req.body);

    const { title, body_html, tags, id } = req.body;

    const keywords = tags && tags.length ? tags : 'durable, value to money';

    const prompt_input = `Product: ${title} Keywords:   ${keywords}`;

    const { SHOP, SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

    if(body_html == '') {

      const response = await this.getAnswer(prompt_input);

      const body = {
        "product": {
          "body_html": response?.output || 'N/A'
        }
      }

      const options = {
        url: `https://${SHOP}.myshopify.com/admin/api/2022-04/products/${id}.json`,
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN},
        body: JSON.stringify(body)
      }

      console.log('body ::',body)
      console.log('options ::',options)
      try {
        request.put(options, function(error, response, body){
          console.log(body);
        });
      } catch (err) {
        console.log('err')
      }
    }
    // end response
    res.status(200).send('OK');
  }
}
