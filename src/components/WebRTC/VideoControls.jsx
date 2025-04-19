import React, { useEffect, useRef, useState } from "react";
import {Mic, MicOff, Phone, PhoneOff, Video, VideoOff} from 'lucide-react'

const STUN_SERVER = 'stun:stun.l.google.com:19302';
const SIGNALING_SERVER_URL = 'wss://socketreatime.onrender.com';

const VideoControls = () => {

  let wsRef = useRef(null);

  let LocalAudio = useRef(null);
  let RemoteAudio = useRef(null);

  let localConnection = useRef(null);
  let peerConnection = useRef(null);

  let [videoEnable, setVideoEnable] = useState(false);
  let [callBtn, setCallBtn] = useState(true);
  let [cameraOff, setCameraOff] = useState(false);
  let [micOff, setMicOff] = useState(false);

  const BtnHandler = async() => {
    wsRef.current  = new WebSocket(SIGNALING_SERVER_URL);
    
    wsRef.current.onopen = () => console.log("Connction success");
    wsRef.current.onerror = (err) => console.log("Error :", err);
    wsRef.current.onmessage = async (event) => {
      try {
        let data = JSON.parse(await parserMsg(event.data));

        if(data.offer) await handleOffer(data.offer);
        if(data.answer) await handleAnswer(data.answer);
        if(data.ice) await handleIceCandidate(data.ice);
        
      } catch (error) {
        console.log(error);
      }
    }

    localConnection.current = await navigator.mediaDevices.getUserMedia({video: true , audio: true});
    LocalAudio.current.srcObject= localConnection.current;

    setVideoEnable(true);
    setCallBtn(false);
    await start()

    let offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    sendInfo({offer});
  }

  const sendInfo = (info) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(info));
    } else {
      console.warn('[WS] Connection is not open.');
    }
  }

  const parserMsg = async (msg) => {
    if(msg instanceof Blob){
      return await msg.text();
    }
    return msg;
  }

  const start = async () => {
    if(peerConnection.current) return;
    peerConnection.current = new RTCPeerConnection({iceServers: [{ urls: STUN_SERVER}]});

    localConnection.current.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, localConnection.current);
    });

    peerConnection.current.ontrack = (event) => {
      if (RemoteAudio.current) {
        RemoteAudio.current.srcObject = event.streams[0];
      }
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendInfo({ ice: event.candidate });
      }
      
    }
  }

  const handleOffer = async (offer) => {
    await start();
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    sendInfo({ answer });
  }

  const handleAnswer = async (answer) => {
    if (!peerConnection.current) return;
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
  }

  const handleIceCandidate = async (candidate) => {
    if (!peerConnection.current) return;

    try {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('❌ Error adding ICE candidate:', error);
    }
  }

  const onCamera = () => {
    setCameraOff(prev => !prev)

    if(localConnection.current){
      let videoTrack = localConnection.current.getVideoTracks()[0]
      videoTrack.enabled = !videoTrack.enabled;
    }

  }

  const onMic = () => {
    setMicOff(prev => !prev)

    if(localConnection.current){
      let audioTrack = localConnection.current.getAudioTracks()[0]
      audioTrack.enabled = !audioTrack.enabled;
    }
  }

  const StopStream = () => {
    if(localConnection.current){
      localConnection.current.getTracks().forEach(track => {
        track.stop();

        setVideoEnable(false);
        setCallBtn(true);
      });
    }
  }
  return (
        <>
          <div className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <video
                  title="Local Video"
                  ref={LocalAudio}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  autoPlay
                  muted
                />
              </div>
    
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <video
                  title="Remote Video"
                  ref={RemoteAudio}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  autoPlay
                />
              </div>
            </div>
          </div>
    
          {videoEnable && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 mt-4">
              <button onClick={onCamera} className="bg-white/20 backdrop-blur border border-white text-white px-4 py-2 rounded hover:bg-white/30 transition">
                {cameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
              <button onClick={onMic} className="bg-white/20 backdrop-blur border border-white text-white px-4 py-2 rounded hover:bg-white/30 transition">
                {micOff ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button onClick={StopStream}>
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          )}
          <br />

          {callBtn && (
            <button onClick={BtnHandler}>
            <Phone className="w-5 h-5 " />
            </button>
          )}
        </>
      );
};

export default VideoControls;
