import { periods, limits, sortby } from "data/filterselection";
import InputSelectLabel from "components/core/InputSelectLabel";

export default function FilterBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-300 h-24 w-full">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <InputSelectLabel label="Time Frame" data={periods} />
        </div>
        <div className="col-span-1">
          <InputSelectLabel label="Max Records" data={limits} />
        </div>
        <div className="col-span-1">
          <InputSelectLabel label="Sorting" data={sortby} />
        </div>
        <div
          className="border col-span-1 mt-10 mr-8 rounded-md h-[32px] retinaorange focus:outline-none active:bg-orange-600"
          onClick={() => {}}
        >
          <p className="pt-3 text-xs font-medium text-center text-white -mt-1  cursor-pointer ">
            Generate Report
          </p>
        </div>
      </div>
    </div>
  );
}
