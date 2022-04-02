import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "./CoupTable.css"

import { Canvas } from "../../components/QRCodeCavas"

import { useSocket } from "../../context/SocketProvider"

const CoupTable = () => {
  const [tableId, setTableId] = useState("")
  const socket = useSocket()

  useEffect(() => {
    setTableId(uuidv4())
  }, [])

  useEffect(() => {
    if (socket == null) return

    socket.emit("coup:join", tableId)
  }, [socket, tableId])

  return (
    <div>
      <h1>Golpihno</h1>

      <Canvas roomId={tableId} />

      <div>
        Todos os jogadores devem escanear o QR Code para participar do jogo{" "}
        {tableId}
      </div>

      <div className="button">
        <button className="start-coup">Começar</button>
      </div>
    </div>
  )
}

export { CoupTable }
