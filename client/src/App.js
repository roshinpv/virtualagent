
import React, { useMemo, useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import FaceAuth from './FaceAuth';
import SafeDepositProcessFlow from './module/SafeDepositProcessFow';
import AddressForm from './module/AddressForm';
import SafeDepositTypes from './module/SafeDepositTypes';
import nextData from './data.json'
import ProductConfirmation from './module/ProductConfirmation';
import ApplicationForm from './module/ApplicationSubmission';
import FinalApplication from './module/FinalApplication';
import AccountSummary from './module/AccountSummary';


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
  const [session, setSession] = useState(false)

  const [online, setOnlinne] = useState(true)



  const audioRef = useRef();
  const srcRef = useRef();


  function sessionStart() {
    setSession(true)
    utter("Please face the camera for the authentication")
  }



  const baseURL = "http://localhost:3000";
  const {
    transcript,
    listening,
    resetTranscript,
    interimTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()


  function load(message) {
    document.getElementById("aSource").src = "http://localhost:3000/speak?message=" + message
    document.getElementById("audio").load();

  }

  function play() {
    document.getElementById("audio").play();
  }
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
    loadData(person.label);
    setName(person.label)
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

    if (online) {
      load(message)
      play()
    }

    else {

      var synth = window.speechSynthesis;
      var voices = synth.getVoices();
      var t = message;
      var u = new SpeechSynthesisUtterance(t);

      voices.forEach((e) => {
        //alert(e.name)
      })
      u.voice = synth.getVoices[0]
      u.onend = function () { console.log("on end!"); }
      u.onerror = function (error) { console.log(error.name); }
      u.onpause = function () { console.log("on pause"); }
      u.onresume = function () { console.log("on resume"); }
      u.onstart = function () { console.log("on start"); }
      synth.cancel();
      synth.speak(u);
    }



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
      if (data.queryResult.intent.displayName.includes("WELCOME")) {
        setIntent(data.queryResult.intent.displayName)
        setParameter(data.queryResult.parameters)
      }
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



        {name === "" && session &&
          <FaceAuth onAuhSuccess={handleLogin} onPlay={askForAuth} />
        }
        <h2 data-aos="fade-up">Welcome {name}</h2>
        <blockquote data-aos="fade-up" data-aos-delay="100">
          <p>Next Gen Branch Experience</p>
        </blockquote>
        {name !== "" && nextData && session &&
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

        {!session &&
          <button type="button" class="btn btn-warning btn-lg" onClick={sessionStart}>Start New Session...</button>
        }


        <audio id="audio" ref={audioRef} autoplay controls style={{ "display": "none" }}>
          <source id="aSource" ref={srcRef} type="audio/mp3" />
        </audio>

        {(intent === "WELCOME") && session &&
          <SafeDepositProcessFlow />
        }
        {(intent === "WELCOME-ADDRESS") && address && session &&
          <AddressForm address={address} />
        }
        {(intent === "WELCOME-SDB-CONFIGURATION" || intent === "WELCOME-SDP-CONFIGURATION") && session &&
          <SafeDepositTypes />
        }
        {(intent === "WELCOME-SDP-SIZE" || intent === "WELCOME-SDB-SIZE") && paramter && session &&
          <FinalApplication parameter={paramter} address={address} />
        }
        {intent === "ACCOUNT_SUMMARY" && accounts && session &&
          <AccountSummary accounts={accounts} />
        }
        {intent === "WELCOME-SDB-CONFIRMATION" && session &&
          <ApplicationForm />
        }


      </div>
    </div>
  )

}
export default Nextgen;