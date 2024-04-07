import { useState } from "react";

function Player({ initialname, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialname);
  console.log(playerName);
  const handleClick = () => {
    // setIsEditing(!isEditing);
    setIsEditing((editing) => !editing);
    if (isEditing) {
      setPlayerName(playerName);
      onChangeName(symbol, playerName);
    }
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            required
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        )}
        {console.log(playerName)}

        <span className="player symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
