import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { gameData } from "../lib/data";
import Modal from "../components/Modal";

const Simon = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState("idle"); // idle, showing-sequence, player-turn, game-over
  const [playerSequence, setPlayerSequence] = useState<any>([]);
  const [hearts, setHearts] = useState(3);
  const [lastErrorIndex, setLastErrorIndex] = useState(null);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const showSequence = useCallback(() => {
    const levelSequence = gameData[currentLevel];

    levelSequence.forEach((blockIndex, sequenceOrder) => {
      setTimeout(() => {
        setActiveBlock(blockIndex);
        setTimeout(() => {
          setActiveBlock(null);
        }, 300);
      }, 500 * (sequenceOrder + 1));
    });

    setTimeout(() => {
      setGameState("player-turn");
      setPlayerSequence([]);
      setLastErrorIndex(null);
    }, 500 * (levelSequence.length + 2));
  }, [currentLevel]);

  const startGame = () => {
    setCurrentLevel(0);
    setHearts(3);
    setGameState("showing-sequence");
    setShowModal(false);
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setHearts(3);
    setGameState("idle");
    setShowModal(false);
  };

  const handleBlockClick = (blockIndex: any) => {
    if (gameState !== "player-turn") return;

    const levelSequence = gameData[currentLevel];
    const newPlayerSequence = [...playerSequence, blockIndex];

    if (blockIndex !== levelSequence[playerSequence.length]) {
      setHearts((prevHearts) => {
        const remainingHearts = prevHearts - 1;
        if (remainingHearts <= 0) {
          setGameState("game-over");
          setShowModal(true);
        }
        return remainingHearts;
      });
      setLastErrorIndex(blockIndex);
      return;
    }

    setLastErrorIndex(null);
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence.length === levelSequence.length) {
      if (currentLevel === gameData.length - 1) {
        setGameState("game-over");
        setShowModal(true);
        return;
      }
      setCurrentLevel((prev) => prev + 1);
      setGameState("showing-sequence");
    }
  };

  useEffect(() => {
    if (gameState === "showing-sequence") {
      setTimeout(showSequence, 500);
    }
  }, [currentLevel, gameState, showSequence]);

  const renderHearts = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <Heart
        key={index}
        className={`w-6 h-6 ${
          index < hearts ? "text-red-500" : "text-gray-300"
        }`}
        fill={index < hearts ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <main className="bg-black text-white h-dvh w-dvw">
      <section className="max-w-2xl mx-auto p-6 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Block Sequence Memory</h2>
          <div className="flex justify-between items-center">
            <span className="mr-4">Level: {currentLevel + 1}</span>
            <div className="flex space-x-1">{renderHearts()}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((blockIndex) => (
            <div
              key={blockIndex}
              onClick={() => handleBlockClick(blockIndex)}
              className={`aspect-square flex items-center justify-center
              ${
                lastErrorIndex === blockIndex
                  ? "bg-red-300"
                  : activeBlock === blockIndex
                  ? "bg-blue-500 text-white scale-95"
                  : "bg-gray-300"
              }
              cursor-pointer
              rounded-lg text-xl font-bold transition-all duration-300 transform`}
            >
              {blockIndex}
            </div>
          ))}
        </div>

        {gameState === "idle" && (
          <button
            onClick={startGame}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Start Game
          </button>
        )}

        {gameState === "showing-sequence" && (
          <p className="text-gray-600 mt-4">Watching the sequence...</p>
        )}

        {gameState === "player-turn" && (
          <p className="text-gray-600 mt-4">Your turn! Repeat the sequence.</p>
        )}

        <Modal
          isOpen={showModal}
          title="Game Over!"
          message={`You got upto level ${currentLevel + 1}`}
          onClose={restartGame}
        />
      </section>
    </main>
  );
};

export default Simon;
