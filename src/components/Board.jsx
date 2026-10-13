export default function Board({ guesses, currentGuess, currentRow, keyStates, gameMessage }) {
  return (
    <div className="board">
      {gameMessage && (
        <div key={gameMessage}
          className={`gameMessage ${gameMessage}`}>
          {gameMessage === "win" && "Correct! You won!"}
          {gameMessage === "invalid" && "Not in word list"}
          {gameMessage === "incomplete" && "Not enough letters"}
          {gameMessage === "lost" && "Better luck next time!"}
        </div>
      )}
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
                data-state={guesses[rowIndex][tileIndex].state}
              >
                {guesses[rowIndex][tileIndex].letter}
              </div>
              )
            }
          })}     
        </div>
      ))}
    </div>
  )
}