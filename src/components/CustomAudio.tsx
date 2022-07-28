import React, { useEffect, useRef } from 'react';
import useAudio from '../hooks/useAudio';

import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa"

const CustomAudio = () => {
  const {play, audio, toggle} = useAudio("https://storage.cloud.google.com/34th-autumn-concert/Tchaikovsky%20Romeo%20and%20Juliet(overture-fantasia).mp3");

  const progressRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const mouseDownedRef = useRef(false);
  const mouseMovedRef = useRef(false);

  const mouseMoveHandler = (e: MouseEvent) => {
    if (mouseDownedRef.current && mouseMovedRef.current) {
      timeHandler(e);
    }
  };

  const mouseDownHandler = (e: MouseEvent) => {
    mouseDownedRef.current = true;
    mouseMovedRef.current = true;
  };

  const mouseLeaveHandler = () => {
    if (mouseDownedRef.current) {
      mouseDownedRef.current = false;
    }
    mouseMovedRef.current = false;
  };

  const mouseUpHandler = (e: MouseEvent) => {
    mouseDownedRef.current = false;
    mouseMovedRef.current = false;
    timeHandler(e);
  };

  const timeHandler = ({offsetX}: MouseEvent) => {
    if (progressRef.current && audio.duration) {
      const fullWidth = progressRef.current.clientWidth;
      const ratio = offsetX / fullWidth;
      audio.currentTime = ratio * audio.duration;
    }
  }

  useEffect(() => {
    if(progressRef.current) {
      progressRef.current.addEventListener('mousedown', mouseDownHandler);
      progressRef.current.addEventListener('mouseleave', mouseLeaveHandler);
      progressRef.current.addEventListener('mouseup', mouseUpHandler);
      progressRef.current.addEventListener('mousemove', mouseMoveHandler);
    }
  })

  useEffect(() => {
    audio.addEventListener('timeupdate',() => {
      const { currentTime, duration } = audio;
      
      if (targetRef.current) {
        targetRef.current.style.width = `${(currentTime / duration) * 100}%`;
      }
    });
  },[audio])

  const handleClick = () => {
    toggle();
  }

  return (
    <div>
      <div style = {{display: "flex", alignItems: "center", margin: "10px"}}>
        <span style={{marginRight: "20px"}}>Tchaikovsky - Romeo and Juliet</span>
        <div onClick={handleClick} style = {{display: "flex", alignItems: "center"}}>{play ? <FaRegPauseCircle size="24" color='#EC6F35'/> : <FaRegPlayCircle size="24" color='#EC6F35'/>}</div>
      </div>
      <div className="progress-container" ref={progressRef} style={{width: "500px", height: "10px", backgroundColor: "#F8F8F8", margin: "10px"}}>
        <div id="progress" ref={targetRef} style={{width: "0px", height: "10px", backgroundColor: "#EC6F35"}}/>
      </div>
      <div className="description" style={{display: "flex", justifyContent: "space-between", width: "500px", color: "#ABABAB", margin: "10px"}}>
        <span>00:00</span>
        <span>19:41</span>
      </div>
   </div>
  )
}

export default CustomAudio;