export default function Board({ guesses, currentGuess, currentRow }) {
  return (
    <div className="board">
      {guesses.map((row, rowIndex) => (
        <div className="boardRow" key={rowIndex} rowindex={rowIndex}>
          {guesses[rowIndex].map((letter, tileIndex) => {
            if (rowIndex === currentRow) {
              return (<div className="boardRowTile" key={tileIndex} tileindex={tileIndex}>
              {currentGuess[tileIndex]}        
              </div>)
            } else {
              return (<div className="boardRowTile" key={tileIndex} tileindex={tileIndex}>
              {guesses[rowIndex][tileIndex]}
              </div>)
            }
          })}     
        </div>
      ))}
    </div>
  )
}