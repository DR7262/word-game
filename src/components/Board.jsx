export default function Board({ guesses, currentGuess, currentRow, keyStates }) {
  return (
    <div className="board">
      {guesses.map((row, rowIndex) => (
        <div className="boardRow" key={rowIndex} rowindex={rowIndex}>
          {guesses[rowIndex].map((letter, tileIndex) => {
            if (rowIndex === currentRow) {
              return (
              <div className="boardRowTile" 
                key={tileIndex} 
                data-state={keyStates[letter]}
              >
                {currentGuess[tileIndex]}        
              </div>
              )
            } else {
              return (
              <div className="boardRowTile" 
                key={tileIndex} 
                data-state={keyStates[letter]}
              >
                {guesses[rowIndex][tileIndex]}
              </div>
              )
            }
          })}     
        </div>
      ))}
    </div>
  )
}