import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
const socket = io.connect("http://localhost:3001")

function App() {

  const [getMsg, setGetMsg] = useState()
  const [reciveMsg, setReciveMsg] = useState("")

  const handleSendMessage = (event) => {
    socket.emit("send_message", {message: getMsg})
  }

  useEffect(() => {
      socket.on("recive_message", (data) => {
        // alert(data.message)
        setReciveMsg(data.message)
      })
  }, [])

  return (
    <div className="App">
      <h1>{reciveMsg}</h1>
      <input onChange={(e) => setGetMsg(e.target.value)} type="text" placeholder="type your message" />
      <button onClick={handleSendMessage} className="">Send</button>
    </div>
  );
}

export default App;
