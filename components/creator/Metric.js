import { Draggable } from "react-beautiful-dnd";
import { MenuIcon } from "@heroicons/react/outline";

const Metric = ({ metric, index }) => {
  return (
    <Draggable draggableId={metric.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className={`mx-2 pb-1 pt-1  ${
            draggableSnapshot.isDragging
              ? "flex align-left mb-2 px-2 rounded-sm text-white retinayellow "
              : "flex align-left mb-2 px-2 rounded-sm text-white retinayellow"
          } `}
        >
          <MenuIcon className="h-4 w-4 mr-2 font-light" />
          <div className="text-xs font-thin ">{metric.id}</div>
        </div>
      )}
    </Draggable>
  );
};
export default Metric;
