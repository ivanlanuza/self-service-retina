import { Droppable, Draggable } from "react-beautiful-dnd";
import FilterItem from "./FilterItem";

const FilterList = ({ filterset }) => {
  return (
    <Droppable droppableId="filterList" type="dimension">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`h-full pt-2 ${
            droppableSnapshot.isDraggingOver ? "bg-white" : "bg-white"
          }`}
        >
          <div>
            {filterset.map((filteritem, index) => (
              <FilterItem
                key={filteritem.id}
                filteritem={filteritem}
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
export default FilterList;
