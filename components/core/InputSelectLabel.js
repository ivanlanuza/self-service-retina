const InputSelectLabel = ({ label, value, onChange, data, placeholder }) => (
  <div className="font-open px-4 py-5 ">
    <div className="block text-xs font-bold ml-1 retinabluetext">{label}</div>
    <div className="mt-0 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      <select
        className="form-select appearance-none
        block
        w-full
        px-2
        py-2
        text-xs
        font-normal
        font-open
        
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        mt-1
        -ml-0
        -mb-4
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        value={value}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {data.map((dataitem) => (
          <option key={dataitem.id} value={dataitem.id}>
            {dataitem.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default InputSelectLabel;
