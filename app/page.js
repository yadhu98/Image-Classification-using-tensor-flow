'use client'
import ml5 from 'ml5'
import React, { useEffect, useRef,useState } from 'react'
import './globals.css'

function Home() {

  const videoRef = useRef(null)
  const modalUrl = `https://teachablemachine.withgoogle.com/models/G4BxvFi78/model.json`
  const constraints = {
    audio: false,
    video: true,
  };
  const [gesture,setGesture] = useState("")

  const [modal,setModal] = useState(null)
  const startVideo = async () => {
    let mediaDevice = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = mediaDevice
    videoRef.current.play();
}

  const loadAIModal = async() => {
    if(typeof ml5 !== undefined){
      const loadedModal = await ml5.imageClassifier(modalUrl,() =>{
      startVideo()
    } )
    setModal(loadedModal)
  }
  } 

  const classifyGestures = async () => {
    if(modal && videoRef.current){
      const prediction = await modal.classify(videoRef.current)
      if(prediction){
        console.log("preditciom",prediction)
        const maxValue = prediction.reduce((max, obj) => {
          return obj.confidence > max ? obj.label : max;
        }, -Infinity);

        console.log("MaximumValue",maxValue)
        setGesture(maxValue)
      }
    }
  }

  useEffect(()=>{
    loadAIModal()
  },[])


  useEffect(()=>{
    const interval = setInterval(classifyGestures,1000) 
    console.log("Int",interval)
    return()=>{
      clearInterval(interval)
    }
  },[modal])

  console.log("modal",modal)

  return (
      <div className='bg-neutral-100 h-dvh w-dvw flex flex-col justify-center items-center'>
      <h1 className='font-poppins text-zinc-950'>ROCK PAPER SCISSOR-AI </h1>
      <h2 className='text-black'>You are holding : {gesture}</h2>
      <video
      ref={videoRef}
        id="videoframe"
        height ='500'
        width='500'
        className='bg-black'
      />
      </div>
  )
}

export default Home