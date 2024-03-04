import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseInput from './BaseInput';

describe('BaseInput', () => {
  test('should call onChange with the updated value when input changes', () => {
    const onChangeMock = jest.fn();
    const placeholder = 'Enter JSON data';

    render(<BaseInput value="" onChange={onChangeMock} placeholder={placeholder} />);

    const inputElement = screen.getByPlaceholderText(placeholder);
    const inputValue = '{"key": "value"}';

    fireEvent.change(inputElement, { target: { value: inputValue } });

    expect(onChangeMock).toHaveBeenCalledWith(inputValue, true);
  });

  test('should display error message when input contains invalid JSON', () => {
    const onChangeMock = jest.fn();
    const placeholder = 'Enter JSON data';

    render(<BaseInput value="" onChange={onChangeMock} placeholder={placeholder} />);

    const inputElement = screen.getByPlaceholderText(placeholder);
    const invalidInputValue = '{ key: "value" }'; // invalid JSON

    fireEvent.change(inputElement, { target: { value: invalidInputValue } });

    expect(screen.getByText('Invalid JSON format')).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledWith(invalidInputValue, false);
  });

  test('should call onChange with formatted JSON when format button is clicked', () => {
    const onChangeMock = jest.fn();
    const placeholder = 'Enter JSON data';

    render(<BaseInput value={`{ "key": "value" }`} onChange={onChangeMock} placeholder={placeholder} />);

    const formatButton = screen.getByText('Format JSON');
    fireEvent.click(formatButton);

    expect(onChangeMock).toHaveBeenCalledWith('{\n  "key": "value"\n}', true);
  });
});
