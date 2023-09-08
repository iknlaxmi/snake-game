import React from 'react';
const Snake = ({ moveData }) => {
  return (
    <div>
      {moveData.map((snakePoint, index) => (
        <div
          style={{
            width: '10px',
            height: '10px',
            margin: '5px',
            position: 'absolute',
            backgroundColor: 'gray',
            left: `${snakePoint.x}%`,
            top: `${snakePoint.y}%`,
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};
export default Snake;
