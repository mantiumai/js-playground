## Shopify Integration

Update the Shopify product description as per the product title and tags provided

This is a webhook integration app, which listens to the Shopify webhook and observes the product gets created or edited on the online portal of the Shopify store, and if the description part is empty it creates wonderful text for the product using AI by taking product title and tags as an input to the prompt.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Installation

- `git clone git@github.com:mantiumai/js-playground.git` this repository
- `cd js-playground`
- `git fetch origin Shopify-Integration && git checkout Shopify-Integration`
- `npm install`

## Running / Development

### Run the server

- `npm start` or `node server.js`
if you added the **PORT** in the **.env** then please use that port in the following URL

- Visit your app at [http://localhost:8000](http://localhost:8000).

## Further Reading / Useful Links

### Cohere Product Descriptions
https://docs.cohere.ai/playground-overview/

### OpenAI Create Ad using Product Description
https://beta.openai.com/examples/default-ad-product-description

### OpenAI Product name generator
https://beta.openai.com/examples/default-product-name-gen

### Mantium Shared Prompt being used
https://share.mantiumai.com/prompt/cf58421b-95bb-4dae-8383-0db5f795ae90



https://partners.shopify.com/2452331/settings


https://shopify.dev/apps/webhooks


```
X-Shopify-Topic: `orders/create`
X-Shopify-Hmac-Sha256: `XWmrwMey6OsLMeiZKwP4FppHH3cmAiiJJAweH5Jo4bM=`
X-Shopify-Shop-Domain: `{shop}.myshopify.com`
X-Shopify-API-Version: `2022-04`
X-Shopify-Webhook-Id: `b54557e4-bdd9-4b37-8a5f-bf7d70bcd043`
```


configure webhook
https://shopify.dev/apps/webhooks/configuration/https


how to use hmac in node
https://stackoverflow.com/questions/7480158/how-do-i-use-node-js-crypto-to-create-a-hmac-sha1-hash


node lib
https://www.npmjs.com/package/@shopify/shopify-api



http://localhost:3000/shopify


### post to the shopify
https://shopify.dev/api/admin-rest#endpoints

https://{store_name}.myshopify.com/admin/api/2022-04/{resource}.json

POST /admin/api/2022-04/products.json

```
const body = {
  product: {
    title: "Hiking backpack"
  }
};
// `session` is built as part of the OAuth process
const client = new Shopify.Clients.Rest(
  session.shop,
  session.accessToken
);
await client.post({
  path: 'products',
  data: body,
  type: DataType.JSON,
});
```

## Some example taken as referance
- https://codesandbox.io/s/9p0xp?file=/src/index.js:268-296
- https://github.com/Shopify/shopify-node-api
- https://medium.com/@damianpieszczynski/validating-shopify-webhooks-with-aws-lambda-and-node-58a8da003ca4
- https://shopify.dev/apps/getting-started#how-apps-fit-into-shopify


## Changes required if change in app/url need to update at

(Shopify partner account)[https://partners.shopify.com/2452331/apps/6838541/edit]

You have to do as follow

open apps >> yourapp >> app setup >> Insert In URLs(Whitelisted redirection URL(s))

Once you whitelist your URL there then the issue is solve

### change ngrok urls here

https://partners.shopify.com/2452331/apps/6838541/edit
https://kedarkulkarni.myshopify.com/admin/settings/notifications

