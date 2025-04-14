import React, {useEffect, useRef} from "react"
// import { io } from 'socket.io-client';

const STUN_SERVER = 'stun:stun.l.google.com:19302';
const SIGNALING_SERVER_URL = 'ws://socketreatime.onrender.com';

const Room = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const wsRef = useRef(null);

  // Setup media and WebRTC
  useEffect(() => {
    // Initialize WebSocket
    wsRef.current = new WebSocket(SIGNALING_SERVER_URL);

    wsRef.current.onopen = () => console.log('[WS] Connected to signaling server');

    wsRef.current.onerror = (err) => console.error('[WS] Error:', err);

    wsRef.current.onmessage = async (event) => {
      try {
        const data = JSON.parse(await parseMessage(event.data));

        if (data.offer) await handleOffer(data.offer);
        if (data.answer) await handleAnswer(data.answer);
        if (data.ice) await handleIceCandidate(data.ice);
      } catch (error) {
        console.error('❌ Failed to handle signaling message:', error);
      }
    };

    // Get user media
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        await setupPeerConnection();

        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        sendMessage({ offer });
      } catch (error) {
        console.error('❌ Failed to get user media:', error);
      }
    };

    initMedia();

    // Cleanup on unmount
    return () => {
      wsRef.current?.close();
      peerConnectionRef.current?.close();
    };
  }, []);

  const parseMessage = async (data) => {
    if (data instanceof Blob) return await data.text();
    return data;
  };

  const sendMessage = (msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('[WS] Connection is not open.');
    }
  };

  const setupPeerConnection = async () => {
    if (peerConnectionRef.current) return;

    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: STUN_SERVER }],
    });

    localStreamRef.current.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStreamRef.current);
    });

    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({ ice: event.candidate });
      }
    };
  };

  const handleOffer = async (offer) => {
    await setupPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);

    sendMessage({ answer });
  };

  const handleAnswer = async (answer) => {
    if (!peerConnectionRef.current) return;
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleIceCandidate = async (candidate) => {
    if (!peerConnectionRef.current) return;

    try {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('❌ Error adding ICE candidate:', error);
    }
  };

  return(
    <>
     <section className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-white font-bold mb-8 text-center">Featured Videos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video 1 */}
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <video
              title="Video 1"
              className="w-full h-full"
              autoPlay
              playsInline
              muted
              ref = {localVideoRef}
            />
          </div>

          {/* Video 2 */}
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          <video
              title="Video 2"
              className="w-full h-full"
              autoPlay
              playsInline
              muted
              ref = {remoteVideoRef}
            />
          </div>
        </div>
      </div>
    </section>
      
    </>
  )
}

export default Room;