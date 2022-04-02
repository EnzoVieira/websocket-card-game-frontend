import React, { useEffect, useState } from "react"

import QRCode from "qrcode"

interface IProps {
  roomId: string
}

const Canvas = ({ roomId }: IProps) => {
  const [src, setSrc] = useState("")

  useEffect(() => {
    QRCode.toDataURL(`http://192.168.15.60:3000/mobile/${roomId}`).then(setSrc)
  })

  return <img src={src}></img>
}

export { Canvas }
