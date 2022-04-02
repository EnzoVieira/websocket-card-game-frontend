import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"

import { useSocket } from "../../context/SocketProvider"

interface ICard {
  id: string
  card: string
  type: string
}

const CoupMobile = () => {
  const [cards, setCards] = useState<ICard[]>([])
  const location = useLocation()
  const socket = useSocket()

  const tableId = location.pathname.split("/")[3]

  return (
    <div>
      <h1>Coup Mobile</h1>
    </div>
  )
}

export { CoupMobile }
