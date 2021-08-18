import React, { useEffect, useRef } from 'react';
import { Hint } from 'react-autocomplete-hint';
import '../styles/Input.scss';

interface InputProps {
  inputValue: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productHints: string[];
  clearInput: () => void;
  searchResultsNum: number;
}

function Input({
  inputValue,
  handleOnChange,
  productHints,
  clearInput,
  searchResultsNum,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  return (
    <div>
      <div className="input-container">
        <div>
          <Hint options={productHints} allowTabFill={true}>
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
          </Hint>
        </div>
        {inputValue && (
          <div className="icon" onClick={clearInput}>
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25px"
            >
              <title>Clear</title>
              <path
                fill="#444A59"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      <div className="search-results">
        <span>
          {inputValue && searchResultsNum
            ? `total search results: ${searchResultsNum}`
            : inputValue && !searchResultsNum
            ? 'no matches found'
            : ''}
        </span>
      </div>
    </div>
  );
}

export default Input;
