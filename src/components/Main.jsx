import { useState } from "react"
import Board from "./Board"
import Keyboard from "./Keyboard"

const letters = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","DEL"]
];

const letterStates = letters
  .flat()
  .filter((key) => key !== "ENTER" && key !== "DEL")

export default function Main() {
  const [currentGuess, setCurrentGuess] = useState("")
  const [currentRow, setCurrentRow] = useState(0)

  const targetWord = "APPLE"
  const maxGuesses = 5

  const [guesses, setGuesses] = useState(() => {
    return Array(maxGuesses).fill(null).map(() => Array(targetWord.length).fill("")
  )})

  const [keyStates, setKeyStates] = useState(() => {
    const initialStates = {}

    letterStates.forEach(letter => {
      initialStates[letter] = 'unused'
    })
    
    return initialStates
  })

  function evaluateCurrentGuess() {
    const targetLetters = targetWord.split("")
    if (currentGuess === targetWord) {
      console.log(true) //placeholder code for setting winState
    } else {
      currentGuess.split("").map((letter, index) => {
        if (targetLetters.includes(letter) === false) {
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = 'absent'
            return newKeyStates            
          })
        } else if (targetLetters.indexOf(letter) === index) {
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = 'correct'
            console.log(newKeyStates)
            return newKeyStates
          })  
        } else {
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = 'present'
            console.log(newKeyStates)
            return newKeyStates
          })
        }
      })
    }
  }

  function handleKeyboardInput(key) {
    if (key === "DEL") {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (key === "ENTER") {
      if (currentGuess.length === 5) {
        evaluateCurrentGuess()
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
      <Board 
        currentGuess={currentGuess} 
        guesses={guesses} 
        currentRow={currentRow}
        keyStates={keyStates}
      />
      <Keyboard 
        onKeyPress={handleKeyboardInput} 
        rows={letters} 
        keyStates={keyStates}
      />
    </main>
  )
}