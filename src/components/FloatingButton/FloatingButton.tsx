import React from "react"
import "./styles.css"

interface IProps {
  label: string
  position: "left" | "right"
  onClick?(): void
}

interface IStyles {
  right: React.CSSProperties
  left: React.CSSProperties
}

const FloatingButton = ({ label, position, onClick = () => {} }: IProps) => {
  const styles: IStyles = {
    right: {
      bottom: 10,
      right: 10,
      borderRadius: "50%",
      backgroundColor: "#51BBFE",
      color: "white",
      fontSize: 14,
      borderWidth: 0,
    },
    left: {
      top: 10,
      right: 10,
      borderRadius: "50%",
      backgroundColor: "#44c767",
      color: "white",
      fontSize: 14,
      borderWidth: 0,
    },
  }

  return (
    <button
      style={position === "right" ? styles.right : styles.left}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export { FloatingButton }
