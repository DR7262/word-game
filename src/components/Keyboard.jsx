import { useEffect } from "react"

export default function Keyboard({ onKeyPress, rows, keyStates }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Backspace" || event.key === "Delete") {
        onKeyPress("DEL");
      } else if (event.key === "Enter") {
        onKeyPress("ENTER");
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        onKeyPress(event.key.toUpperCase());
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })
  
  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key ={rowIndex} className="keyboardRow">
          {rowIndex === 1 && (
            <div className="spacer"></div>
          )}          
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${key === "ENTER" || key === "DEL" ? "key large" : "key"}`}
              data-state={keyStates[key]}
              data-key={key}
            > 
              {key === "DEL" ? "⌫" : key}
            </button>
          ))}
          {rowIndex === 1 && (
            <div className="spacer"></div>
          )} 
        </div>
      ))}
    </div>
  )
}