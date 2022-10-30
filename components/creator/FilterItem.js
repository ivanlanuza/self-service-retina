import { Draggable } from "react-beautiful-dnd";
import { MenuIcon } from "@heroicons/react/outline";

const FilterItem = ({ filteritem, index }) => {
  return (
    <Draggable draggableId={filteritem.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className={`mx-2 pb-1 pt-1  ${
            draggableSnapshot.isDragging
              ? "flex align-left mb-2 px-2 rounded-sm text-white retinablue "
              : "flex align-left mb-2 px-2 rounded-sm text-white retinablue"
          } `}
        >
          <MenuIcon className="h-4 w-4 mr-2 font-light" />
          <div className="text-xs font-thin ">{filteritem.id}</div>
        </div>
      )}
    </Draggable>
  );
};
export default FilterItem;
