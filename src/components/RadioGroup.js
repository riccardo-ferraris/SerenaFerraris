import { React, forwardRef } from 'react';

const RadioGroup = forwardRef(({ title, options, selectedOption, onChange, otherOptionValue, setOtherOptionValue }, ref) => {
  return (
    <div className="mb-4" ref={ref}>
      <label className="block text-[#102e5e] font-bold mb-2">{title}</label>
      {options.map((option, index) => (
        <label key={index} className="flex items-center mb-2 ml-4">
          <input
            type="radio"
            name={title} 
            value={option.value}
            checked={selectedOption === option.value}
            onChange={onChange}
            className="mr-2"
          />
          <span>{option.label}</span>
          {option.value === 'Altro' && selectedOption === 'Altro' && (
            <input
              type="text"
              value={otherOptionValue}
              onChange={(e) => setOtherOptionValue(e.target.value)}
              className="ml-2 px-2 py-1 border border-gray-300 rounded-md"
              placeholder="Specifica"
            />
          )}
        </label>
      ))}
    </div>
  );
});

export default RadioGroup;