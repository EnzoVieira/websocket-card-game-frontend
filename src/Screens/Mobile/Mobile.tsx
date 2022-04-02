import React, { useEffect, useState, useCallback } from "react"
import { useLocation } from "react-router-dom"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"
import useSound from "use-sound"

import "./Mobile.css"

import { useSocket } from "../../context/SocketProvider"
import { FloatingButton } from "../../components/FloatingButton/FloatingButton"

import playAudio from "../../samples/sounds/pop-down.mp3"
import playOnAudio from "../../samples/sounds/pop-up-on.mp3"

interface ICard {
  id: string
  card: string
  type: string
}

const Mobile = () => {
  const [play] = useSound(playAudio, { volume: 0.25 })
  const [playOn] = useSound(playOnAudio, { volume: 0.25 })
  const [cards, setCards] = useState<ICard[]>([])
  const location = useLocation()
  const socket = useSocket()

  const tableId = location.pathname.split("/")[2]

  function handleSendEvent(cardId: string) {
    setCards(prev => {
      const newArr = [...prev]

      const remove = newArr.findIndex(card => card.id === cardId)

      newArr.splice(remove, 1)

      return [...newArr]
    })

    socket.emit("card:message", { tableId, cardId })
  }

  function handleBuyCard() {
    playSoundOnCardAdd()
    socket.emit("card:buy-card", tableId)
  }

  function handleTakeCard() {
    socket.emit("card:take-card", tableId)
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return

    const items = Array.from(cards)
    const [reorderedItem] = items.splice(result.source.index, 1)

    items.splice(result.destination?.index, 0, reorderedItem)

    setCards(items)
  }

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

  const receiveNewCard = useCallback(card => {
    setCards(prev => {
      return [...prev, card]
    })
  }, [])

  function playSoundOnCardAdd() {
    play()
    setTimeout(() => {
      playOn()
    }, 100)
  }

  useEffect(() => {
    if (socket == null) return

    socket.emit("card:join-table", tableId)

    socket.on("card:receive-cards", (cards: ICard[]) => {
      setCards(prev => {
        return [...prev, ...cards]
      })
    })

    socket.on("card:take-last-card", (card: ICard) => {
      setCards(prev => {
        return [...prev, card]
      })
    })

    socket.on("card:receive-card", receiveNewCard)
  }, [socket, tableId, receiveNewCard])

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="cards">
          {provided => (
            <div
              className="cards"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((card, index) => {
                return (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {provided => (
                      <div
                        className="card-container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div
                          className="card"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Jogar na mesa ${card.card} de ${card.type}?`
                              )
                            )
                              handleSendEvent(card.id)
                          }}
                        >
                          <div
                            className="card-top"
                            style={{ color: handleColor(card.type) }}
                          >
                            <span>
                              {card.card} {handleSuit(card.type)}
                            </span>
                          </div>

                          <div
                            className="card-suit"
                            style={{ color: handleColor(card.type) }}
                          >
                            {handleSuit(card.type)}
                          </div>

                          <div
                            className="card-bottom"
                            style={{ color: handleColor(card.type) }}
                          >
                            {card.card} {handleSuit(card.type)}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <FloatingButton
        label="Pegar carta"
        position="right"
        onClick={handleTakeCard}
      />
      <FloatingButton label="Comprar" position="left" onClick={handleBuyCard} />
    </div>
  )
}

export { Mobile }
