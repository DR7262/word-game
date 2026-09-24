import { useState } from "react"
import Board from "./Board"
import Keyboard from "./Keyboard"

export default function Main() {
  const [currentGuess, setCurrentGuess] = useState("")
  const [currentRow, setCurrentRow] = useState(0)

  const targetWord = ["A","P","P","L","E"]
  const maxGuesses = 5

  const [guesses, setGuesses] = useState(() => {
    return Array(maxGuesses).fill(null).map(() => Array(targetWord.length).fill("")
  )}) 

  function handleKeyboardInput(key) {
    if (key === "DEL") {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (key === "ENTER" && currentGuess.length === 5) {
      if (currentGuess === targetWord.join("")) {
        console.log(true)
      } else {
        const newGuesses = [...guesses]
        newGuesses[currentRow] = currentGuess.split("")
        setGuesses(newGuesses)
        setCurrentGuess("")
        setCurrentRow(currentRow + 1)
      }
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key)
    }
    
  }

  return (
    <main>
      <Board currentGuess={currentGuess} guesses={guesses} currentRow={currentRow}/>
      <Keyboard onKeyPress={handleKeyboardInput} />
    </main>
  )
}