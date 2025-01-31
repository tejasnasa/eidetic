"use client";

import { useState, useEffect } from "react";
import TileModal from "@/components/TileModal";

const Tiles = () => {
  const [cards, setCards] = useState<any>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const symbols = ["🌟", "🎈", "🎮", "🎲", "🎯", "🎨", "🎭", "🎪", "💸"];

  const restartGame = () => {
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setShowModal(false);
  };

  const initializeGame = () => {
    const shuffled = [...symbols, ...symbols, ...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol: symbol,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(true);
    setShowModal(false);
  };

  useEffect(() => {
    let timer: any;
    if (gameStarted && matched.length < symbols.length * 4) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, matched.length]);

  useEffect(() => {
    if (matched.length === symbols.length * 4) {
      setTimeout(() => setShowModal(true), 500);
    }
  }, [matched]);

  const handleCardClick = (cardId: number) => {
    if (flipped.length === 2) return;
    if (matched.includes(cardId) || flipped.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((card: any) => card.id === firstId);
      const secondCard = cards.find((card: any) => card.id === secondId);

      if (firstCard.symbol === secondCard.symbol) {
        setMatched((prev) => [...prev, firstId, secondId]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Moves: {moves}</span>
          <span className="font-bold">Time: {timeElapsed}s</span>
          <span className="font-bold">
            Matches: {matched.length / 2}/{symbols.length*2}
          </span>
        </div>

        {!gameStarted && (
          <button
            onClick={initializeGame}
            className="bg-white hover:bg-gray-200 transition text-blue-600 font-extrabold font-mono px-6 py-4 rounded mb-4 text-2xl mt-[600px]"
          >
            Start Game
          </button>
        )}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {cards.map((card: any) => {
          const isFlipped =
            flipped.includes(card.id) || matched.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`card ${isFlipped ? "flipped" : ""}`}
            >
              <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back text-5xl">{card.symbol}</div>
              </div>
            </div>
          );
        })}
      </div>

      <TileModal
        value={timeElapsed}
        isOpen={showModal}
        title="Congratulations!"
        message={`You finished in ${moves} moves and ${timeElapsed} seconds!`}
        onClose={restartGame}
      />
    </section>
  );
};

export default Tiles;
