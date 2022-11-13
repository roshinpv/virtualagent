
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import React, { useState, useEffect } from 'react';
import CardsList from './ProductCards';


const Dictaphone = () => {


  useEffect(() => {

    msg.text = "Welcome I am Fargo How can I help you"
    window.speechSynthesis.speak(msg)
    startListen()
    
  } );


  const [message, setMessage , ourText, setOurText] = useState('')
  const msg = new SpeechSynthesisUtterance()
  

  const speechHandler = (txt) => {
    msg.text = ourText
    msg.text = txt
    window.speechSynthesis.speak(msg)
  }

  const startListen = () => {
    SpeechRecognition.startListening({ continuous: true })
  }

  const commands = [
    {
      command: 'Account Balance Please',
      callback: (account_summary) => { setMessage(`Your Balance is 10000 $`) ; speechHandler("Your Balance is 10000 $") }
    },
    {
      command: 'Account Summary ',
      callback: (account_summary) => setMessage(`Your Balance is 10000 $`)
    },
    {
      command: 'Account Details ',
      callback: (account_summary) => setMessage(`Your Balance is 10000 $`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => { setMessage(`Hi there! You said: "${command}"`) ; speechHandler(`Hi there! You said: "${command}"`)},
      matchInterim: true 
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands })

  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
   <div>
    <CardsList/>
      <p>{message}</p>  
      <p>{transcript}</p>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>

      <div className='App'>
      <input
        type='text'
        value={message}
        placeholder='Enter Text'
        onChange={(e) => setOurText(e.target.value)}
      />
      <button onClick={() => speechHandler()}>SPEAK</button>
    </div>

    </div>
  );
};
export default Dictaphone ;