require("dotenv").config();
const functions = require("firebase-functions");
const cors = require("cors")({ origin: "*" });

const { Client, Webhook, resources } = require("coinbase-commerce-node");
const coinbaseSecret = process.env.COINBASE_API_KEY;
Client.init(coinbaseSecret);

const { Charge } = resources;

exports.createCharge = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // const { amount, currency } = req.body;

    // TODO: get real product data from database

    const chargeData = {
      name: "Bale",
      description: "Bale Exchange",
      local_price: {
        amount: 200.99,
        currency: "USD",
      },
      pricing_type: "fixed_price",
      metadata: {
        user: "mars65",
      },
    };

    const charge = await Charge.create(chargeData);
    console.log(charge);

    res.send(charge);
  });
});

exports.webhookHandler = functions.https.onRequest(async (req, res) => {
  const rawBody = req.rawBody;
  const signature = req.headers["x-cc-webhook-signature"];
  const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;

  try {
    const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);

    if (event.type === "charge:pending") {
      // TODO
      // user paid, but transaction not confirm on blockchain yet
    }

    try {
      if (event.type === "charge:confirmed") {
        let amount = event.data.pricing.local.amount;
        let currency = event.data.pricing.local.currency;
        let user_id = event.data.metadata.user_id;

        console.log(amount, currency, user_id);
      }

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
    if (event.type === "charge:failed") {
      // TODO
      // charge failed or expired
    }

    res.send(`success ${event.id}`);
  } catch (error) {
    functions.logger.error(error);
    res.status(400).send("failure!");
  }
});
