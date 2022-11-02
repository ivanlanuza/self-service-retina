import { Droppable, Draggable } from "react-beautiful-dnd";
import Dimension from "./Dimension";

const DimensionList = ({ dimensions }) => {
  return (
    <Droppable droppableId="dimensionList" type="dimension">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`grow min-h-[100px] p-2`}
        >
          <div>
            {dimensions.map((dimension, index) => (
              <Dimension
                key={dimension.id}
                dimension={dimension}
                index={index}
              />
            ))}
          </div>

          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default DimensionList;
