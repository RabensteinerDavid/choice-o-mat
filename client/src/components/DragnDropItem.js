import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';

const DragnDropItem = ({
  answer,
  defaultX,
  defaultY,
  targetXFrom,
  targetXTo,
  targetYFrom,
  targetYTo
}) => {
  const [controlledPosition, setControlledPosition] = useState({ x: defaultX, y: defaultY });

  const adjustPosition = (dx, dy) => {
    setControlledPosition(prevPosition => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy
    }));
  };

  const handleStop = (e, data) => {
    const snapBackThreshold = 100;
    const snapBackX = defaultX; 
    const snapBackY = defaultY;

    if (data.x < snapBackThreshold || data.y < snapBackThreshold) {
      setControlledPosition({ x: snapBackX, y: snapBackY });
    }
  };

  const handleDrag = (e, ui) => {
    adjustPosition(ui.deltaX, ui.deltaY);
  };

  return (
    <div>
      <Draggable
      bounds={"body"}
        position={controlledPosition}
        onStop={handleStop}
        onDrag={handleDrag}
      >
        <div className='dragndrop-answers' onClick={()=>  setControlledPosition({ x: 200, y: 100 })}>
          {answer.text}
          {/* <div>({controlledPosition.x})X - ({controlledPosition.y}) Y</div> */}
        </div>
      </Draggable>
    </div>
  );
};

export default DragnDropItem;
