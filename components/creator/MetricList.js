import { Droppable, Draggable } from "react-beautiful-dnd";

import Metric from "./Metric";

const MetricList = ({ metrics }) => {
  return (
    <Droppable droppableId="metricList" type="metric">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`grow min-h-[100px] p-2 `}
        >
          <div>
            {metrics.map((metric, index) => (
              <Metric key={metric.id} metric={metric} index={index} />
            ))}
          </div>

          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default MetricList;
