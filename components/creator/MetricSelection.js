import MetricList from "components/creator/MetricList";
import DataList from "components/creator/DataList";
import { DragDropContext } from "react-beautiful-dnd";

export default function MetricSelection({ statedata, updateDataSet }) {
  //For Deleting Item in Data List
  const onDataDelete = (dataid, index) => {
    const newStateData = statedata;
    newStateData.dataset.splice(index, 1);

    const newdata = { id: dataid };
    newStateData.metricdata.push(newdata);
    updateDataSet(newStateData);
    return;
  };

  //For Drag and Drop Movements in Metrics
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
      updateDataSet(newStateData);
      return;
    }

    //For moving from metrics to data
    const newdata = { id: draggableId };
    const newStateData = statedata;
    newStateData.metricdata.splice(source.index, 1);
    newStateData.dataset.push(newdata);
    updateDataSet(newStateData);
    return;
  };

  return (
    <div className="mb-4 h-[250px] bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
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
              <div className="mx-2 overflow-y-auto overflow-x-hidden text-xs font-medium text-gray-800  h-[130px] border border-gray-300 border-dashed">
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
  );
}
