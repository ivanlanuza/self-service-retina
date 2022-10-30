import { Droppable, Draggable } from "react-beautiful-dnd";
import DataItem from "./DataItem";

const DataList = ({ dataset, onDataDelete }) => {
  return (
    <Droppable droppableId="dataList" type="metric">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`h-full pt-2 ${
            droppableSnapshot.isDraggingOver ? "bg-white" : "bg-white"
          }`}
        >
          <div>
            {dataset.map((dataitem, index) => (
              <DataItem
                key={dataitem.id}
                dataitem={dataitem}
                index={index}
                onDataDelete={onDataDelete}
              />
            ))}
          </div>

          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default DataList;
