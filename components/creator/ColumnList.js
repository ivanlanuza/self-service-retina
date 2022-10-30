import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnItem from "./ColumnItem";

const ColumnList = ({ columnset, onDimensionDelete }) => {
  return (
    <Droppable droppableId="columnList" type="dimension">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`h-full pt-2 ${
            droppableSnapshot.isDraggingOver ? "bg-white" : "bg-white"
          }`}
        >
          <div>
            {columnset.map((columnitem, index) => (
              <ColumnItem
                key={columnitem.id}
                columnitem={columnitem}
                index={index}
                onDimensionDelete={onDimensionDelete}
              />
            ))}
          </div>

          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default ColumnList;
