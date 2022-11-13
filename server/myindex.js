import { SessionsClient } from '@google-cloud/dialogflow';
import { randomUUID } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cors from "cors";
import morgan from "morgan";
import pkg from 'body-parser';
const {json, urlencoded} = pkg;



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Instantiates a session client
const sessionClient = new SessionsClient({
    keyFilename: path.join(__dirname, "./key.json")
  });

async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(projectId, sessionId, query, languageCode) {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot
  let context;
  let intentResponse;
  
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );

      return intentResponse.queryResult;
      console.log('Detected intent');
      console.log(
        `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
      );
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
    } catch (error) {
      console.log(error);
    }
  
}




const router = express.Router();

const app = express();
// add router in express app
app.use("/",router);

app.use(urlencoded({ extended: false }));
app.use(json());


router.get("/",(req, res) => {
    res.send("index.html");
});

router.post("/chat",(req, res) => {
    
var message = req.body.message;
res.send("hello")
});

app.listen(3000,() => {
console.log("Started on PORT 3000");
})