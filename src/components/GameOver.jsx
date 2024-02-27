/* eslint-disable react/prop-types */
export const GameOver = ({ winner, onClick }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won</p>}
      {!winner && <p>It&apos;s a draw</p>}
      <p>
        <button onClick={onClick}>Rematch!</button>
      </p>
    </div>
  );
};
