import { SessionsClient } from '@google-cloud/dialogflow';
import {TextToSpeechClient} from '@google-cloud/text-to-speech' ;
import pkg from 'body-parser';

import { randomUUID } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import express from 'express'
const app = express()
const port = 3000

import fs from 'fs';
import util from 'util';

app.use(cors())

var jsonParser = pkg.json()
var urlencodedParser = pkg.urlencoded({ extended: false })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Instantiates a session client
const sessionClient = new SessionsClient({
    keyFilename: path.join(__dirname, "./key.json")
  });

// Creates a client
const client = new TextToSpeechClient({
  keyFilename: path.join(__dirname, "./key.json")
});




app.get('/speak', async function  (req, res) {
  
  console.log("Speak -" + req.query.message)

  const speakRequest = {
    input: {text: req.query.message},
    voice: {languageCode: 'en-US', "name": "en-US-Wavenet-E"},
    audioConfig: {audioEncoding: 'MP3'}
  };

  const [response] = await client.synthesizeSpeech(speakRequest)
  const outputFile  = "/Users/roshin/Desktop/" + "random" + ".mp3" 
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFile, response.audioContent, 'binary');
  res.setHeader('content-type', 'audio/mpeg');
  res.send(response.audioContent);


})


app.post('/speak', jsonParser, async function  (req, res) {
  
  const request = {
    input: {text: req.body.message},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', "name": "en-US-Wavenet-D"},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'}

    
    
  };


  const [response] = await client.synthesizeSpeech(request);
  //const writeFile = util.promisify(fs.writeFile);
  //await writeFile(outputFile, response.audioContent, 'binary');
  //console.log(`Audio content written to file: ${outputFile}`);


  const outputFile  = "/Users/roshin/Desktop/" + "random" + ".mp3" 
    
  console.log("here 1");
  /*client.synthesizeSpeech(request).then(e => {
    
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, e.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputFile}`);
    console.log(e)
    res.send(e[0]);
  })*/

  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFile, response.audioContent, 'binary');

  res.send(response.audioContent);

  // Write the binary audio content to a local file
  //const writeFile = util.promisify(fs.writeFile);
  
  
})

app.post('/chat', jsonParser, function (req, res) {
  console.log(req.body.message)  
  const x =  executeQueries("next-358510", randomUUID, req.body.message, "en-US").then (e => {
    res.send(e)
  }).catch (err => {
      res.send();
  })
  
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




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
      //console.log("Sending Query:" + query);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );

      console.log(
        JSON.stringify(intentResponse.queryResult.intent.displayName)
      );
      
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
      return intentResponse
    } catch (error) {
      console.log(error);
    }
  
}