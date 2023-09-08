import React from 'react';
const SnakeFood = (props) => {
  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        margin: '4px',
        position: 'absolute',
        left: `${props.position.x}%`,
        top: `${props.position.y}%`,
        zIndex: 0,
      }}
    />
  );
};
export default SnakeFood;
