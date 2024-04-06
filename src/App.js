import {useState} from 'react'
import './App.scss'
import ConfettiExplosion from 'react-confetti-explosion';

let initialCards = [
  {id: 0, flipped: false, guessed: false, content: 'grape', src: '/fruits/grape.png'},
  {id: 1, flipped: false, guessed: false, content: 'pear', src: '/fruits/pear.png'},
  {id: 2, flipped: false, guessed: false, content: 'pineapple', src: '/fruits/pineapple.png'},
  {id: 3, flipped: false, guessed: false, content: 'grape', src: '/fruits/grape.png'},
  {id: 4, flipped: false, guessed: false, content: 'cherry', src: '/fruits/cherry.png'},
  {id: 5, flipped: false, guessed: false, content: 'cherry', src: '/fruits/cherry.png'},
  {id: 6, flipped: false, guessed: false, content: 'strawberry', src: '/fruits/strawberry.png'},
  {id: 7, flipped: false, guessed: false, content: 'pear', src: '/fruits/pear.png'},
  {id: 8, flipped: false, guessed: false, content: 'pineapple', src: '/fruits/pineapple.png'},
  {id: 9, flipped: false, guessed: false, content: 'strawberry', src: '/fruits/strawberry.png'},
  {id: 10, flipped: false, guessed: false, content: 'apple', src: '/fruits/apple.png'},
  {id: 11, flipped: false, guessed: false, content: 'apple', src: '/fruits/apple.png'},
]
  
  let shuffleArray = function(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  let arr = shuffleArray(initialCards)

export default function Game(){
  const [cards, setCards] = useState(arr)
  const [isGameStarted, setIsGameStarted] = useState(true)
  if (isGameStarted){
    setCards(cards.map(card => {
      card.flipped = true
      return card
    }))
    setTimeout(() => {
      setCards(cards.map(card => {
        card.flipped = false
        return card
      }))
    }, 700)
    setIsGameStarted(false)
  }
  
  function handleRestart(){
    setCards(shuffleArray(initialCards.map(card => {
      card.guessed = false
      card.flipped = false
      return card
    })))
  }

  return (
    <main>
      {cards.filter(card => card.guessed).length == cards.length && <ConfettiExplosion/>}
      <h1 id="title">Memory Game</h1>
      <Board cards={cards} setCards={setCards}/>
      <button id="restart-btn" className={cards.filter(card => card.guessed).length == cards.length ? 'blinking' : null} onClick={handleRestart}>New Game</button>
      <p className='message' hidden={!(cards.filter(card => card.guessed).length == cards.length)}>You won!</p> 
    </main>
  )
}

function Board({cards, setCards}){
  function handleClick(id){
    if (cards.filter(card => card.flipped && !card.guessed).length == 2) return
    setCards(cards.map(card => {
      if (card.id == id){
        card.flipped = true
      }
      return card
    }))
    
    let flippedCards = cards.filter(card => card.flipped && !card.guessed)
    if (flippedCards.length > 2) return

    if (flippedCards.length == 2){
      if (flippedCards[0].content == flippedCards[1].content){
        setCards(cards.map(card => {
          if (card.id == flippedCards[0].id || card.id == flippedCards[1].id){
            card.guessed = true
            return card
          } else {
            return card
          }
        }))
      } else {
        setTimeout(() => {
          setCards(cards.map(card => {
            if(!card.guessed){
              card.flipped = false
            } 
            return card
          }))
        }, 700)
      }
      }
  }

  return <div className='grid'>
  {cards.map(card => {
    return <div onClick={() => {handleClick(card.id)}} key={card.id} className={card.flipped ? 'card flipped' : 'card'}>
      <div className='card__front'></div>
      <div className='card__back'>
      <img className='fruit' src={card.src} />
      </div>
    </div>
  })}
</div>
}