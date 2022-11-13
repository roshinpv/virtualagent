import { useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";



function FaceAuth() {
  const videoRef = useRef();
  const canvasRef = useRef();
  
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
}, []);
  const loadModels = () => {
     Promise.all([
         faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
         faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
         faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
         faceapi.nets.faceExpressionNet.loadFromUri('/models'),
     ]).then(() => {
        startVideo().then (  () => {
         faceDetection();
        })
    })   
};
  const startVideo = async () => {
     navigator.mediaDevices.getUserMedia({ video: true })
     .then((currentStream) => {
          videoRef.current.srcObject = currentStream;
      }).catch((err) => {
         console.error(err)
         });
}

async function faceDetection() {

    alert(1)

    
    let fullFaceDescriptions = await faceapi.detectAllFaces(videoRef).withFaceLandmarks().withFaceDescriptors()
    
    fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions)
    faceapi.draw.drawDetections(canvasRef, fullFaceDescriptions)
    faceapi.draw.drawFaceLandmarks(canvasRef, fullFaceDescriptions)

    const maxDescriptorDistance = 0.6
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors(), maxDescriptorDistance)
    const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))
    alert("here");
    results.forEach((bestMatch, i) => {
        const box = fullFaceDescriptions[i].detection.box
        const text = bestMatch.toString()
        const drawBox = new faceapi.draw.DrawBox(box, { label: text })
        drawBox.draw(canvasRef)
      })

    
}

function labeledFaceDescriptors() {
    const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
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
        <video crossOrigin='anonymous' id="myVideo" ref={videoRef} autoPlay />
     </div>
     <canvas ref={canvasRef} width="940" height="650"
     className='app__canvas' />
 </div>
 </>
);
}
export default FaceAuth;


