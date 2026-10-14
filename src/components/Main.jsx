import { useState } from "react"
import Board from "./Board"
import Keyboard from "./Keyboard"
import guessList from "../assets/answers.txt?raw"
import validWordList from "../assets/valid-words.txt?raw"

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
  const [gameMessage, setGameMessage] = useState("")

  const targetWord = getRandomGuess()
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

  function createSeededRandom(seed) {
  return function() {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
  }

  function getRandomGuess() {
    //pull answers from answers.txt
    const lines = guessList.split(/\r?\n/)
    
    //generate random number based on current date
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDay()
    const random = createSeededRandom(dateSeed)

    //clamp value between length of answers.txt
    const min = 0
    const max = lines.length
    const randomId = Math.floor(random() * (max - min +1)) + min;
    const word = lines[randomId]

    return(word.toUpperCase())
  }

  function isGuessValid() {
    const guess = currentGuess.toLowerCase()
    if (validWordList.includes(guess)) {
      return true
    } else {
      return false      
    }    
  }

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
      })
      setGameMessage("win")
    } else {
      let letterCounts = [...targetLetters]

      //loop to check for corrects and absents
      currentGuessLetters.forEach((letter, index) => {
         if (letter === targetLetters[index]) {
          letterCounts[index] = ""
          currentGuessLetters[index] = ""
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
        if (letterCounts.includes(letter) === false) {
          newGuesses[currentRow][index].letter = letter
          newGuesses[currentRow][index].state = newGuesses[currentRow][index].state === 'unused' ? 'absent' : newGuesses[currentRow][index].state
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = newKeyStates[letter] === 'unused' ? 'absent' : newKeyStates[letter]
            return newKeyStates
          })
        } else if (letterCounts.includes(letter) === true) {
          let spliceTarget = letterCounts.indexOf(letter)
          letterCounts[spliceTarget] = ""
          setKeyStates(previousStates => {
            const newKeyStates = {...previousStates}
            newKeyStates[letter] = newKeyStates[letter] !== 'correct' ? 'present' : newKeyStates[letter]
            return newKeyStates
          })
          newGuesses[currentRow][index].letter = letter
          newGuesses[currentRow][index].state = newGuesses[currentRow][index].state !== 'correct' ? 'present' : newGuesses[currentRow][index].state
        } 
      })
    }   
  }

  function handleKeyboardInput(key) {
    if (key === "DEL") {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (key === "ENTER") {
      if (currentGuess.length !== targetWord.length) {
        setGameMessage("incomplete")
      } else if (!isGuessValid()) {
        setGameMessage("invalid")
      } else {
        setGameMessage("")
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
      ///todo: else func to print invalid word  
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
        gameMessage={gameMessage}
      />
      <Keyboard 
        onKeyPress={handleKeyboardInput} 
        rows={letters} 
        keyStates={keyStates}
        gameMessage={gameMessage}
      />
    </main>
  )
}