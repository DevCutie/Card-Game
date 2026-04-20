import React, { useEffect, useState } from "react";

import { GameHeader } from "./components/GameHeader";
import Card from "./components/Card";
import WinMessage from "./components/WinMessage";
const cardValue = [
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍍",
  "🥭",
  "🍉",
  "🍑",
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍍",
  "🥭",
  "🍉",
  "🍑",
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const shuffled = shuffleArray(cardValue);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, [
    
  ]);

  const handleCardClick = (card) => {
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    )
      return;

    // Flip card
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // If 2 cards flipped
    if (newFlippedCards.length === 2) {
      setIsLocked(true);

      const firstCard = newCards.find(
        (c) => c.id === newFlippedCards[0]
      );
      const secondCard = newCards.find(
        (c) => c.id === newFlippedCards[1]
      );

      if (firstCard.value === secondCard.value) {
        // MATCH
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isMatched: true }
                : c
            )
          );

          setMatchedCards((prev) => [
            ...prev,
            firstCard.id,
            secondCard.id,
          ]);

          setScore((prev) => prev + 1);
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // NOT MATCH
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlippedCards.includes(c.id)
                ? { ...c, isFlipped: false }
                : c
            )
          );

          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };

  const isGameComplete = matchedCards.length === cardValue.length;


  return (
    <div className="app">
      <GameHeader moves={moves} score={score} onReset={initializeGame} />
      {isGameComplete && <WinMessage moves={moves} />}
      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
