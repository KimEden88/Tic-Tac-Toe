/* eslint-disable react/prop-types */
import { useState } from "react";

export const Player = ({ defaultName, symbol, isActive, onChangeName }) => {
  const [edit, setEdit] = useState(false);
  const [playerName, setPlayerName] = useState(defaultName);

  const handleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
    if (edit) {
      onChangeName(symbol, playerName);
    }
  };

  const handlePlayerName = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {!edit ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            value={playerName}
            onChange={handlePlayerName}
            required
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{!edit ? "Edit" : "Save"}</button>
    </li>
  );
};
