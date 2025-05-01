// import socket from '../../sockets.js';
import {io} from 'socket.io-client'
import { useEffect, useState } from 'react';

const SocketConnection = ()=> {
    const socket = io('http://localhost:3000');

    const [joined, setJoined] = useState(false);
    const [RoomNameInput, setRoomNameInput] = useState(true);
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [countUsers, setCountUsers] = useState(0);
    const [chat, setChat] = useState([]);

    useEffect(() => {

        socket.on("message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        socket.on('systemMessage', (msg) => {
          setChat(prev => [...prev, { text: msg, system: true }]);
        });

        socket.on('countUsers', (count) => {
          setCountUsers(count);
        })

        return () => {
            socket.off();
        }
    }, [countUsers])

    const Handler = ()=>{
        if(room !== ''){
            socket.emit('join-room', room);
            setJoined(true);
            setRoomNameInput(false);
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
          {RoomNameInput && (
            <div>
              <h2>Join a Room</h2>
                <input
                  type="text"
                  placeholder="Room ID"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  disabled={joined}
                />
              <button onClick={Handler} disabled={joined}>Join</button>
            </div>
          )}
          
          {joined && (
        
            <div className="flex flex-col h-screen">
              {/* Header */}
              <div className="p-4 shadow bg-black">
                <h3 className="text-lg font-semibold">Room Name is: {room}: 👥 {countUsers} </h3>
              </div>

              {/* Scrollable Chat Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                {chat.map((msg, index) => {
                  if (msg.system) {
                    return (
                      <div key={index} className="text-center text-sm text-gray-500 my-2">
                        {msg.text}
                      </div>
                    );
                  }

                  const isYou = msg.id === socket.id;
                  return (
                    <div
                      key={index}
                      className={`flex ${isYou ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                      key={index}
                      className={`p-2 rounded text-white w-fit max-w-[80%] ${
                        isYou ? 'bg-green-500 self-end' : 'bg-blue-500'
                      }`}
                      >
                      <strong>{msg.id === socket.id ? "You" : msg.id.slice(0, 5)}:</strong> {msg.text}
                      </div>
                    </div>
                  )
                }
                )}
              </div>
              
              {/* Fixed Input at Bottom */}
              <div className="p-4 bg-black shadow">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={msg}
                    className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
    )
}

export default SocketConnection;