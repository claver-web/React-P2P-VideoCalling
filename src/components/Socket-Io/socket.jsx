// import socket from '../../sockets.js';
import {io} from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000')

const SocketConnection = ()=> {

    const [joined, setJoined] = useState(false);
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {

        socket.on("message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => {
            socket.off();
        }
    }, [])

    const Handler = ()=>{
        if(room !== ''){
            socket.emit('join-room', room);
            setJoined(true);
        }
    }

    const sendMessage = () => {
        if ((message || "").trim() !== "") {
          socket.emit("message", { room, text: message });
          setMessage(""); // clear the input
        }
      };
      

    const msg = (e) => {
        setMessage(e.target.value);
    }

    return(
        <>
          <h2>Join a Room</h2>
          <input
            type="text"
            placeholder="Room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            disabled={joined}
          />
          <button onClick={Handler} disabled={joined}>Join</button>
          {joined && (
              <div>
                <h3>Chat in Room: {room}</h3>
                <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
                  {chat.map((msg, index) => (
                    <div key={index}>
                      <strong>{msg.id === socket.id ? "You" : msg.id.slice(0, 5)}:</strong> {msg.text}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={msg}
                  // onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
          )}
        </>
    )
}

export default SocketConnection;