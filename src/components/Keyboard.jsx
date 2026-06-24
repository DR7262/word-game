const rows = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","DEL"]
];

export default function Keyboard({ onKeyPress }) {
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
                        className={`key ${key === "ENTER" || key === "DEL" ? "large" : ""}`}
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