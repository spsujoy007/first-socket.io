import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
const socket = io.connect("http://localhost:3001")

function App() {

  const [getMsg, setGetMsg] = useState()
  const [reciveMsg, setReciveMsg] = useState("")
  const [room, setRoom] = useState('');

  
  const handleJoinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room)
    }
  }

  const handleSendMessage = (event) => {
    const form = event.target
    event.preventDefault()
      socket.emit("send_message", {message: getMsg, room})
      form.reset()
  }
  
  useEffect(() => {
      socket.on("recive_message", (data) => {
        setReciveMsg(data.message)
      })
  }, [])


  useEffect(() => {
    fetch('/')
  }, [])

  return (
    <div className="App">
      
      <div>
        <input onChange={(e) => setRoom(e.target.value)} type="text" placeholder="type room id" />
        <button onClick={handleJoinRoom} className="">Join room</button>
      </div>

      <form onSubmit={handleSendMessage} style={{marginTop: "20px"}}>
        <input onChange={(e) => setGetMsg(e.target.value)} type="text" placeholder="type your message" />
        <button type='submit' className="">Send</button>
      </form>

      <div>
        <h1>Message: <span>{reciveMsg}</span></h1>
      </div>

    </div>
  );
}

export default App;
