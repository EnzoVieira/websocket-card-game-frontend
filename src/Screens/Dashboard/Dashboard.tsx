import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import "./Dashboard.css"

import { Canvas } from "../../components/QRCodeCavas"

import { useSocket } from "../../context/SocketProvider"

const Dashboard = () => {
  const [players, setPlayers] = useState<string[]>([])
  const [roomId, setRoomId] = useState("")

  const socket = useSocket()

  useEffect(() => {
    setRoomId(uuidv4())
  }, [])

  useEffect(() => {
    if (socket == null) return

    socket.emit("card:join-table", roomId)

    socket.on("card:join-player", (id: string) => {
      setPlayers(prev => {
        return [...prev, id]
      })
    })
  }, [socket, roomId])

  return (
    <div>
      <Canvas roomId={roomId} />

      <div>
        Todos os jogadores devem escanear o QR Code para participar do jogo{" "}
        {roomId}
      </div>

      <div className="buttons">
        <Link className="start-button" to={`/table/${roomId}`}>
          Jogar cartas
        </Link>

        <Link className="start-button" to={`/coup/table/${roomId}`}>
          Jogar Golpinho
        </Link>
      </div>

      <ul>
        {players.map(name => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export { Dashboard }
