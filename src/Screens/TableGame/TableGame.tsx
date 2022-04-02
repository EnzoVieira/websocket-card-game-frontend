import React, { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./TableGame.css"
import useSound from "use-sound"

// import cardDrop from "../../samples/sounds/pop-down.mp3"
import audio from "../../samples/sounds/pop-down.mp3"
import playOnAudio from "../../samples/sounds/pop-up-on.mp3"
import playOffAudio from "../../samples/sounds/pop-up-off.mp3"
// import audio from "../../samples/wav/AlertsAndNotifications/notification_decorative-02.wav"
// import audio from "../../samples/wav/AlertsAndNotifications/notification_simple-01.wav"
// import audio from "../../samples/wav/AlertsAndNotifications/notification_simple-01.wav"

import { useSocket } from "../../context/SocketProvider"
import { Socket } from "socket.io-client"

interface ICard {
  id: string
  card: string
  type: string
}

const TableGame = () => {
  const location = useLocation()
  const [cards, setCards] = useState<ICard[]>([])
  const socket: Socket = useSocket()
  const [play] = useSound(audio, { volume: 0.25 })
  const [playOn] = useSound(playOnAudio, { volume: 0.25 })
  const [playOff] = useSound(playOffAudio, { volume: 0.25 })

  const tableId = location.pathname.split("/")[2]

  const receiveNewMessage = useCallback(
    card => {
      play()
      setTimeout(() => {
        playOn()
      }, 100)

      setCards(prev => {
        return [...prev, card]
      })
    },
    [play, playOn]
  )

  const receiveNewCard = useCallback(
    card => {
      play()
      setTimeout(() => {
        playOn()
      }, 100)

      setCards(prev => {
        return [...prev, card]
      })
    },
    [play, playOn]
  )

  const removeLastCard = useCallback(() => {
    play()
    setTimeout(() => {
      playOff()
    }, 100)

    setCards(prev => {
      const newArr = [...prev]

      newArr.pop()

      return [...newArr]
    })
  }, [play, playOff])

  function handleSuit(suit: string) {
    if (suit === "Copas") return "♥"
    if (suit === "Ouro") return "♦"
    if (suit === "Paus") return "♣"
    if (suit === "Espada") return "♠"
  }

  function handleColor(suit: string) {
    if (suit === "Copas" || suit === "Ouro") return "red"
    if (suit === "Paus" || suit === "Espada") return "black"
  }

  function handleBuyCard() {
    socket.emit("card:buy-card", tableId)
    playSoundOnCardAdd()
  }

  function playSoundOnCardAdd() {
    play()
    setTimeout(() => {
      playOn()
    }, 100)
  }

  useEffect(() => {
    if (socket == null) return

    socket.on("card:message", receiveNewMessage)

    socket.on("card:receive-card", receiveNewCard)

    socket.on("card:remove-last-card", removeLastCard)
  }, [socket, receiveNewMessage, receiveNewCard, removeLastCard])

  return (
    <div>
      <div>TableGame</div>
      <button
        className="new-card-on-board"
        type="button"
        onClick={handleBuyCard}
        // onClick={playSoundOnCardAdd}
      >
        Jogar nova carta na mesa
      </button>

      {cards.map(card => (
        <div className="table-card">
          <div className="card-top" style={{ color: handleColor(card.type) }}>
            <span>
              {card.card} {handleSuit(card.type)}
            </span>
          </div>

          <div className="card-suit" style={{ color: handleColor(card.type) }}>
            {handleSuit(card.type)}
          </div>

          <div
            className="card-bottom"
            style={{ color: handleColor(card.type) }}
          >
            {card.card} {handleSuit(card.type)}
          </div>
        </div>
      ))}
    </div>
  )
}

export { TableGame }
