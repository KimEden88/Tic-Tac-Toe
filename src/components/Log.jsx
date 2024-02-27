/* eslint-disable react/prop-types */
export const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          Player {turn.player} Selected ({turn.square.row},{turn.square.col})
        </li>
      ))}
    </ol>
  );
};
