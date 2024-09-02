import React from 'react';

const SharedButton = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

export default SharedButton;