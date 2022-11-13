import { createRequire } from 'module';
import express from "express";
const app = express();
import cors from "cors";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";

import talkToChatbot from "./agent";
var jsonParser = json();
var urlEncoded = urlencoded({ extended: true });

app.use(cors());
app.use(morgan("dev"));

app.post("/chatbot", jsonParser, urlEncoded, function (req, res, next) {
  const message = req.body.message;
  //console.log("message" + message);

  talkToChatbot(message)
    .then((response) => {
      console.log(response);
      res.send({ message: response.fulfillmentText });
    })
    .catch((error) => {
      //console.log("Something went wrong: " + error);
      res.send({
        error: "Error occured here"
      });
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
