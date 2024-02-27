/* eslint-disable react/prop-types */
export const GameContainer = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
