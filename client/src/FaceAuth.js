import { useRef, useEffect, useState } from 'react';
import * as faceapi from "face-api.js";



const FaceAuth  = (props) => {

    const videoRef = useRef()

    const [localStream, setLocalStream] = useState()
    const [loading , setLoading] = useState(true)
    
 
    
  useEffect(() => {
    loadModels();
   
    }  , []);
    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            
        ]).then(() => {
            startVideo()
            
            
        })   
    };
    const startVideo = async () => {
 
 
     navigator.mediaDevices.getUserMedia({ audio:false, video: true })
     .then((currentStream) => {   


      setLocalStream( currentStream )
      videoRef.current.srcObject = currentStream;
      
           
      }).catch((err) => {
         console.error(err)
         });
    }

async function faceDetection() {

    await props.onPlay()
    const labeledFaceDescriptors = await loadLabeledImages() 
    const video = document.getElementById("myVideo")
      
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)
    setInterval(async () => {
        
      
        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
        
        detections.forEach((detection) =>{
           const person = faceMatcher.findBestMatch(detection.descriptor);
           if (!person.toString().includes("unknown")) {
            localStream.getTracks().forEach(   track => {
                if(track.readyState === "live" ){
                     track.stop()
                }
            })
            
            
            props.onAuhSuccess(person);
            video.stop()

            


            return ;
            
           }
        })
        
    }, 500)
}

  function loadLabeledImages() {
     
    const labels = ['John'  , "Advika", "Saul"]
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          //const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
          //alert(`http://localhost:3001/assets/img/model/${label}/${i}.jpeg`)
          const img = await faceapi.fetchImage(`http://localhost:3001/assets/img/model/${label}/${i}.jpeg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
          
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }

  

return (
    <>
  <div  className="app">
    
     <div className='app__video'>
        <video crossOrigin='anonymous' onPlay={faceDetection} width="400" height="300" id="myVideo" ref={videoRef} autoPlay />
     </div>
     
    
     
 </div>
 </>
);
}
export default FaceAuth;


