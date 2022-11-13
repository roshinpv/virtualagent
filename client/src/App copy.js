import { render } from '@testing-library/react';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import AccountSummary from './module/AccountSummary';
import ProductList from './module/ProductList';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import FaceAuth from './FaceAuth';
import SafeDepositProcessFlow from './module/SafeDepositProcessFow';
import AddressForm from './module/AddressForm';
import SafeDepositTypes from './module/SafeDepositTypes';
import nextData from './data.json'
import ProductConfirmation from './module/ProductConfirmation';
import ApplicationForm from './module/ApplicationSubmission';

import ReactHowler from 'react-howler'

//import {Howl} from 'howler'

import { v4 as uuidv4 } from 'uuid';
import Play from './module/Play';


const Nextgen = () => {

  const videoSrc = {
    type: "video",
    sources: [
      {
        src: 'assets/nextgen.mp4',
        type: 'video/mp4',
        size: 720,
      }
    ]
  };

  const newSource = useMemo(() => videoSrc, videoSrc);
  const msg = new SpeechSynthesisUtterance()
  const [name, setName] = useState("")
  const [login, setLogin] = useState(false)
  const [message, setMessage] = useState([])
  const [intent, setIntent] = useState()
  const [address, setAddress] = useState()
  const [accounts, setAccounts] = useState([])
  const [appointment, setAppointment] = useState([])
  const [audioSource, setAudioSource] = useState({})
  const [paramter, setParameter] = useState()
  const [audio , setAudio] = useState()
  const [size, setSize] = useState()
  const audioRef = useRef()



  const baseURL = "http://localhost:3000";
  const {
    transcript,
    listening,
    resetTranscript,
    interimTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()


  useEffect(() => {
    
    //setAudio(new Audio())
   

  }, []);


  useEffect(() => {

    /*audio = new Audio (audioSource)
    audio.pause()
    audio.load()
    audio.play()*/

  }, [audioSource]);


  useEffect(() => {
    if (finalTranscript !== '') {
      agent(finalTranscript)
      resetTranscript()
    }
  }, [finalTranscript]);

  async function stopListen() {
    //await SpeechRecognition.stopListening()
  }

  const handleLogin = async (person) => {

    setName(person.label)

    loadData(person.label);

    await agent("hello , this is " + person.label + "  here need to open a safe deposit")
    setLogin(true)
    await startListen();



  }

  const askForAuth = async () => {
    utter("Please face the camera for the authentication")
  }

  const loadData = async (name) => {


    nextData.nextgen.map(data => {

      if (data.name === name) {
        setAddress(data.address)
        setAccounts(data.accounts)
        setAppointment(data.appointment)
      }


    })


  }

  msg.onend = function (event) {
    alert("SpeechSynthesisUtterance.onend");
  };

  msg.onerror = function (event) {

    alert(JSON.stringify(event));
  };

  async function utter(message) {

    var synth = window.speechSynthesis;
    var voices = synth.getVoices();
    var t = message;
    var u = new SpeechSynthesisUtterance(t);
    u.onend = function () { console.log("on end!"); }
    u.onerror = function (error) { console.log(error.name); }
    u.onpause = function () { console.log("on pause"); }
    u.onresume = function () { console.log("on resume"); }
    u.onstart = function () { console.log("on start"); }
    synth.cancel();
    synth.speak(u);



    /*speechSynthesis.getVoices.map(txt => {
      alert(txt.name)
    })*/



    /*alert(message)
    //setAudioSource("http://localhost:3000/speak?message=" + message);
    var source = ["http://localhost:3000/speak?message=" + message ];
    var sound = new ReactHowler({
      src : [source],
      html5 : true  
    })
    
    sound.play()

    alert(message)*/




    /*setAudioSource("http://localhost:3000/speak?message=" + message);
    //alert(message)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }*/

    
    /* const postData = {
       message: message
     };
     
     fetch("http://localhost:3000/speak", {method: "post",
     headers: {
       "Content-Type": "application/json"
     },
     responseType: 'blob',
     body: JSON.stringify(postData)}) // set content header to array buffer
       .then((response) => {*/



    /* alert(URL.createObjectURL(response))
     var audio = new Audio()
     audio.pause();
     audio.src = URL.createObjectURL(response);
     audio.play();*/

    //})


    /*const voice = speaks[40]; //47
    msg.volume = 1; // 0 to 1
    msg.rate = 0.8; // 0.1 to 10
    msg.pitch = 0.5; // 0 to 2
    alert(`Voice: ${voice.name} and Lang: ${voice.lang}`);
    msg.voiceURI = voice.name;
    msg.lang = voice.lang;*/


    /*msg.text = message
    

    //alert(window.speechSynthesis.getVoices().toString())
    //msg.voice = window.speechSynthesis.getVoices[5]
    //window.
    speechSynthesis.speak(msg)
    //startListen();*/

    /*speechSynthesis.resume()
    msg.voiceURI = "ava"
    msg.lang = "en-us"
    msg.rate = 1
    msg.pitch = 1
    msg.text = message
    speechSynthesis.speak(msg)*/
  };

  async function startListen() {
    await SpeechRecognition.startListening({ continuous: true }).then(out => {
      //agent("Hello")
      //utter("Hello " + name  + "Welcome to Wells Fargo. How can I help you ?" ); 
    })
  }

  async function process(command, text) {
    setIntent(command)
    utter(text)
  }

  useEffect(() => {
    //startListen();
  }, [])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  async function agent(message) {
    const postData = {
      message: message
    };
    try {
      const result = await fetch("http://localhost:3000/chat", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData),
      });
      if (!result.ok) {
        const msg1 = `An error has occured: ${result.status} - ${result.statusText}`;

        //throw new Error(msg);
      }
      const data = await result.json();
      utter(data.queryResult.fulfillmentText)
      setIntent(data.queryResult.intent.displayName)
      setParameter(data.queryResult.parameters)
      /*if (data.queryResult.intent.displayName === "WELCOME") {
        if(data.queryResult.parameters.fields.person.structValue){
          setName(data.queryResult.parameters.fields.person.structValue.fields.name.stringValue)
        }
      }*/


      /*const final = {
        status: result.status + "-" + result.statusText,
        headers: {
          "Content-Type": result.headers.get("Content-Type"),
          "Content-Length": result.headers.get("Content-Length"),
        },
        data: data,
      };*/
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }


  /* <div className="col-xl-12" >
        <Plyr source={newSource} />
      </div>
            <img  src="assets/img/avtar.gif"  style={{width : "90%"}}/>
      */
/*

 <audio controls ref={audioRef} autoplay>
        <source id="myAudio" src={audioSource} type="audio/mpeg" />
      </audio>*/

  return (
    <div class="row">


     
      <div className="col-xl-4" style={{ align: "center" }}>



      <Play/>

        {name === "" &&
          <FaceAuth onAuhSuccess={handleLogin} onPlay={askForAuth} />
        }
        <h2 data-aos="fade-up">Welcome {name}</h2>
        <blockquote data-aos="fade-up" data-aos-delay="100">
          <p>Next Gen Branch Experience</p>
        </blockquote>
        {name !== "" && nextData &&
          <>
            <h4 data-aos="fade-up">Purpose - {appointment.purpose}</h4>
            <h4 data-aos="fade-up">Appointment Time - {appointment.time}</h4>
            <h4 data-aos="fade-up">Branch  - {appointment.branch}</h4>

            <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="50" cy="50" r="0" fill="none" stroke="#d69293" stroke-width="7">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s" />
                <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s" />
              </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#be5960" stroke-width="7">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s" />
                <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s" />
              </circle>
            </svg>
          </>
        }
      </div>
      <div className="col-xl-8">

        {finalTranscript}
        {(intent === "WELCOME") &&
          <SafeDepositProcessFlow />
        }
        {(intent === "WELCOME-ADDRESS") && address &&
          <AddressForm address={address} />
        }
        {(intent === "WELCOME-SDB-CONFIGURATION" || intent === "WELCOME-SDP-CONFIGURATION") &&
          <SafeDepositTypes />
        }
        {(intent === "WELCOME-SDP-SIZE" || intent === "WELCOME-SDB-SIZE") && paramter &&
          <ProductConfirmation parameter={paramter} address={address} />
        }
        {intent === "ACCOUNT_SUMMARY" && accounts &&
          <AccountSummary accounts={accounts} />
        }
        {intent === "WELCOME-SDB-CONFIRMATION" &&
          <ApplicationForm />
        }


      </div>
    </div>
  )

}
export default Nextgen;