import { useState } from "react";

const Highscore = ({ score, onSave, onRestart }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.length === 3) {
      onSave(name.toUpperCase(), score);
      setName("");
    } else {
      alert("Please enter a 3-character name.");
    }
  };

  return (
    <div className="Highscore absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
      <h1 className="text-3xl font-bold mb-4">Game Over</h1>
      <p className="text-xl mb-4">Your Score: {score}</p>
      <div className="flex flex-col items-center mb-4">
        <label className="text-lg mb-2">Enter Your Name (3 Characters):</label>
        <input
          type="text"
          maxLength="3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black text-center p-2 rounded w-24"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          Save Highscore
        </button>
      </div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onRestart}
      >
        Restart
      </button>
    </div>
  );
};

export default Highscore;
