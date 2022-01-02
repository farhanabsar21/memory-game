import { useEffect, useState } from 'react'
import SingleCard from './Components/SingleCard'
import './styles/App.scss'

const cardCollection = [
  {"src": "/assets/img1.png", matched: false},
  {"src": "/assets/img2.png", matched: false},
  {"src": "/assets/img3.png", matched: false},
  {"src": "/assets/img4.png", matched: false},
  {"src": "/assets/img5.png", matched: false},
  {"src": "/assets/img6.png", matched: false}
]

function App() {

  // states
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)

  const [disabled, setDisabled] = useState(false)

  // card shuffle
  const shuffleCards = () => {
    const shuffleSort = [...cardCollection, ...cardCollection]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}))
    
    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffleSort)
    setTurns(0)
  }

  // handle choice 
  const handleCardChoice = card => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  // check if the two card are same or not 
  useEffect(()=>{
    if(firstChoice && secondChoice) {
      setDisabled(true)
      if(firstChoice.src === secondChoice.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === firstChoice.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurns()
      }else{
        setTimeout(() => {
          resetTurns()
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice])

  // reset turns
  const resetTurns = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(()=> {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <div className="game-header">
        <h1>let's start the game</h1>
        <button onClick={shuffleCards}>new game</button>
      </div>
      <div className="game-body">
        {cards.map(card => 
          <SingleCard 
            card={card} 
            key={card.id} 
            handleCardChoice={handleCardChoice} 
            flipped={card === firstChoice || card === secondChoice || card.matched }
            disabled={disabled} />)}
      </div>
      <div className='game-footer'>
        <p>Turns you have used: {turns}</p>
      </div>
    </div>
  );
}

export default App;
