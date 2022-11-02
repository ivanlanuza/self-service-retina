import { Droppable, Draggable } from "react-beautiful-dnd";
import RowItem from "./RowItem";

const RowList = ({ rowset, onDimensionDelete }) => {
  return (
    <Droppable droppableId="rowList" type="dimension">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`h-full pt-2 `}
        >
          <div>
            {rowset.map((rowitem, index) => (
              <RowItem
                key={rowitem.id}
                rowitem={rowitem}
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
export default RowList;
