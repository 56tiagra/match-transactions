import React, { useState } from 'react';

interface BaseInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  placeholder: string;
}

const BaseInput: React.FC<BaseInputProps> = ({ value, onChange, placeholder }) => {
  const [isValidJson, setIsValidJson] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    let isValid = true;
    try {
      JSON.parse(inputValue);
    } catch (error) {
      isValid = false;
    }
    setIsValidJson(isValid);
    onChange(inputValue, isValid);
  };

  const handleFormatJson = () => {
    try {
      const formattedJson = JSON.stringify(JSON.parse(value), null, 2);
      onChange(formattedJson, true);
    } catch (error) {
      setIsValidJson(false);
      onChange(value, false);
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full h-40 border ${isValidJson ? 'border-gray-300' : 'border-red-500'} rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />
      {!isValidJson && <p className="text-red-500 mt-2">Invalid JSON format</p>}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleFormatJson}
      >
        Format JSON
      </button>
    </div>
  );
};

export default BaseInput;
