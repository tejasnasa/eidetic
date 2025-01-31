"use client";

import { useState, useEffect } from "react";
import NumberModal from "@/components/NumberModal";

const NumberMemory = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameState, setGameState] = useState("idle"); // idle, showing, typing, correct, incorrect
  const [currentNumber, setCurrentNumber] = useState("");
  const [userInput, setUserInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const generateNumber = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
      ""
    );
  };

  const startGame = () => {
    setCurrentLevel(1);
    setGameState("idle");
    setShowModal(false);
    startNewLevel(1);
  };

  const restartGame = () => {
    setCurrentLevel(1);
    setGameState("idle");
    setShowModal(false);
  };

  const startNewLevel = (level: number) => {
    const newNumber = generateNumber(level);
    setCurrentNumber(newNumber);
    setUserInput("");
    setGameState("showing");

    const showTime = Math.min(level * 1000, 5000);
    setTimeout(() => {
      setGameState("typing");
    }, showTime);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== "typing") return;
    setUserInput(e.target.value.replace(/^0+/, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== "typing") return;

    if (userInput === currentNumber) {
      setGameState("correct");
      setTimeout(() => {
        setCurrentLevel((prevLevel) => {
          const newLevel = prevLevel + 1;
          startNewLevel(newLevel);
          return newLevel;
        });
      }, 1000);
    } else {
      setGameState("incorrect");
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (gameState === "typing") {
      setTimeout(() => {
        document.getElementById("numberInput")?.focus();
      }, 10);
    }
  }, [gameState]);

  return (
    <section className="max-w-md mx-auto p-6">
      <div className="text-center">

        <div className="mb-4">
          <span className="text-lg font-semibold">Level: {currentLevel}</span>
        </div>

        <div className="mb-6 mt-[450px] mx-auto">
          {gameState === "showing" && (
            <div className="text-8xl font-bold mb-4 font-mono">
              {currentNumber}
            </div>
          )}

          {gameState === "typing" && (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              id="numberInput"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={userInput}
              onChange={handleInputChange}
              className="p-2 text-center text-5xl mb-4 border rounded text-white w-[800px] h-[100px] font-bold font-mono bg-transparent"
              autoFocus
              placeholder="Type the number..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded text-xl"
            >
              Submit
            </button>
          </form>

          )}

          {gameState === "correct" && (
            <div className="text-green-500 text-xl font-bold">
              Correct! Moving to next level...
            </div>
          )}

          {gameState === "idle" && (
            <button
            onClick={startGame}
            className="bg-white hover:bg-gray-200 transition text-blue-600 font-extrabold font-mono px-6 py-4 rounded mb-4 text-2xl mt-[30px]"
          >
            Start Game
          </button>
          )}
        </div>

        <div className="text-gray-600 text-sm">
          {gameState === "showing" && <p>Memorize the number!</p>}
          {gameState === "typing" && (
            <p>Type the number you saw and click Submit</p>
          )}
        </div>
      </div>

      <NumberModal
        value={currentLevel}
        isOpen={showModal}
        title="Game Over!"
        message={`You reached level ${currentLevel}. The correct number was ${currentNumber}`}
        onClose={restartGame}
      />
    </section>
  );
};

export default NumberMemory;
