import React, { useRef } from 'react';
import { Product } from '../App';
import '../styles/Input.scss';

interface InputProps {
  inputValue: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: Product[];
  selectSuggestion: (suggestion: Product) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

function Input({
  inputValue,
  handleOnChange,
  suggestions,
  selectSuggestion,
  setInputValue,
}: InputProps) {
  const renderSuggestions = () => {
    if (suggestions.length) {
      return (
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.gtin}
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      );
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  if (inputRef.current) {
    inputRef.current.focus();
  }

  return (
    <div className="input-container">
      <div>
        <input
          type="text"
          title="Search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="Search"
          autoFocus
          value={inputValue}
          onChange={handleOnChange}
          ref={inputRef}
        />
        {inputValue && (
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25px"
            className="icon"
            onClick={() => setInputValue('')}
          >
            <title>Clear</title>
            <path
              fill="#444A59"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            ></path>
          </svg>
        )}
      </div>
      {renderSuggestions()}
    </div>
  );
}

export default Input;
