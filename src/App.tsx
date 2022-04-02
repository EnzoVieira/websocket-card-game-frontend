import React from "react"
import "./App.css"
import { Routes } from "./routes"

import { SocketProvider } from "./context/SocketProvider"

function App() {
  return (
    <SocketProvider>
      <div className="container">
        <Routes />
      </div>
    </SocketProvider>
  )
}

export default App
