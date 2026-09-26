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

  const targetWord = "HAPPY"
  const maxGuesses = 5

  const [guesses, setGuesses] = useState(() => {
    return Array(maxGuesses).fill(null).map(() => 
      Array(targetWord.length).fill(null).map(() => ({
        letter:'',
        state: 'unused'
      }))
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
    const currentGuessLetters = currentGuess.split("")
    const newGuesses = [...guesses]
    
    if (currentGuess === targetWord) {
      currentGuessLetters.forEach((letter, index) => {
        newGuesses[currentRow][index].letter = letter
        newGuesses[currentRow][index].state = 'correct'
        setKeyStates(previousStates => {
          const newKeyStates = {...previousStates}
          newKeyStates[letter] = 'correct'
          return newKeyStates
        })
      //TODO set winstate, disable keyboard
      })      
    } else {
      let letterCounts = [...targetLetters]

      //loop to check for corrects and absents
      currentGuessLetters.forEach((letter, index) => {
        if (targetLetters.includes(letter) === false) {
          newGuesses[currentRow][index].letter = letter
          newGuesses[currentRow][index].state = 'absent'
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = 'absent'
            return newKeyStates
          })
        } else if (letter === targetLetters[index]) {
          letterCounts[index] = ""
          newGuesses[currentRow][index].letter = letter
          newGuesses[currentRow][index].state = 'correct'
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = 'correct'
            return newKeyStates
          })
        }
      })

      //loop to check for presents
      currentGuessLetters.forEach((letter, index) => {
        if (letterCounts.includes(letter) === true) {
          let spliceTarget = letterCounts.indexOf(letter)
          letterCounts[spliceTarget] = ""
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = newKeyStates[letter] !== 'correct' ? 'present' : newKeyStates[letter]
            return newKeyStates
          })
          newGuesses[currentRow][index].letter = letter
          newGuesses[currentRow][index].state = 'present'
        } 
      })
    }   
  }

  function handleKeyboardInput(key) {
    if (key === "DEL") {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (key === "ENTER") {
      if (currentGuess.length === targetWord.length) {
        evaluateCurrentGuess()     
        setGuesses(previousGuesses => {          
          const newGuesses = [...previousGuesses]
          currentGuess.split("").forEach((letter, index) => {
            newGuesses[currentRow][index].letter = letter
          })
          return newGuesses
        })
        setCurrentGuess("")
        setCurrentRow(currentRow + 1)
      }  
    } else if (currentGuess.length < targetWord.length) {
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