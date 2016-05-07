## Relax-js

Relax-js is a Node.js client for interacting with [Relax](https://github.com/zerobotlabs/relax) – a multitenant message broker for Slack.

## Getting Started

If you're just getting started with Relax and don't already have a Relax Go instance up and running, go ahead and get that set up first by following the instructions [here](https://github.com/zerobotlabs/relax) (Don't worry you don't need any prior knowledge of Go). If you use Heroku, there's a "Deploy to Heroku" button to help you get up and running super quickly. 

Once you've done that, take note of the following environment variables configured on your Relax Go instance (you'll need to use the exact same ones for your Node.js app):

- `REDIS_URL`
- `RELAX_BOTS_KEY`
- `RELAX_BOTS_PUBSUB`
- `RELAX_EVENTS_QUEUE`
- `RELAX_MUTEX_KEY`

If you haven't already, go ahead and create a new Node.js app. Next, install the `relax-js` node module either of the following ways:

Install directly with npm:

```
$ npm install relax-js
```
or add to your package.json file and then npm install:

```js
"relax-js": "0.0.1"
```

```
$ npm install
```
