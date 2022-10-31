import { Draggable } from "react-beautiful-dnd";
import { MenuIcon, CheckIcon, MinusCircleIcon } from "@heroicons/react/outline";

const DataItem = ({ dataitem, index, onDataDelete }) => {
  return (
    <Draggable draggableId={dataitem.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className={`mx-2 pb-1 pt-1 grid grid-cols-8 ${
            draggableSnapshot.isDragging
              ? "mb-1 px-2 rounded-sm text-white retinayellow "
              : "mb-1 px-2 rounded-sm text-white retinayellow"
          } `}
        >
          <CheckIcon className="h-4 w-4 mr-2 font-light self-start col-span-2" />
          <div className="text-xs font-thin col-span-5">{dataitem.id}</div>
          <div
            className="col-span-1 float-right align-right cursor-pointer hover:text-gray-800   active:text-black"
            onClick={() => {
              onDataDelete(dataitem.id, index);
            }}
          >
            <MinusCircleIcon className="h-4 w-4 mr-0 font-light self-end " />
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default DataItem;
