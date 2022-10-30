import { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import DimensionList from "components/creator/DimensionList";
import MetricList from "components/creator/MetricList";
import RowList from "components/creator/RowList";
import ColumnList from "components/creator/ColumnList";
import DataList from "components/creator/DataList";
import FilterBar from "components/creator/FilterBar";

import { dataset } from "data/dataset";

export default function Home() {
  const [statedata, setStateData] = useState(dataset);

  //Needed to trick react into refreshing state during item deletion
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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
      setStateData(newStateData);
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
      setStateData(newStateData);
      return;
    }
  };

  //Handling of movement in Metrics
  const onDragEndMetrics = (result) => {
    const { destination, source, draggableId, type } = result;

    //To disable movement to non valid location
    if (!destination || destination.droppableId == "metricList") {
      return;
    }

    //For sorting within the data list
    if (destination.droppableId === source.droppableId) {
      const newStateData = statedata;
      newStateData.dataset.splice(source.index, 1);
      newStateData.dataset.splice(destination.index, 0, { id: draggableId });
      setStateData(newStateData);
      return;
    }

    //For moving from metrics to data
    const newdata = { id: draggableId };
    const newStateData = statedata;
    newStateData.metricdata.splice(source.index, 1);
    newStateData.dataset.push(newdata);
    setStateData(newStateData);
    return;
  };

  //For Deleting Item in Data List
  const onDataDelete = (dataid, index) => {
    const newStateData = statedata;
    newStateData.dataset.splice(index, 1);

    const newdata = { id: dataid };
    newStateData.metricdata.push(newdata);
    setStateData(newStateData);
    forceUpdate();
    return;
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
    setStateData(newStateData);
    forceUpdate();
    return;
  };

  return (
    <div className="grid grid-cols-10 gap-0 font-open bg-white">
      <div className="col-span-3 bg-gray-100 h-screen pt-4 pl-5 border-r border-gray-300">
        <div className="mb-4 h-[400px] bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="px-5 pt-3 pb-2">
            <h5 className="retinabluetext font-bold text-2xl tracking-tight mb-2 dark:text-white">
              Dimensions
            </h5>
            <p className="font-normal text-gray-500 mb-3 dark:text-gray-400 text-xs">
              Use dimensions as rows or columns by dragging fields over.
            </p>
            <DragDropContext onDragEnd={onDragEndDimensions}>
              <div className="grid grid-cols-2 gap-0 bg-white border-t border-gray-200">
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
                    <div className="mx-2 overflow-y-auto overflow-x-hidden text-xs font-medium text-gray-800 h-[120px] border border-gray-300 border-dashed">
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
                    <div className="mx-2 overflow-y-auto overflow-x-hidden text-xs font-medium text-gray-800  h-[120px]  border border-gray-300 border-dashed">
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

        <div className="mb-4 h-[260px] bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="px-5 pt-3 pb-2">
            <h5 className="retinayellowtext font-bold text-2xl tracking-tight mb-2 dark:text-white">
              Metrics
            </h5>

            <p className="font-normal text-gray-500 mb-3 dark:text-gray-400 text-xs">
              Drag field from left to right to use it as data in report.
            </p>
            <DragDropContext onDragEnd={onDragEndMetrics}>
              <div className="grid grid-cols-2 gap-0 bg-white h-2/6 border-t border-gray-200">
                <div className="col-span-1 h-full">
                  <div className="col-span-1 border-r border-gray-200 h-full">
                    <div className="text-md text-center font-bold retinayellowtext pt-1">
                      Fields
                    </div>
                    <div className="text-xs font-medium text-gray-800">
                      <MetricList metrics={statedata.metricdata} />
                    </div>
                  </div>
                </div>
                <div className="col-span-1 h-full">
                  <div className="text-md text-center pt-1 font-bold retinayellowtext">
                    Data
                  </div>
                  <div className="mx-2 overflow-y-auto overflow-x-hidden text-xs font-medium text-gray-800  h-[120px] border border-gray-300 border-dashed">
                    <DataList
                      dataset={statedata.dataset}
                      onDataDelete={onDataDelete}
                    />
                  </div>
                </div>
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>

      <div className="col-span-7 bg-white h-screen">
        <FilterBar />
      </div>
    </div>
  );
}
