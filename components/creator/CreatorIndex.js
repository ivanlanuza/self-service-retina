import { useState, useCallback } from "react";

import DimensionSelection from "components/creator/DimensionSelection";
import MetricSelection from "components/creator/MetricSelection";
import FilterBar from "components/creator/FilterBar";

import { dataset } from "data/dataset";

export default function Creator() {
  const [statedata, setStateData] = useState(dataset);

  //Update State of Data Set from Drag and Drop Changes
  const updateDataSet = (data) => {
    setStateData(data);
    forceUpdate();
  };

  //Needed to trick react into refreshing state during item deletion
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <div className="grid grid-cols-10 gap-0 font-open bg-white -mt-12 z-100">
      <div className="col-span-3 bg-gray-100 h-screen pt-16 pl-5 border-r border-gray-300">
        <DimensionSelection
          statedata={statedata}
          updateDataSet={updateDataSet}
        />

        <MetricSelection statedata={statedata} updateDataSet={updateDataSet} />
      </div>

      <div className="col-span-7 bg-white h-screen pt-12">
        <FilterBar />
      </div>
    </div>
  );
}
