import { useState } from "react";

import { GameBoard } from "./components/GameBoard";
import { GameContainer } from "./components/GameContainer";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { GameOver } from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]; //creating a deep copy to resolve a bug

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveWinner = (gameBoard, players) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, SetGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    SetGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          player: currentPlayer,
          square: { row: rowIndex, col: colIndex },
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRematch = () => {
    SetGameTurns([]);
  };

  const handlePlayersNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <>
      <Header />
      <main>
        <GameContainer id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              defaultName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayersNameChange}
            />
            <Player
              defaultName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayersNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onClick={handleRematch} />
          )}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </GameContainer>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
