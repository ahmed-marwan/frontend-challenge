import React, { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';
import Input from './components/Input';
import './styles/App.scss';

export interface Product {
  title: string;
  gtin: number;
  gender: string;
  sale_price: string;
  price: string;
  image_link: string;
  additional_image_link: string;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const firstUpdate = useRef(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitizing user input
    const searchTerm = e.target.value.trim().toLocaleLowerCase();
    setInputValue(searchTerm);
  };

  useEffect(() => {
    // Preventing unecessary data parsing data on 1st render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    let searchResults: Product[] = [];

    // Parsing CSV data
    Papa.parse('data/test.csv', {
      header: true,
      download: true,
      //@@TODO fix type any
      step: function (row: any) {
        if (inputValue.length) {
          const product = row.data;

          if (product.title.toLocaleLowerCase().includes(inputValue)) {
            searchResults.push(product);
          }
        }
      },
      complete: function () {
        // Limiting auto-suggested products shown to user to 10
        setSuggestions(searchResults.slice(0, 10));
      },
    });
  }, [inputValue]);

  // Populating input field with the suggested product that user clicks on
  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <main>
      <Input
        inputValue={inputValue}
        handleOnChange={handleOnChange}
        suggestions={suggestions}
        selectSuggestion={selectSuggestion}
        setInputValue={setInputValue}
      />
    </main>
  );
}

export default App;
