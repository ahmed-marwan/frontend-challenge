import React, { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';
import Input from './components/Input';
import ProductsList from './components/ProductsList';
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
  const [products, setProducts] = useState<Product[]>([]);
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
      step: function (row) {
        if (inputValue.length) {
          const product = row.data as unknown as Product;

          if (product.title.toLocaleLowerCase().includes(inputValue)) {
            searchResults.push(product);
          }
        }
      },
      complete: function () {
        // Limiting auto-suggested products shown to user to 10
        setSuggestions(searchResults.slice(0, 10));
        setProducts(searchResults);
      },
    });
  }, [inputValue]);

  // Populating input field with the suggested product that user clicks on
  const selectSuggestion = (suggestion: Product) => {
    setInputValue(suggestion.title);
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
      <ProductsList products={products} />
    </main>
  );
}

export default App;
