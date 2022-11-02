import { DragDropContext } from "react-beautiful-dnd";

import DimensionList from "components/creator/DimensionList";
import RowList from "components/creator/RowList";
import ColumnList from "components/creator/ColumnList";

export default function DimensionSelection({ statedata, updateDataSet }) {
  //Handling of movement in Dimensions
  const onDragEndDimensions = (result) => {
    const { destination, source, draggableId, type } = result;

    //To disable movement to non valid location
    if (!destination || destination.droppableId == "dimensionList") {
      return;
    }

    //For sorting within the data list
    if (destination.droppableId === source.droppableId) {
      const newStateData = statedata;

      if (destination.droppableId == "rowList") {
        newStateData.rowsdata.splice(source.index, 1);
        newStateData.rowsdata.splice(destination.index, 0, { id: draggableId });
      } else if (destination.droppableId == "columnList") {
        newStateData.columnsdata.splice(source.index, 1);
        newStateData.columnsdata.splice(destination.index, 0, {
          id: draggableId,
        });
      }
      updateDataSet(newStateData);
      return;
    }

    //For moving dimenstions to rows or columns
    if (destination.droppableId != source.droppableId) {
      const newStateData = statedata;
      const newdata = { id: draggableId };

      //Removing entry in current list
      if (source.droppableId == "rowList") {
        newStateData.rowsdata.splice(source.index, 1);
      } else if (source.droppableId == "columnList") {
        newStateData.columnsdata.splice(source.index, 1);
      } else {
        newStateData.dimensionsdata.splice(source.index, 1);
      }

      //Pushing entry into new list
      if (destination.droppableId == "rowList") {
        newStateData.rowsdata.push(newdata);
      } else if (destination.droppableId == "columnList") {
        newStateData.columnsdata.push(newdata);
      }

      //Writing to State
      updateDataSet(newStateData);
      return;
    }
  };

  //For Deleting Item in Rows or Columns List
  const onDimensionDelete = (dataid, index, sourcelist) => {
    const newStateData = statedata;

    if (sourcelist == "rowsList") {
      newStateData.rowsdata.splice(index, 1);
    } else if (sourcelist == "columnsList") {
      newStateData.columnsdata.splice(index, 1);
    }

    const newdata = { id: dataid };
    newStateData.dimensionsdata.push(newdata);
    updateDataSet(newStateData);
    return;
  };
  return (
    <div className="mb-4 h-[370px] max-w-sm ">
      <div className="px-5 pt-3 pb-2">
        <h5 className="retinabluetext font-bold text-2xl tracking-tight mb-2 dark:text-white">
          Dimensions
        </h5>
        <p className="font-normal text-gray-500 mb-3 dark:text-gray-400 text-xs">
          Use dimensions as rows or columns by dragging fields over.
        </p>
        <DragDropContext onDragEnd={onDragEndDimensions}>
          <div className="grid grid-cols-2 gap-0  border-t border-gray-200">
            <div className="col-span-1 h-full border-r border-gray-200">
              <div className="text-md pt-2 text-center font-bold retinabluetext ">
                Fields
              </div>
              <div className="text-xs font-medium text-gray-800">
                <DimensionList dimensions={statedata.dimensionsdata} />
              </div>
            </div>
            <div className="col-span-1">
              <div className="">
                <div className="text-md text-center pt-2 font-bold retinabluetext">
                  Rows
                </div>
                <div className="mx-2 overflow-y-auto overflow-x-hidden text-xs font-medium text-gray-800 h-[100px] border border-gray-300 border-dashed">
                  <RowList
                    rowset={statedata.rowsdata}
                    onDimensionDelete={onDimensionDelete}
                  />
                </div>
              </div>
              <div className="h-1/2 ">
                <div className="text-md text-center pt-1 font-bold retinabluetext">
                  Columns
                </div>
                <div className="mx-2 overflow-y-auto overflow-x-hidden text-xs font-medium text-gray-800  h-[100px]  border border-gray-300 border-dashed">
                  <ColumnList
                    columnset={statedata.columnsdata}
                    onDimensionDelete={onDimensionDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
